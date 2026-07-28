import React from 'react';
import { usePulauWeather, getWeatherConditionText } from '../utils/weather';
import { Sun, Cloud, CloudRain, CloudLightning, Wind, Waves, Compass, RefreshCw, Thermometer, Droplets, Eye, Clock, MapPin, CheckCircle2, AlertCircle, Sparkles, Radio, Info } from 'lucide-react';

interface RealtimeWeatherWidgetProps {
  lang?: 'ID' | 'EN';
}

export const RealtimeWeatherWidget: React.FC<RealtimeWeatherWidgetProps> = ({ lang = 'ID' }) => {
  const isEn = lang === 'EN';
  const { weather, loading, error, refresh } = usePulauWeather(lang);
  const condition = getWeatherConditionText(weather.weatherCode, isEn);

  const renderWeatherIcon = (type: string, size = 'large') => {
    const iconClass = size === 'large' ? 'w-10 h-10 sm:w-12 sm:h-12' : 'w-6 h-6';
    switch (type) {
      case 'sun':
        return <Sun className={`${iconClass} text-amber-400 animate-pulse`} />;
      case 'cloud-sun':
        return (
          <div className="relative flex items-center justify-center">
            <Sun className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400 absolute -top-1.5 -right-1.5 animate-spin-slow" />
            <Cloud className={`${iconClass} text-cyan-200 relative z-10`} />
          </div>
        );
      case 'cloud':
        return <Cloud className={`${iconClass} text-slate-300 animate-pulse`} />;
      case 'rain':
        return <CloudRain className={`${iconClass} text-cyan-400 animate-bounce`} />;
      case 'storm':
        return <CloudLightning className={`${iconClass} text-amber-400 animate-pulse`} />;
      default:
        return <Sun className={`${iconClass} text-amber-400`} />;
    }
  };

  return (
    <section className="relative py-12 md:py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80 overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header & Status */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-slate-900 border border-cyan-500/40 text-cyan-300 shadow-sm">
                <Radio className={`w-3.5 h-3.5 text-emerald-400 ${weather.isLive ? 'animate-ping' : ''}`} />
                <span>{weather.isLive ? (isEn ? 'LIVE WMO SATELLITE FEED' : 'LIVE FEED SATELLIT WMO') : (isEn ? 'CACHED WEATHER DATA' : 'DATA CUACA TERSIMPAN')}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>6°19&apos; S, 122°39&apos; E</span>
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <span>{isEn ? 'Real-Time Weather & Marine Advisory' : 'Cuaca & Kondisi Bahari Real-Time'}</span>
              <Sparkles className="w-6 h-6 text-amber-400 hidden sm:inline-block animate-pulse" />
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              {isEn
                ? 'Directly monitored for Batu Atas Island visitors, boat crossings, and scuba divers to ensure optimal safety and planning.'
                : 'Dipantau langsung dari perairan Pulau Batu Atas untuk membantu perencanaan wisata, keselamatan penyeberangan kapal, dan aktivitas selam.'}
            </p>
          </div>

          {/* Refresh & Update Info */}
          <div className="flex items-center gap-3 self-start lg:self-end bg-slate-900/90 p-2 sm:p-2.5 rounded-2xl border border-slate-800 shadow-lg">
            <div className="text-right px-2 hidden sm:block">
              <p className="text-[10px] uppercase font-bold text-slate-400">{isEn ? 'Last Updated' : 'Terakhir Diperbarui'}</p>
              <p className="text-xs font-semibold text-cyan-400">{weather.updatedAt}</p>
            </div>
            
            <button
              onClick={refresh}
              disabled={loading}
              title={isEn ? 'Refresh Weather Data' : 'Perbarui Data Cuaca'}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm transition-all duration-300 shadow-md hover:shadow-cyan-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? (isEn ? 'Updating...' : 'Memperbarui...') : (isEn ? 'Refresh' : 'Perbarui')}</span>
            </button>
          </div>
        </div>

        {/* 4-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1: Atmospheric Weather & Temp */}
          <div className="bg-slate-900/90 rounded-3xl p-5 sm:p-6 border-2 border-slate-800 hover:border-cyan-500/40 transition duration-500 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition duration-500" />
            
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                <span>{isEn ? 'Air Temperature' : 'Suhu Udara'}</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-amber-400">
                  {weather.isDay ? (isEn ? 'Daytime' : 'Siang Hari') : (isEn ? 'Nighttime' : 'Malam Hari')}
                </span>
              </div>
              
              <div className="flex items-center justify-between gap-4 my-2">
                <div className="text-5xl sm:text-6xl font-black text-white tracking-tight font-mono">
                  {weather.temperature}°<span className="text-cyan-400 text-3xl sm:text-4xl">C</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner">
                  {renderWeatherIcon(condition.type, 'large')}
                </div>
              </div>
              
              <p className="text-base sm:text-lg font-bold text-cyan-300 mt-2">{condition.name}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>{isEn ? 'Feels like' : 'Terasa seperti'}</span>
              <span className="font-bold text-white font-mono">{weather.apparentTemperature}°C</span>
            </div>
          </div>

          {/* Card 2: Wind & Humidity */}
          <div className="bg-slate-900/90 rounded-3xl p-5 sm:p-6 border-2 border-slate-800 hover:border-teal-500/40 transition duration-500 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl group-hover:bg-teal-500/10 transition duration-500" />
            
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                <span>{isEn ? 'Wind & Humidity' : 'Angin & Kelembapan'}</span>
                <Compass className="w-4 h-4 text-teal-400 animate-spin-slow" />
              </div>

              <div className="space-y-4 my-2">
                <div className="flex items-center justify-between bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
                      <Wind className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold">{isEn ? 'Wind Speed' : 'Kecepatan Angin'}</p>
                      <p className="text-xs font-bold text-white">{weather.windDirection}</p>
                    </div>
                  </div>
                  <span className="text-base font-extrabold text-teal-400 font-mono">{weather.windSpeed} <span className="text-xs font-normal">km/j</span></span>
                </div>

                <div className="flex items-center justify-between bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                      <Droplets className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold">{isEn ? 'Humidity' : 'Kelembapan Udara'}</p>
                      <p className="text-xs font-bold text-slate-300">{weather.humidity > 80 ? (isEn ? 'High / Tropical' : 'Tinggi / Tropis') : (isEn ? 'Normal / Comfortable' : 'Normal / Sejuk')}</p>
                    </div>
                  </div>
                  <span className="text-base font-extrabold text-cyan-400 font-mono">{weather.humidity}%</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>{isEn ? 'Precipitation' : 'Curah Hujan'}</span>
              <span className="font-bold text-emerald-400 font-mono">{weather.precipitation} mm</span>
            </div>
          </div>

          {/* Card 3: Marine & Diving Advisory */}
          <div className="bg-slate-900/90 rounded-3xl p-5 sm:p-6 border-2 border-slate-800 hover:border-emerald-500/40 transition duration-500 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition duration-500" />
            
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                <span>{isEn ? 'Marine Advisory' : 'Kondisi Bahari'}</span>
                <Waves className="w-4 h-4 text-emerald-400 animate-pulse" />
              </div>

              <div className="mb-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
                  weather.isMarineSafe 
                    ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300' 
                    : 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                }`}>
                  {weather.isMarineSafe ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" /> : <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />}
                  <span>{weather.isMarineSafe ? (isEn ? 'Safe for Boat & Diving' : 'Aman Penyeberangan & Selam') : (isEn ? 'Caution: Moderate Waves' : 'Waspada Gelombang')}</span>
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60 text-slate-300">
                  <span className="text-slate-400">{isEn ? 'Wave Height' : 'Tinggi Ombak'}:</span>
                  <span className="font-bold text-white">{weather.waveHeight}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60 text-slate-300">
                  <span className="text-slate-400 flex items-center gap-1"><Eye className="w-3 h-3 text-cyan-400" /> {isEn ? 'Visibility' : 'Jarak Pandang'}:</span>
                  <span className="font-semibold text-cyan-300">{weather.visibility}</span>
                </div>
                <div className="flex items-center justify-between py-1 text-slate-300">
                  <span className="text-slate-400 flex items-center gap-1"><Thermometer className="w-3 h-3 text-amber-400" /> {isEn ? 'Water Temp' : 'Suhu Air Laut'}:</span>
                  <span className="font-semibold text-amber-300">{weather.waterTemp}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{isEn ? (weather.seaConditionEn) : (weather.seaConditionId)}</span>
            </div>
          </div>

          {/* Card 4: Hourly Forecast */}
          <div className="bg-slate-900/90 rounded-3xl p-5 sm:p-6 border-2 border-slate-800 hover:border-cyan-500/40 transition duration-500 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                <span>{isEn ? '5-Hour Forecast' : 'Prakiraan 5 Jam'}</span>
                <Clock className="w-4 h-4 text-cyan-400" />
              </div>

              <div className="grid grid-cols-5 gap-1.5 sm:gap-2 my-2">
                {weather.hourly.map((h, idx) => {
                  const hCond = getWeatherConditionText(h.code, isEn);
                  return (
                    <div key={idx} className="bg-slate-950 p-2 sm:p-2.5 rounded-2xl border border-slate-800/80 text-center flex flex-col items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400">{h.time}</span>
                      <div className="my-1.5">
                        {renderWeatherIcon(hCond.type, 'small')}
                      </div>
                      <span className="text-xs font-black text-white font-mono">{h.temp}°</span>
                      <span className="text-[9px] text-slate-500 font-semibold mt-0.5">{h.windSpeed}k</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>{isEn ? 'Source' : 'Sumber Data'}</span>
              <span className="font-semibold text-cyan-400">Open-Meteo Satellite</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
