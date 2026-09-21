import { create } from "zustand";

interface ScrollState {
  scrollProgress: number;
  currentSection: number;
  isLoading: boolean;
  isLoaded: boolean;
  isRsvpSubmitted: boolean;
  isReducedMotion: boolean;
  
  // Actions
  setScrollProgress: (progress: number) => void;
  setCurrentSection: (section: number) => void;
  setIsLoading: (loading: boolean) => void;
  setIsLoaded: (loaded: boolean) => void;
  setRsvpSubmitted: (submitted: boolean) => void;
  setIsReducedMotion: (reduced: boolean) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  scrollProgress: 0,
  currentSection: 0,
  isLoading: true,
  isLoaded: false,
  isRsvpSubmitted: false,
  isReducedMotion: false,

  setScrollProgress: (progress) =>
    set(() => ({
      scrollProgress: Math.max(0, Math.min(1, progress)),
    })),

  setCurrentSection: (section) =>
    set(() => ({
      currentSection: section,
    })),

  setIsLoading: (loading) => set({ isLoading: loading }),
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
  setRsvpSubmitted: (submitted) => set({ isRsvpSubmitted: submitted }),
  setIsReducedMotion: (reduced) => set({ isReducedMotion: reduced }),
}));
