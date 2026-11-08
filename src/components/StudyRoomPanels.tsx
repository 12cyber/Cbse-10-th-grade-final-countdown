import React from 'react';
import {
  CBSE_SUBJECT_BOOKS,
  MotivationalQuote,
  SubjectBook,
} from '../utils/countdown';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Headphones,
  PenTool,
  Quote,
  Sparkles,
} from 'lucide-react';

interface BookshelfPanelProps {
  selectedBook: SubjectBook;
  onSelectBook: (book: SubjectBook) => void;
  isBroadcastMode?: boolean;
}

export const BookshelfPanel: React.FC<BookshelfPanelProps> = ({
  selectedBook,
  onSelectBook,
  isBroadcastMode = false,
}) => {
  return (
    <aside
      aria-label="CBSE Class 10 Study Room Bookshelf"
      data-testid="bookshelf-panel"
      className="w-full rounded-2xl bg-[#040d21]/68 backdrop-blur-md border border-cyan-400/50 shadow-[0_0_28px_rgba(6,182,212,0.16)] p-4 sm:p-5 flex flex-col justify-between gap-4"
    >
      <div>
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-cyan-500/25">
          <div>
            <h2 className="font-display text-xs sm:text-sm font-bold tracking-[0.18em] text-cyan-300 whitespace-nowrap">
              STUDY ROOM BOOKSHELF
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Core NCERT & Board Exam 2027 Volumes
            </p>
          </div>
          <BookOpen className="w-4 h-4 text-cyan-300 shrink-0" />
        </div>

        {/* Interactive Vertical Book Spines Shelf */}
        <div className="mt-3.5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-2">
          {CBSE_SUBJECT_BOOKS.map((book) => {
            const isSelected = book.id === selectedBook.id;
            return (
              <button
                key={book.id}
                type="button"
                onClick={() => onSelectBook(book)}
                data-testid={`book-${book.id}`}
                aria-pressed={isSelected}
                className={`group w-full text-left rounded-xl p-2.5 transition-all duration-150 border flex items-center justify-between gap-2 ${
                  isBroadcastMode ? 'cursor-none' : 'cursor-pointer'
                } ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500/25 via-cyan-950/60 to-[#06142e] border-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.28)]'
                    : 'bg-[#061229]/75 hover:bg-[#091b3a]/80 border-cyan-500/25 hover:border-cyan-400/50'
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="font-mono-tabular text-[11px] font-bold text-cyan-300">
                      {book.shortCode}
                    </span>
                    <span className="text-slate-500" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-[11px] text-slate-300">
                      {book.subjectCode}
                    </span>
                  </div>
                  <p className="font-display text-sm font-bold text-white truncate mt-0.5">
                    {book.title}
                  </p>
                </div>
                <span
                  className={`text-[11px] font-semibold whitespace-nowrap shrink-0 ${
                    isSelected ? 'text-cyan-200' : 'text-slate-400 group-hover:text-cyan-300'
                  }`}
                >
                  {isSelected ? 'On Desk' : isBroadcastMode ? 'Syllabus' : 'Inspect'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Book Revision Focus Note on the Study Desk */}
      <div
        data-testid="active-book-details"
        className="rounded-xl bg-[#030918]/85 border border-cyan-400/40 p-3.5 space-y-1.5"
      >
        <div className="flex items-center justify-between gap-2 text-[11px] text-cyan-300 font-semibold tracking-wider whitespace-nowrap">
          <span>ACTIVE DESK BOOK</span>
          <span className="font-mono-tabular">{selectedBook.subjectCode}</span>
        </div>
        <p className="font-display text-sm font-bold text-white">
          {selectedBook.title} — Class X Board Focus
        </p>
        <p className="text-xs text-cyan-100/90 leading-relaxed">
          {selectedBook.keyTopics}
        </p>
        <p className="text-[11px] text-slate-300 pt-1 border-t border-slate-800 leading-relaxed">
          {selectedBook.revisionTip}
        </p>
      </div>
    </aside>
  );
};

interface MotivationalPanelProps {
  currentQuote: MotivationalQuote;
  quoteIndex: number;
  totalQuotes: number;
  onPrevQuote: () => void;
  onNextQuote: () => void;
  isBroadcastMode?: boolean;
}

export const MotivationalPanel: React.FC<MotivationalPanelProps> = ({
  currentQuote,
  quoteIndex,
  totalQuotes,
  onPrevQuote,
  onNextQuote,
  isBroadcastMode = false,
}) => {
  return (
    <aside
      aria-label="Motivational Quote & Study Desk Companion"
      data-testid="motivational-quote-panel"
      className="w-full rounded-2xl bg-[#040d21]/68 backdrop-blur-md border border-cyan-400/50 shadow-[0_0_28px_rgba(6,182,212,0.16)] p-4 sm:p-5 flex flex-col justify-between gap-4"
    >
      {/* Motivational Quote Display */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-cyan-500/25">
          <div>
            <h2 className="font-display text-xs sm:text-sm font-bold tracking-[0.18em] text-cyan-300 whitespace-nowrap">
              DAILY MOTIVATION
            </h2>
            <p className="text-xs text-slate-300 mt-0.5 whitespace-nowrap">
              {currentQuote.focusTag} · Quote {quoteIndex + 1} of {totalQuotes}
            </p>
          </div>
          <Quote className="w-4 h-4 text-cyan-300 shrink-0" />
        </div>

        <blockquote className="min-h-[5.5rem] flex flex-col justify-center py-1">
          <p
            data-testid="active-motivational-quote"
            className="font-display text-base sm:text-lg font-bold text-white leading-snug tracking-wide"
          >
            “{currentQuote.quote}”
          </p>
          <footer className="mt-2 text-xs text-cyan-300 font-medium tracking-wider">
            — {currentQuote.author}
          </footer>
        </blockquote>

        {/* Quote Progress Dots & Optional Manual Switcher Controls */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalQuotes }).map((_, idx) => (
              <span
                key={idx}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === quoteIndex ? 'w-5 bg-cyan-300' : 'w-1.5 bg-slate-700'
                }`}
              />
            ))}
          </div>
          {!isBroadcastMode && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onPrevQuote}
                aria-label="Previous motivational quote"
                className="p-1.5 rounded-lg bg-[#071633] hover:bg-cyan-500/20 border border-cyan-500/35 text-cyan-200 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onNextQuote}
                aria-label="Next motivational quote"
                className="p-1.5 rounded-lg bg-[#071633] hover:bg-cyan-500/20 border border-cyan-500/35 text-cyan-200 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Small Mathematics Book & Study Desk Decorations Card */}
      <div
        data-testid="mathematics-desk-card"
        className="rounded-xl bg-gradient-to-br from-[#061736]/90 to-[#030a1a]/90 border border-cyan-400/45 p-3.5 space-y-2.5"
      >
        <div className="flex items-center gap-3">
          {/* Illustrated Small Mathematics Class 10 Textbook Badge */}
          <div className="w-11 h-14 rounded-lg bg-gradient-to-b from-cyan-400/30 via-blue-900/80 to-slate-950 border border-cyan-300/70 shadow-[0_0_15px_rgba(34,211,238,0.25)] flex flex-col items-center justify-center shrink-0 px-1 text-center">
            <span className="font-mono-tabular text-[9px] font-bold text-cyan-200 tracking-tighter">
              NCERT X
            </span>
            <span className="font-display text-[11px] font-black text-white leading-none my-0.5">
              MATH
            </span>
            <span className="font-mono-tabular text-[8px] text-cyan-300">
              ∑ π √x
            </span>
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-semibold tracking-wider text-cyan-300 whitespace-nowrap">
              STUDY DESK ESSENTIALS
            </p>
            <h3 className="font-display text-sm font-bold text-white">
              Mathematics Class X & Notebook
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              sin²θ + cos²θ = 1 · x = (−b ± √(b² − 4ac)) / 2a
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-1.5 text-[11px] text-slate-200">
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <PenTool className="w-3 h-3 text-cyan-300" />
            Notebook & Pen
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <Headphones className="w-3 h-3 text-cyan-300" />
            Headphones
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1 text-cyan-300 font-medium whitespace-nowrap">
            <Sparkles className="w-3 h-3" />
            Night Study
          </span>
        </div>
      </div>
    </aside>
  );
};
