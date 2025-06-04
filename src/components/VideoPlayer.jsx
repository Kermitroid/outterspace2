import React, { useRef, useState, useEffect } from 'react';
import { Maximize, Minimize, Play, Pause, Volume2, VolumeX, Settings, FastForward, Rewind, ExternalLink } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const VideoPlayer = ({ videoSrc, poster, title }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  let controlsTimeoutRef = useRef(null);

  const isEmbed = videoSrc && (videoSrc.includes('youtube.com/embed') || videoSrc.includes('player.vimeo.com/video'));

  useEffect(() => {
    const video = videoRef.current;
    if (!video || isEmbed) return;

    const updateProgress = () => setProgress(video.currentTime);
    const setVideoDuration = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', setVideoDuration);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('volumechange', handleVolumeChange);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', setVideoDuration);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [videoSrc, isEmbed]);

  const hideControls = () => {
    if (isPlaying && !isInteracting) {
      setShowControls(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(hideControls, 3000);
  };

  useEffect(() => {
    if (isPlaying && !isInteracting) {
      controlsTimeoutRef.current = setTimeout(hideControls, 3000);
    } else {
      setShowControls(true);
      clearTimeout(controlsTimeoutRef.current);
    }
    return () => clearTimeout(controlsTimeoutRef.current);
  }, [isPlaying, isInteracting]);


  const togglePlayPause = () => {
    if (isEmbed) return; // Controls handled by iframe
    const video = videoRef.current;
    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleVolumeChange = (newVolume) => {
    if (isEmbed) return;
    const video = videoRef.current;
    video.volume = newVolume[0];
    video.muted = newVolume[0] === 0;
  };

  const toggleMute = () => {
    if (isEmbed) return;
    const video = videoRef.current;
    video.muted = !video.muted;
  };

  const handleProgressChange = (newProgress) => {
    if (isEmbed) return;
    const video = videoRef.current;
    video.currentTime = newProgress[0];
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const toggleFullScreen = () => {
    if (isEmbed) { // For embeds, we can't control their internal fullscreen
      // Potentially open the video source in a new tab for a "fuller" experience
      if (videoSrc.includes('youtube.com/embed')) {
        const videoId = videoSrc.split('/').pop().split('?')[0];
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
      } else if (videoSrc.includes('player.vimeo.com/video')) {
         const videoId = videoSrc.split('/').pop().split('?')[0];
        window.open(`https://vimeo.com/${videoId}`, '_blank');
      }
      return;
    }
    const player = playerRef.current;
    if (!document.fullscreenElement) {
      player.requestFullscreen().catch(err => console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`));
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };
  
  useEffect(() => {
    const handleFullScreenChange = () => setIsFullScreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  const handleSeek = (offset) => {
    if (isEmbed) return;
    const video = videoRef.current;
    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + offset));
  };

  if (isEmbed) {
    return (
      <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl bg-black relative group">
        <iframe
          src={videoSrc}
          title={title || "Embedded Video"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
         <a 
          href={videoSrc.startsWith('https://www.youtube.com/embed') ? `https://www.youtube.com/watch?v=${videoSrc.split('/').pop().split('?')[0]}` : videoSrc}
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
          title="Open in new tab"
        >
          <ExternalLink size={18} />
        </a>
      </div>
    );
  }


  return (
    <div 
      ref={playerRef} 
      className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl bg-black relative group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { if (isPlaying) setShowControls(false); }}
      onMouseEnter={() => setShowControls(true)}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        className="w-full h-full object-contain"
        onClick={togglePlayPause}
      />
      <AnimatePresence>
        {showControls && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-between p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
          >
            {/* Top controls (e.g., title) - can be added here if needed */}
            <div></div>

            {/* Bottom controls */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Slider
                  value={[progress]}
                  max={duration || 0}
                  step={1}
                  onValueChange={handleProgressChange}
                  className="flex-grow h-2 [&>span:first-child]:h-2 [&>span:first-child>span]:h-2 [&>span:first-child>span]:w-2 [&>span:first-child>span]:border-2"
                />
                <span className="text-xs text-white tabular-nums">{formatTime(progress)} / {formatTime(duration)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => handleSeek(-10)}>
                    <Rewind size={20} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={togglePlayPause}>
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => handleSeek(10)}>
                    <FastForward size={20} />
                  </Button>
                  <div className="flex items-center gap-1 group/volume">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleMute}>
                      {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </Button>
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={1}
                      step={0.05}
                      onValueChange={handleVolumeChange}
                      className="w-20 h-2 opacity-0 group-hover/volume:opacity-100 transition-opacity duration-200 [&>span:first-child]:h-2 [&>span:first-child>span]:h-2 [&>span:first-child>span]:w-2 [&>span:first-child>span]:border-2"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Settings size={20} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleFullScreen}>
                    {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPlayer;