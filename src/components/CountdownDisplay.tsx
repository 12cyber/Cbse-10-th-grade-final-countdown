import React from 'react';
import { CountdownState } from '../utils/countdown';
import { Sparkles, CheckCircle2, Award, BookOpen } from 'lucide-react';

interface CountdownDisplayProps {
  countdown: CountdownState;
  isSimulatedStarted: boolean;
  onResetSimulation?: () => void;
}

export const CountdownDisplay: React.FC<CountdownDisplayProps> = ({
  countdown,
  isSimulatedStarted,
  onResetSimulation,
}) => {
  const showStartedScreen = countdown.hasStarted || isSimulatedStarted;

  return (
    <section
      aria-label="CBSE Class 10 Board Exam 2027 Main Countdown Display"
      data-testid="main-countdown-display"
      data-total-seconds={countdown.totalSecondsRemaining}
      className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center"
    >
      {/* Futuristic Center Digital Display Frame */}
      <div className="relative w-full rounded-2xl bg-[#040d21]/72 backdrop-blur-md border-2 border-cyan-400/80 shadow-[0_0_50px_rgba(34,211,238,0.25),inset_0_0_32px_rgba(34,211,238,0.14)] px-4 py-5 sm:px-7 sm:py-7 md:px-9 md:py-8 overflow-hidden">
        {/* Corner Futuristic HUD Brackets */}
        <span className="pointer-events-none absolute top-2.5 left-2.5 w-5 h-5 border-t-2 border-l-2 border-cyan-300" />
        <span className="pointer-events-none absolute top-2.5 right-2.5 w-5 h-5 border-t-2 border-r-2 border-cyan-300" />
        <span className="pointer-events-none absolute bottom-2.5 left-2.5 w-5 h-5 border-b-2 border-l-2 border-cyan-300" />
        <span className="pointer-events-none absolute bottom-2.5 right-2.5 w-5 h-5 border-b-2 border-r-2 border-cyan-300" />

        {/* Top Neon Cyan Light Bar */}
        <div className="mx-auto mb-3.5 h-0.5 w-40 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_12px_#22d3ee]" />

        {/* Main Title Block */}
        <div className="text-center space-y-1">
          <p className="font-display text-xs sm:text-base md:text-lg font-bold tracking-[0.28em] text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.65)]">
            CBSE CLASS 10
          </p>
          <h1 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-[2.4rem] xl:text-[2.65rem] font-black tracking-[0.04em] text-white leading-tight sm:whitespace-nowrap drop-shadow-[0_2px_20px_rgba(34,211,238,0.45)]">
            THE FINAL COUNTDOWN
          </h1>
          <p className="font-display text-sm sm:text-lg md:text-xl font-extrabold tracking-[0.22em] text-cyan-200 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">
            BOARD EXAM 2027
          </p>
        </div>

        {/* Subtitle: DREAM • STUDY • ACHIEVE */}
        <div className="mt-3 mb-5 flex items-center justify-center gap-3">
          <span className="hidden sm:block h-px w-10 md:w-16 bg-gradient-to-r from-transparent to-cyan-400/70" />
          <p
            data-testid="countdown-subtitle"
            className="font-display text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.3em] text-slate-100/95 whitespace-nowrap"
          >
            DREAM • STUDY • ACHIEVE
          </p>
          <span className="hidden sm:block h-px w-10 md:w-16 bg-gradient-to-l from-transparent to-cyan-400/70" />
        </div>

        {/* Conditional State: FIVE Glowing Countdown Panels (MONTHS, DAYS, HOURS, MINUTES, SECONDS) OR Exam Has Started Screen */}
        {!showStartedScreen ? (
          <>
            <div
              role="timer"
              aria-live="polite"
              aria-atomic="true"
              data-testid="five-countdown-panels"
              className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 md:gap-4 max-w-4xl mx-auto"
            >
              {/* PANEL 1: MONTHS */}
              <div
                data-testid="panel-months"
                className="relative group rounded-xl bg-gradient-to-b from-[#071633]/90 via-[#040d21]/90 to-[#020713]/95 border-2 border-cyan-400/90 shadow-[0_0_24px_rgba(34,211,238,0.28),inset_0_0_18px_rgba(34,211,238,0.14)] px-2 py-3.5 sm:px-2.5 sm:py-5 md:py-6 flex flex-col items-center justify-center transition-transform duration-200"
              >
                <div className="absolute top-0 inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
                <span
                  data-testid="value-months"
                  className="font-mono-tabular text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-cyan-300 drop-shadow-[0_0_16px_rgba(34,211,238,0.8)] select-all leading-none"
                >
                  {countdown.monthsFormatted}
                </span>
                <span className="mt-2 sm:mt-2.5 font-display text-[10px] sm:text-[11px] md:text-xs font-extrabold tracking-[0.2em] text-white">
                  MONTHS
                </span>
                <div className="absolute bottom-0 inset-x-5 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
              </div>

              {/* PANEL 2: DAYS (Total Days) */}
              <div
                data-testid="panel-days"
                className="relative group rounded-xl bg-gradient-to-b from-[#071633]/90 via-[#040d21]/90 to-[#020713]/95 border-2 border-cyan-400/90 shadow-[0_0_24px_rgba(34,211,238,0.28),inset_0_0_18px_rgba(34,211,238,0.14)] px-2 py-3.5 sm:px-2.5 sm:py-5 md:py-6 flex flex-col items-center justify-center transition-transform duration-200"
              >
                <div className="absolute top-0 inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
                <span
                  data-testid="value-days"
                  className="font-mono-tabular text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-cyan-300 drop-shadow-[0_0_16px_rgba(34,211,238,0.8)] select-all leading-none"
                >
                  {countdown.daysFormatted}
                </span>
                <span className="mt-2 sm:mt-2.5 font-display text-[10px] sm:text-[11px] md:text-xs font-extrabold tracking-[0.2em] text-white">
                  DAYS
                </span>
                <div className="absolute bottom-0 inset-x-5 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
              </div>

              {/* PANEL 3: HOURS (Total Hours) */}
              <div
                data-testid="panel-hours"
                className="relative group rounded-xl bg-gradient-to-b from-[#071633]/90 via-[#040d21]/90 to-[#020713]/95 border-2 border-cyan-400/90 shadow-[0_0_24px_rgba(34,211,238,0.28),inset_0_0_18px_rgba(34,211,238,0.14)] px-2 py-3.5 sm:px-2.5 sm:py-5 md:py-6 flex flex-col items-center justify-center transition-transform duration-200"
              >
                <div className="absolute top-0 inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
                <span
                  data-testid="value-hours"
                  className="font-mono-tabular text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-cyan-300 drop-shadow-[0_0_16px_rgba(34,211,238,0.8)] select-all leading-none"
                >
                  {countdown.totalHoursFormatted}
                </span>
                <span className="mt-2 sm:mt-2.5 font-display text-[10px] sm:text-[11px] md:text-xs font-extrabold tracking-[0.2em] text-white">
                  HOURS
                </span>
                <div className="absolute bottom-0 inset-x-5 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
              </div>

              {/* PANEL 4: MINUTES (Total Minutes) */}
              <div
                data-testid="panel-minutes"
                className="relative group rounded-xl bg-gradient-to-b from-[#071633]/90 via-[#040d21]/90 to-[#020713]/95 border-2 border-cyan-400/90 shadow-[0_0_24px_rgba(34,211,238,0.28),inset_0_0_18px_rgba(34,211,238,0.14)] px-1.5 py-3.5 sm:px-2 sm:py-5 md:py-6 flex flex-col items-center justify-center transition-transform duration-200"
              >
                <div className="absolute top-0 inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
                <span
                  data-testid="value-minutes"
                  className="font-mono-tabular text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-cyan-300 drop-shadow-[0_0_16px_rgba(34,211,238,0.8)] select-all leading-none"
                >
                  {countdown.minutesFormatted}
                </span>
                <span className="mt-2 sm:mt-2.5 font-display text-[10px] sm:text-[11px] md:text-xs font-extrabold tracking-[0.2em] text-white">
                  MINUTES
                </span>
                <div className="absolute bottom-0 inset-x-5 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
              </div>

              {/* PANEL 5: SECONDS */}
              <div
                data-testid="panel-seconds"
                className="col-span-2 sm:col-span-1 relative group rounded-xl bg-gradient-to-b from-[#071633]/90 via-[#040d21]/90 to-[#020713]/95 border-2 border-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.36),inset_0_0_20px_rgba(34,211,238,0.18)] px-2 py-3.5 sm:px-2.5 sm:py-5 md:py-6 flex flex-col items-center justify-center transition-transform duration-200"
              >
                <div className="absolute top-0 inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
                <span
                  data-testid="value-seconds"
                  className="font-mono-tabular text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-cyan-200 drop-shadow-[0_0_20px_rgba(34,211,238,0.9)] select-all leading-none"
                >
                  {countdown.secondsFormatted}
                </span>
                <span className="mt-2 sm:mt-2.5 font-display text-[10px] sm:text-[11px] md:text-xs font-extrabold tracking-[0.2em] text-white">
                  SECONDS
                </span>
                <div className="absolute bottom-0 inset-x-5 h-0.5 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
              </div>
            </div>

            {/* Target Timestamp, Total Days/Hours Summary & Academic Session Readiness Bar */}
            <div className="mt-5 pt-3.5 border-t border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-200">
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 font-medium tracking-wide">
                <span className="text-cyan-300 font-semibold whitespace-nowrap">TARGET:</span>
                <span className="whitespace-nowrap">17 FEB 2027 · 10:30 AM IST</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular text-cyan-200 font-semibold whitespace-nowrap">
                  {countdown.totalDaysFormatted} Days ({countdown.totalHoursFormatted} Hrs)
                </span>
              </div>

              <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
                <span className="text-[11px] tracking-wider text-slate-300">
                  SESSION PROGRESS
                </span>
                <div className="w-20 h-1.5 rounded-full bg-slate-800/90 overflow-hidden border border-cyan-500/30">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300"
                    style={{ width: `${countdown.progressPercent}%` }}
                  />
                </div>
                <span className="font-mono-tabular text-xs font-bold text-cyan-300">
                  {countdown.progressPercent}%
                </span>
              </div>
            </div>
          </>
        ) : (
          /* EXAM HAS STARTED SCREEN */
          <div
            data-testid="exam-started-screen"
            className="my-1 rounded-xl bg-gradient-to-b from-cyan-950/65 via-[#06152d]/92 to-[#030917]/95 border-2 border-cyan-300 shadow-[0_0_40px_rgba(34,211,238,0.35)] px-5 py-5 text-center space-y-3"
          >
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-300/60 text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.35)]">
              <Award className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <p className="font-mono-tabular text-xs font-semibold tracking-[0.22em] text-cyan-300">
                17 FEBRUARY 2027 · 10:30:00 AM IST REACHED
              </p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-[0.12em] text-white drop-shadow-[0_0_20px_rgba(34,211,238,0.7)]">
                EXAM HAS STARTED
              </h2>
            </div>

            <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-200 leading-relaxed">
              The CBSE Class 10 Board Examinations 2027 are now underway. Read every question
              carefully, manage your time with calm precision, and trust every hour of preparation
              you have invested.
            </p>

            <div className="pt-1 flex flex-wrap items-center justify-center gap-3 text-[11px] font-semibold tracking-wider text-cyan-200">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300" />
                STAY CALM & CONFIDENT
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
                WRITE NEAT STEP-BY-STEP ANSWERS
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                YOU ARE READY TO EXCEL
              </span>
            </div>

            {isSimulatedStarted && onResetSimulation && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onResetSimulation}
                  className="px-4 py-1.5 rounded-lg bg-cyan-400/20 hover:bg-cyan-400/30 border border-cyan-300/70 text-xs font-semibold tracking-wider text-cyan-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Return to Live Countdown
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
