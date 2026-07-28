import { useState, useEffect, useCallback } from 'react';

export interface HourlyForecast {
  time: string;
  temp: number;
  code: number;
  windSpeed: number;
}

export interface WeatherData {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  windDirectionDegrees: number;
  precipitation: number;
  weatherCode: number;
  isDay: boolean;
  waveHeight: string;
  seaConditionId: string;
  seaConditionEn: string;
  isMarineSafe: boolean;
  waterTemp: string;
  visibility: string;
  hourly: HourlyForecast[];
  updatedAt: string;
  isLive: boolean;
}

export function getWindDirectionText(deg: number, isEn: boolean): string {
  const dirsId = ['UTARA (N)', 'TIMUR LAUT (NE)', 'TIMUR (E)', 'TENGGARA (SE)', 'SELATAN (S)', 'BARAT DAYA (SW)', 'BARAT (W)', 'BARAT LAUT (NW)'];
  const dirsEn = ['NORTH (N)', 'NORTHEAST (NE)', 'EAST (E)', 'SOUTHEAST (SE)', 'SOUTH (S)', 'SOUTHWEST (SW)', 'WEST (W)', 'NORTHWEST (NW)'];
  const index = Math.round(deg / 45) % 8;
  return isEn ? dirsEn[index] : dirsId[index];
}

export function getMarineCondition(windSpeedKmH: number, isEn: boolean) {
  if (windSpeedKmH < 15) {
    return {
      waveHeight: '0.4m - 0.7m',
      seaConditionId: 'Tenang (Ideal Selam & Snorkeling)',
      seaConditionEn: 'Calm (Ideal for Diving & Snorkeling)',
      isMarineSafe: true,
      visibility: '25m+ Jernih / Crystal Clear',
      waterTemp: '28.5°C (Hangat / Warm)'
    };
  } else if (windSpeedKmH < 25) {
    return {
      waveHeight: '0.8m - 1.2m',
      seaConditionId: 'Normal / Gelombang Ringan',
      seaConditionEn: 'Moderate / Light Waves',
      isMarineSafe: true,
      visibility: '20m - 25m Baik / Good',
      waterTemp: '28.0°C (Hangat / Warm)'
    };
  } else {
    return {
      waveHeight: '1.5m - 2.2m',
      seaConditionId: 'Bergelombang (Waspada Kapal Kecil)',
      seaConditionEn: 'Rough (Caution for Small Boats)',
      isMarineSafe: false,
      visibility: '15m - 20m Sedang / Moderate',
      waterTemp: '27.5°C'
    };
  }
}

export function getWeatherConditionText(code: number, isEn: boolean): { name: string; type: 'sun' | 'cloud-sun' | 'cloud' | 'rain' | 'storm' } {
  if (code === 0) {
    return { name: isEn ? 'Clear Sunny Sky' : 'Cerah Alami', type: 'sun' };
  } else if (code === 1 || code === 2) {
    return { name: isEn ? 'Partly Cloudy' : 'Cerah Berawan', type: 'cloud-sun' };
  } else if (code === 3 || code === 45 || code === 48) {
    return { name: isEn ? 'Overcast / Sea Mist' : 'Berawan / Teduh', type: 'cloud' };
  } else if (code >= 51 && code <= 67) {
    return { name: isEn ? 'Light Rain Showers' : 'Hujan Tropis / Gerimis', type: 'rain' };
  } else if (code >= 80 && code <= 99) {
    return { name: isEn ? 'Thunderstorm / Heavy Rain' : 'Badai Hujan & Petir', type: 'storm' };
  }
  return { name: isEn ? 'Partly Cloudy' : 'Cerah Berawan', type: 'cloud-sun' };
}

const FALLBACK_WEATHER: WeatherData = {
  temperature: 29,
  apparentTemperature: 32,
  humidity: 76,
  windSpeed: 14,
  windDirection: 'TIMUR LAUT (NE)',
  windDirectionDegrees: 45,
  precipitation: 0.0,
  weatherCode: 1,
  isDay: true,
  waveHeight: '0.5m - 0.8m',
  seaConditionId: 'Tenang (Ideal Selam & Snorkeling)',
  seaConditionEn: 'Calm (Ideal for Diving & Snorkeling)',
  isMarineSafe: true,
  waterTemp: '28.5°C (Hangat / Warm)',
  visibility: '25m+ Jernih / Crystal Clear',
  hourly: [
    { time: '14:00', temp: 29, code: 1, windSpeed: 14 },
    { time: '15:00', temp: 29, code: 1, windSpeed: 13 },
    { time: '16:00', temp: 28, code: 2, windSpeed: 12 },
    { time: '17:00', temp: 27, code: 0, windSpeed: 11 },
    { time: '18:00', temp: 26, code: 0, windSpeed: 10 },
  ],
  updatedAt: 'WITA (Simulated)',
  isLive: false,
};

const CACHE_KEY = 'pba_live_weather_v1';
const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export function usePulauWeather(lang?: string) {
  const isEn = lang === 'EN';
  const [weather, setWeather] = useState<WeatherData>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_DURATION_MS) {
          return parsed.data;
        }
      }
    } catch (e) {}
    return FALLBACK_WEATHER;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchWeather = useCallback(async (force = false) => {
    if (!force) {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_DURATION_MS) {
            setWeather(parsed.data);
            return;
          }
        }
      } catch (e) {}
    }

    setLoading(true);
    setError(false);

    try {
      // Pulau Batu Atas coordinates: Latitude -6.3167, Longitude 122.6500
      const url = 'https://api.open-meteo.com/v1/forecast?latitude=-6.3167&longitude=122.6500&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,weather_code,wind_speed_10m&timezone=Asia%2FMakassar';
      
      const response = await fetch(url, { signal: AbortSignal.timeout(6000) });
      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      const current = data.current || {};
      const hourlyData = data.hourly || {};
      
      const temp = Math.round(current.temperature_2m || 29);
      const appTemp = Math.round(current.apparent_temperature || temp + 2);
      const humidity = Math.round(current.relative_humidity_2m || 75);
      const windSpd = Math.round(current.wind_speed_10m || 12);
      const windDeg = current.wind_direction_10m || 45;
      const precip = current.precipitation || 0;
      const wCode = current.weather_code !== undefined ? current.weather_code : 1;
      const isDayTime = current.is_day !== undefined ? current.is_day === 1 : true;
      
      const marine = getMarineCondition(windSpd, isEn);
      const windDirText = getWindDirectionText(windDeg, isEn);
      
      // Extract next 5 hours from hourly forecast
      const nowIndex = hourlyData.time ? hourlyData.time.findIndex((t: string) => {
        return new Date(t).getTime() >= Date.now();
      }) : 0;
      
      const startIdx = nowIndex >= 0 ? nowIndex : 0;
      const hourlyList: HourlyForecast[] = [];
      
      if (hourlyData.time && hourlyData.time.length > 0) {
        for (let i = startIdx; i < Math.min(startIdx + 5, hourlyData.time.length); i++) {
          const timeStr = hourlyData.time[i];
          const dateObj = new Date(timeStr);
          const formattedHours = `${dateObj.getHours().toString().padStart(2, '0')}:00`;
          hourlyList.push({
            time: formattedHours,
            temp: Math.round(hourlyData.temperature_2m[i] || 28),
            code: hourlyData.weather_code[i] || 0,
            windSpeed: Math.round(hourlyData.wind_speed_10m[i] || 10)
          });
        }
      }

      if (hourlyList.length === 0) {
        hourlyList.push(...FALLBACK_WEATHER.hourly);
      }

      const nowTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Makassar' }) + ' WITA';

      const newWeather: WeatherData = {
        temperature: temp,
        apparentTemperature: appTemp,
        humidity: humidity,
        windSpeed: windSpd,
        windDirection: windDirText,
        windDirectionDegrees: windDeg,
        precipitation: precip,
        weatherCode: wCode,
        isDay: isDayTime,
        waveHeight: marine.waveHeight,
        seaConditionId: marine.seaConditionId,
        seaConditionEn: marine.seaConditionEn,
        isMarineSafe: marine.isMarineSafe,
        waterTemp: marine.waterTemp,
        visibility: marine.visibility,
        hourly: hourlyList,
        updatedAt: nowTime,
        isLive: true
      };

      setWeather(newWeather);
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: newWeather
        }));
      } catch (e) {}

    } catch (err) {
      console.warn('Live weather fetch failed, using cached or fallback data:', err);
      setError(true);
      // Keep existing weather or fallback
    } finally {
      setLoading(false);
    }
  }, [isEn]);

  useEffect(() => {
    fetchWeather(false);
    // Auto refresh every 10 minutes
    const interval = setInterval(() => {
      fetchWeather(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchWeather]);

  return { weather, loading, error, refresh: () => fetchWeather(true) };
}
