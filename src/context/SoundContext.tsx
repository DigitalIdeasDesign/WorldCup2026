import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface SoundContextType {
  isMuted: boolean;
  isMusicMuted: boolean;
  toggleMute: () => void;
  toggleMusicMute: () => void;
  play: (soundName: keyof typeof SOUND_URLS) => void;
}

const SOUND_URLS = {
  click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  success: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  completion: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',
  transition: 'https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3',
  error: 'https://assets.mixkit.co/active_storage/sfx/2574/2574-preview.mp3',
};

const BGM_URL = 'https://res.cloudinary.com/readviews-365/video/upload/v1777041704/Music/The_Golden_Pitch_js9mpg.mp3';

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('sound_muted');
    return saved ? JSON.parse(saved) : false;
  });

  const [isMusicMuted, setIsMusicMuted] = useState(() => {
    const saved = localStorage.getItem('music_muted');
    return saved ? JSON.parse(saved) : false;
  });

  const [audioCache] = useState<Record<string, HTMLAudioElement>>({});
  const [bgmAudio] = useState(() => {
    const audio = new Audio(BGM_URL);
    audio.loop = true;
    audio.volume = 0.4;
    return audio;
  });

  useEffect(() => {
    localStorage.setItem('sound_muted', JSON.stringify(isMuted));
  }, [isMuted]);

  useEffect(() => {
    localStorage.setItem('music_muted', JSON.stringify(isMusicMuted));
    if (isMusicMuted) {
      bgmAudio.pause();
    } else {
      bgmAudio.play().catch(() => {
        // Autoplay blocked - will play on first interaction
        const playOnInteraction = () => {
          bgmAudio.play().catch(console.warn);
          window.removeEventListener('click', playOnInteraction);
          window.removeEventListener('keydown', playOnInteraction);
        };
        window.addEventListener('click', playOnInteraction);
        window.addEventListener('keydown', playOnInteraction);
      });
    }
  }, [isMusicMuted, bgmAudio]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev: boolean) => !prev);
  }, []);

  const toggleMusicMute = useCallback(() => {
    setIsMusicMuted((prev: boolean) => !prev);
  }, []);

  const play = useCallback((soundName: keyof typeof SOUND_URLS) => {
    if (isMuted) return;

    if (!audioCache[soundName]) {
      audioCache[soundName] = new Audio(SOUND_URLS[soundName]);
    }

    const audio = audioCache[soundName];
    audio.currentTime = 0;
    audio.play().catch(err => console.warn('Audio play failed:', err));
  }, [isMuted, audioCache]);

  return (
    <SoundContext.Provider value={{ isMuted, isMusicMuted, toggleMute, toggleMusicMute, play }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
