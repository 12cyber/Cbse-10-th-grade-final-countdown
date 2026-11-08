/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  CBSE_SUBJECT_BOOKS,
  MOTIVATIONAL_QUOTES,
  SubjectBook,
  calculateCountdown,
  formatISTClock,
} from './utils/countdown';
import { RainWindowCanvas } from './components/RainWindowCanvas';
import { CountdownDisplay } from './components/CountdownDisplay';
import { BookshelfPanel, MotivationalPanel } from './components/StudyRoomPanels';
import { Clock, CloudRain, Eye, Maximize2, MonitorPlay, Sparkles } from 'lucide-react';

export default function App() {
  const [nowMs, setNowMs] = useState<number>(() => Date.now());
  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const [selectedBook, setSelectedBook] = useState<SubjectBook>(CBSE_SUBJECT_BOOKS[0]);
  const [rainEnabled, setRainEnabled] = useState<boolean>(true);
  const [ambientGlowLevel, setAmbientGlowLevel] = useState<'subtle' | 'high'>('high');
  const [isSimulatedStarted, setIsSimulatedStarted] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('sim') === 'started';
    }
    return false;
  });
  const [cleanStreamMode, setCleanStreamMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('clean') === '1';
    }
    return false;
  });
  const [isBroadcastMode, setIsBroadcastMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return (
        params.get('broadcast') === '1' ||
        params.get('broadcast') === 'true' ||
        params.get('stream') === '1' ||
        params.get('stream') === 'true'
      );
    }
    return false;
  });

  const setBroadcastUrlMode = useCallback((enabled: boolean) => {
    setIsBroadcastMode(enabled);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (enabled) {
        url.searchParams.set('broadcast', '1');
      } else {
        url.searchParams.delete('broadcast');
        url.searchParams.delete('stream');
      }
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  // Allow pressing Escape on a local keyboard to exit 1080p Broadcast Mode
  useEffect(() => {
    if (!isBroadcastMode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setBroadcastUrlMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBroadcastMode, setBroadcastUrlMode]);

  // Real-time 1-second interval for accurate countdown & Indian Standard Time (IST) clock
  useEffect(() => {
    const updateClock = () => {
      setNowMs(Date.now());
    };
    updateClock();
    const timerId = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timerId);
  }, []);

  // Automatic periodic rotation of motivational quotes every 10 seconds
  useEffect(() => {
    const quoteInterval = window.setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    }, 10000);
    return () => window.clearInterval(quoteInterval);
  }, []);

  // In 24/7 Clean Broadcast Mode, automatically rotate the highlighted NCERT subject book every 30 seconds
  useEffect(() => {
    if (!isBroadcastMode) return;
    const bookInterval = window.setInterval(() => {
      setSelectedBook((prev) => {
        const currentIdx = CBSE_SUBJECT_BOOKS.findIndex((b) => b.id === prev.id);
        const nextIdx = (currentIdx + 1) % CBSE_SUBJECT_BOOKS.length;
        return CBSE_SUBJECT_BOOKS[nextIdx];
      });
    }, 30000);
    return () => window.clearInterval(bookInterval);
  }, [isBroadcastMode]);

  const countdown = calculateCountdown(nowMs);
  const istClock = formatISTClock(nowMs);
  const currentQuote = MOTIVATIONAL_QUOTES[quoteIndex];

  const handlePrevQuote = () => {
    setQuoteIndex((prev) => (prev - 1 + MOTIVATIONAL_QUOTES.length) % MOTIVATIONAL_QUOTES.length);
  };

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
  };

  return (
    <div
      data-testid="app-root"
      data-broadcast-mode={isBroadcastMode ? 'true' : 'false'}
      className={`relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-white select-none ${
        isBroadcastMode ? 'h-screen overflow-hidden cursor-none' : ''
      }`}
    >
      {/* Immersive Nighttime Study Room & Panoramic City Window with Rain */}
      <RainWindowCanvas rainEnabled={rainEnabled} ambientGlowLevel={ambientGlowLevel} />

      {/* TOP BAR: CBSE CLASS X • 2027 Branding | Live IST Digital Clock | Room Controls (Hidden in 1080p Broadcast Mode) */}
      <header className="relative z-10 w-full max-w-[1800px] mx-auto px-4 sm:px-8 pt-3.5 pb-3 flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-6 border-b border-cyan-500/25">
        {/* Zone 1: Brand Title */}
        <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
          <span
            data-testid="brand-mark"
            className="font-display text-sm sm:text-base font-extrabold tracking-[0.22em] text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.55)]"
          >
            CBSE CLASS X • 2027
          </span>
        </div>

        {/* Zone 2: Indian Standard Time (IST) Digital Clock */}
        <div
          data-testid="ist-digital-clock"
          aria-label="Indian Standard Time Digital Clock"
          className="flex items-center gap-2.5 rounded-xl bg-[#040d21]/78 backdrop-blur-md border border-cyan-400/55 px-3.5 py-1.5 shadow-[0_0_20px_rgba(34,211,238,0.16)] whitespace-nowrap shrink-0"
        >
          <Clock className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
          <div className="flex items-center gap-2 text-xs">
            <span className="font-display font-bold tracking-wider text-slate-200 hidden xl:inline">
              INDIAN STANDARD TIME
            </span>
            <span className="text-cyan-500/60 hidden xl:inline" aria-hidden="true">
              ·
            </span>
            <span
              data-testid="ist-time-value"
              className="font-mono-tabular font-extrabold text-cyan-300 tracking-wider"
            >
              {istClock.timeString} {istClock.period} IST
            </span>
            <span className="text-slate-400" aria-hidden="true">
              ·
            </span>
            <span className="font-mono-tabular text-xs text-slate-200 hidden sm:inline">
              {istClock.dateString}
            </span>
          </div>
        </div>

        {/* Zone 3: Interactive Study Room & Livestream Controls (Hidden when ?broadcast=1 is active) */}
        {!isBroadcastMode ? (
          <div
            data-testid="studio-controls-bar"
            className="flex flex-wrap items-center justify-center gap-2 shrink-0"
          >
            <button
              type="button"
              onClick={() => setRainEnabled((prev) => !prev)}
              aria-pressed={rainEnabled}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                rainEnabled
                  ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-200'
                  : 'bg-slate-900/75 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5" />
              <span>Rain: {rainEnabled ? 'On' : 'Off'}</span>
            </button>

            <button
              type="button"
              onClick={() =>
                setAmbientGlowLevel((prev) => (prev === 'high' ? 'subtle' : 'high'))
              }
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900/75 hover:bg-cyan-500/15 border border-cyan-500/35 text-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Glow: {ambientGlowLevel === 'high' ? 'High' : 'Subtle'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsSimulatedStarted((prev) => !prev)}
              data-testid="toggle-exam-started-btn"
              aria-pressed={isSimulatedStarted}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                isSimulatedStarted
                  ? 'bg-cyan-400 text-slate-950 border-cyan-300 font-semibold'
                  : 'bg-[#06142e]/85 hover:bg-cyan-500/20 border-cyan-400/50 text-cyan-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isSimulatedStarted ? 'Live Countdown' : 'Preview Exam Started'}</span>
            </button>

            <button
              type="button"
              onClick={() => setCleanStreamMode((prev) => !prev)}
              aria-pressed={cleanStreamMode}
              title="Toggle distraction-free center HUD for 16:9 focus"
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900/75 hover:bg-cyan-500/15 border border-cyan-500/35 text-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-cyan-300" />
              <span>{cleanStreamMode ? 'Show Side Decks' : 'Focus HUD'}</span>
            </button>

            <button
              type="button"
              onClick={() => setBroadcastUrlMode(true)}
              data-testid="enable-broadcast-mode-btn"
              title="Switch to chromeless 1080p Broadcast URL (?broadcast=1) for 24/7 YouTube Cloud Streaming"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/70 text-cyan-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <MonitorPlay className="w-3.5 h-3.5 text-cyan-300" />
              <span>1080p Broadcast URL</span>
            </button>
          </div>
        ) : (
          <div
            data-testid="broadcast-header-meta"
            className="hidden lg:flex items-center gap-2 text-xs text-slate-300 font-mono-tabular whitespace-nowrap shrink-0"
          >
            <span className="text-cyan-300 font-semibold">TARGET:</span>
            <span>17 FEB 2027 · 10:30 AM IST</span>
          </div>
        )}
      </header>

      {/* MAIN 16:9 STUDY ROOM STAGE */}
      <main className="relative z-10 flex-1 w-full max-w-[1800px] mx-auto px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-center">
        <div
          className={`w-full grid gap-5 lg:gap-7 items-stretch ${
            cleanStreamMode
              ? 'grid-cols-1 max-w-4xl mx-auto'
              : 'grid-cols-1 lg:grid-cols-12'
          }`}
        >
          {/* Left Zone: Study Room Bookshelf (Mathematics, Science, Social Science, English) */}
          {!cleanStreamMode && (
            <div className="lg:col-span-3 flex flex-col justify-center order-2 lg:order-1">
              <BookshelfPanel
                selectedBook={selectedBook}
                onSelectBook={setSelectedBook}
                isBroadcastMode={isBroadcastMode}
              />
            </div>
          )}

          {/* Center Zone: Futuristic Digital Countdown Display (MONTHS, DAYS, HOURS, MINUTES, SECONDS) */}
          <div
            className={`${
              cleanStreamMode ? 'col-span-1' : 'lg:col-span-6'
            } flex flex-col justify-center order-1 lg:order-2`}
          >
            <CountdownDisplay
              countdown={countdown}
              isSimulatedStarted={isSimulatedStarted}
              onResetSimulation={() => setIsSimulatedStarted(false)}
            />
          </div>

          {/* Right Zone: Motivational Quote Area & Mathematics Study Desk Props */}
          {!cleanStreamMode && (
            <div className="lg:col-span-3 flex flex-col justify-center order-3">
              <MotivationalPanel
                currentQuote={currentQuote}
                quoteIndex={quoteIndex}
                totalQuotes={MOTIVATIONAL_QUOTES.length}
                onPrevQuote={handlePrevQuote}
                onNextQuote={handleNextQuote}
                isBroadcastMode={isBroadcastMode}
              />
            </div>
          )}
        </div>
      </main>

      {/* BOTTOM BAR: Study Desk Horizon & Motivational Message */}
      <footer className="relative z-10 w-full max-w-[1800px] mx-auto px-4 sm:px-8 pb-4 pt-2">
        <div className="rounded-2xl bg-[#030a1c]/85 backdrop-blur-md border border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.18)] px-4 py-3 sm:px-6 sm:py-3.5 flex flex-col md:flex-row items-center justify-between gap-2 text-center">
          {/* Left Study Desk Context */}
          <div className="hidden xl:flex items-center gap-2 text-xs text-slate-300">
            <span className="font-semibold text-cyan-300">NIGHT STUDY DESK</span>
            <span aria-hidden="true">·</span>
            <span>Mathematics · Science · Social Science · English</span>
          </div>

          {/* Center Bottom Motivational Message (Mandatory Exact Copy) */}
          <div className="flex items-center justify-center gap-3 mx-auto">
            <span className="hidden sm:block h-px w-8 md:w-14 bg-gradient-to-r from-transparent to-cyan-400" />
            <p
              data-testid="bottom-motivational-message"
              className="font-display text-xs sm:text-sm md:text-base font-extrabold tracking-[0.22em] text-cyan-200 drop-shadow-[0_0_12px_rgba(34,211,238,0.65)]"
            >
              ALL THE BEST FOR YOUR BOARD EXAMS!
            </p>
            <span className="hidden sm:block h-px w-8 md:w-14 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>

          {/* Right Target Summary */}
          <div className="hidden xl:flex items-center gap-2 text-xs text-slate-300">
            <span>17 FEB 2027</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular text-cyan-300 font-semibold">
              10:30 AM IST
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
