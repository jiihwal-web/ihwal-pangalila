import React, { useState, useEffect, useRef } from 'react';
import { ImageIcon, Video, Loader2, MapPin, Sparkles } from 'lucide-react';

export interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  isVideo?: boolean;
  isDestination?: boolean;
  skeletonLabel?: string;
  wrapperClassName?: string;
  lang?: 'ID' | 'EN';
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt = '',
  className = '',
  wrapperClassName = '',
  isVideo = false,
  isDestination = false,
  skeletonLabel,
  lang = 'ID',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const isEn = lang === 'EN';

  useEffect(() => {
    setIsLoaded(false);
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
      return;
    }
    // Safety timeout to prevent infinite skeleton if network fails silently
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, [src]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onError) onError(e);
  };

  const defaultLabel = isVideo
    ? (isEn ? 'LOADING 4K VIDEO...' : 'MEMUAT VIDEO 4K...')
    : isDestination
    ? (isEn ? 'LOADING DESTINATION...' : 'MEMUAT DESTINASI...')
    : (isEn ? 'LOADING HD PHOTO...' : 'MEMUAT FOTO HD...');

  return (
    <div className={`relative w-full h-full overflow-hidden bg-slate-950 ${wrapperClassName}`}>
      {/* Loading Skeleton Overlay */}
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800/80 transition-opacity duration-500 pointer-events-none ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Shimmer Light Wave Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-800/30 to-transparent animate-pulse" />

        {/* Skeleton Badge Card */}
        <div className="relative z-10 flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-slate-900/95 border border-slate-800/90 shadow-2xl backdrop-blur-md max-w-[88%] text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-950/80 border border-slate-700/60 text-slate-400 mb-2 shadow-inner">
            {isVideo ? (
              <Video className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 animate-bounce" />
            ) : isDestination ? (
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 animate-bounce" />
            ) : (
              <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 animate-pulse" />
            )}
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800/90 text-[10px] sm:text-[11px] font-extrabold tracking-wider text-slate-300 shadow">
            <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin text-amber-400 shrink-0" />
            <span className="truncate">{skeletonLabel || defaultLabel}</span>
          </div>
        </div>
      </div>

      {/* Actual Image with Fade & Scale Transition */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} transition-all duration-700 ease-out ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        {...props}
      />
    </div>
  );
};

export interface VideoWithSkeletonProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  skeletonLabel?: string;
  wrapperClassName?: string;
  lang?: 'ID' | 'EN';
}

export const VideoWithSkeleton: React.FC<VideoWithSkeletonProps> = ({
  src,
  className = '',
  wrapperClassName = '',
  skeletonLabel,
  lang = 'ID',
  onLoadedData,
  onCanPlay,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isEn = lang === 'EN';

  const handleLoadedData = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setIsLoaded(true);
    if (onLoadedData) onLoadedData(e);
  };

  const handleCanPlay = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setIsLoaded(true);
    if (onCanPlay) onCanPlay(e);
  };

  useEffect(() => {
    setIsLoaded(false);
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, [src]);

  const defaultLabel = isEn ? 'BUFFERING 4K VIDEO STREAM...' : 'MEMUAT STREAMING VIDEO 4K...';

  return (
    <div className={`relative w-full h-full overflow-hidden bg-slate-950 flex items-center justify-center ${wrapperClassName}`}>
      {/* Loading Skeleton Overlay */}
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800/80 transition-opacity duration-500 pointer-events-none ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-800/30 to-transparent animate-pulse" />

        <div className="relative z-10 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-900/95 border border-slate-800/90 shadow-2xl backdrop-blur-md max-w-[88%] text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-slate-950/80 border border-slate-700/60 text-red-400 mb-2.5 shadow-inner">
            <Video className="w-6 h-6 animate-bounce" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800/90 text-[11px] font-extrabold tracking-wider text-slate-300 shadow">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-red-400 shrink-0" />
            <span className="truncate">{skeletonLabel || defaultLabel}</span>
          </div>
        </div>
      </div>

      <video
        src={src}
        onLoadedData={handleLoadedData}
        onCanPlay={handleCanPlay}
        className={`${className} transition-opacity duration-700 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
