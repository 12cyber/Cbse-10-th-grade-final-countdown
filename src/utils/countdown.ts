/**
 * Pure countdown & Indian Standard Time (IST, UTC+5:30) calculation utilities
 * Target: 17 February 2027, 10:30:00 AM IST (Asia/Kolkata, UTC+05:30)
 */

export const EXAM_TARGET_ISO = '2027-02-17T10:30:00+05:30';
export const EXAM_TARGET_TIMESTAMP_MS = Date.parse(EXAM_TARGET_ISO);

export interface CountdownState {
  months: number;
  days: number;
  totalDays: number;
  hours: number;
  totalHours: number;
  minutes: number;
  totalMinutes: number;
  seconds: number;
  monthsFormatted: string;
  daysFormatted: string;
  totalDaysFormatted: string;
  hoursFormatted: string;
  totalHoursFormatted: string;
  minutesFormatted: string;
  totalMinutesFormatted: string;
  secondsFormatted: string;
  totalSecondsRemaining: number;
  hasStarted: boolean;
  progressPercent: number;
}

// Academic year start baseline (1 April 2026 00:00:00 IST) for study progress calculation
const ACADEMIC_SESSION_START_MS = Date.parse('2026-04-01T00:00:00+05:30');

/**
 * Calculates the real-time countdown toward the CBSE Class 10 Board Exam 2027.
 * Computes MONTHS, total DAYS, total HOURS, total MINUTES, and SECONDS remaining.
 * Never returns negative values.
 */
export function calculateCountdown(
  nowMs: number = Date.now(),
  targetMs: number = EXAM_TARGET_TIMESTAMP_MS
): CountdownState {
  const diffMs = targetMs - nowMs;

  if (diffMs <= 0 || Number.isNaN(diffMs)) {
    return {
      months: 0,
      days: 0,
      totalDays: 0,
      hours: 0,
      totalHours: 0,
      minutes: 0,
      totalMinutes: 0,
      seconds: 0,
      monthsFormatted: '00',
      daysFormatted: '00',
      totalDaysFormatted: '00',
      hoursFormatted: '00',
      totalHoursFormatted: '00',
      minutesFormatted: '00',
      totalMinutesFormatted: '00',
      secondsFormatted: '00',
      totalSecondsRemaining: 0,
      hasStarted: true,
      progressPercent: 100,
    };
  }

  const totalSecondsRemaining = Math.floor(diffMs / 1000);
  const totalDays = Math.floor(totalSecondsRemaining / 86400);
  const months = Math.floor(totalDays / 30);
  const days = totalDays;
  const totalHours = Math.floor(totalSecondsRemaining / 3600);
  const hours = totalHours;
  const totalMinutes = Math.floor(totalSecondsRemaining / 60);
  const minutes = totalMinutes;
  const seconds = totalSecondsRemaining % 60;

  const totalSessionSpan = Math.max(1, targetMs - ACADEMIC_SESSION_START_MS);
  const elapsedSession = Math.max(0, nowMs - ACADEMIC_SESSION_START_MS);
  const progressPercent = Math.min(99.9, Math.max(0, Number(((elapsedSession / totalSessionSpan) * 100).toFixed(1))));

  return {
    months,
    days,
    totalDays,
    hours,
    totalHours,
    minutes,
    totalMinutes,
    seconds,
    monthsFormatted: String(months).padStart(2, '0'),
    daysFormatted: String(days).padStart(2, '0'),
    totalDaysFormatted: String(totalDays).padStart(2, '0'),
    hoursFormatted: String(hours).padStart(2, '0'),
    totalHoursFormatted: String(totalHours).padStart(2, '0'),
    minutesFormatted: String(minutes).padStart(2, '0'),
    totalMinutesFormatted: String(totalMinutes).padStart(2, '0'),
    secondsFormatted: String(seconds).padStart(2, '0'),
    totalSecondsRemaining,
    hasStarted: false,
    progressPercent,
  };
}

export interface ISTClockDisplay {
  timeString: string;
  period: string;
  dateString: string;
  fullISTLabel: string;
}

/**
 * Formats a given epoch timestamp into Indian Standard Time (Asia/Kolkata, UTC+5:30).
 */
export function formatISTClock(nowMs: number = Date.now()): ISTClockDisplay {
  const date = new Date(nowMs);

  const timeFormatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const dateFormatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const parts = timeFormatter.formatToParts(date);
  const hour = parts.find((p) => p.type === 'hour')?.value ?? '00';
  const minute = parts.find((p) => p.type === 'minute')?.value ?? '00';
  const second = parts.find((p) => p.type === 'second')?.value ?? '00';
  const dayPeriod = (parts.find((p) => p.type === 'dayPeriod')?.value ?? 'AM').toUpperCase();

  const timeString = `${hour}:${minute}:${second}`;
  const dateString = dateFormatter.format(date).toUpperCase();

  return {
    timeString,
    period: dayPeriod,
    dateString,
    fullISTLabel: `${timeString} ${dayPeriod} IST`,
  };
}

export interface MotivationalQuote {
  id: string;
  quote: string;
  author: string;
  focusTag: string;
}

export const MOTIVATIONAL_QUOTES: MotivationalQuote[] = [
  {
    id: 'q1',
    quote: 'Your future is created by what you do today.',
    author: 'CBSE Study Mindset',
    focusTag: 'DAILY DISCIPLINE',
  },
  {
    id: 'q2',
    quote: 'Every chapter completed is one step closer to success.',
    author: 'Board Exam Preparation',
    focusTag: 'CONSISTENT PROGRESS',
  },
  {
    id: 'q3',
    quote: 'Stay focused. Stay consistent. Believe in yourself.',
    author: 'Class X Excellence',
    focusTag: 'UNSHAKABLE FOCUS',
  },
  {
    id: 'q4',
    quote: 'Small daily revisions turn complex theorems into effortless marks.',
    author: 'Academic Mastery',
    focusTag: 'SMART REVISION',
  },
  {
    id: 'q5',
    quote: 'Discipline in the quiet night builds confidence in the exam hall.',
    author: 'Nocturnal Scholar',
    focusTag: 'CALM CONFIDENCE',
  },
  {
    id: 'q6',
    quote: 'Master the fundamentals, practice past papers, and trust your preparation.',
    author: 'Board Strategy 2027',
    focusTag: 'EXAM READINESS',
  },
];

export interface SubjectBook {
  id: 'mathematics' | 'science' | 'social-science' | 'english';
  title: string;
  shortCode: string;
  subjectCode: string;
  spineColor: string;
  accentCyan: string;
  keyTopics: string;
  revisionTip: string;
}

export const CBSE_SUBJECT_BOOKS: SubjectBook[] = [
  {
    id: 'mathematics',
    title: 'Mathematics',
    shortCode: 'MATH X',
    subjectCode: 'Code 041 / 241',
    spineColor: 'from-cyan-500/30 to-blue-900/70',
    accentCyan: '#22d3ee',
    keyTopics: 'Trigonometry · Quadratic Equations · Triangles · Statistics & Probability',
    revisionTip: 'Solve NCERT Exemplar problems and write every step clearly with theorem citations.',
  },
  {
    id: 'science',
    title: 'Science',
    shortCode: 'SCI X',
    subjectCode: 'Code 086',
    spineColor: 'from-sky-500/30 to-indigo-950/70',
    accentCyan: '#38bdf8',
    keyTopics: 'Chemical Reactions · Life Processes · Light Ray Diagrams · Electricity',
    revisionTip: 'Practice balanced chemical equations, neat ray diagrams, and numericals with SI units.',
  },
  {
    id: 'social-science',
    title: 'Social Science',
    shortCode: 'SST X',
    subjectCode: 'Code 087',
    spineColor: 'from-blue-500/30 to-slate-900/80',
    accentCyan: '#60a5fa',
    keyTopics: 'Nationalism in India · Resources & Development · Power Sharing · Sectors of Economy',
    revisionTip: 'Structure 5-mark answers in crisp points and practice map-pointing locations weekly.',
  },
  {
    id: 'english',
    title: 'English',
    shortCode: 'ENG X',
    subjectCode: 'Code 184',
    spineColor: 'from-teal-500/30 to-slate-900/80',
    accentCyan: '#2dd4bf',
    keyTopics: 'First Flight · Footprints Without Feet · Analytical Paragraph · Formal Letter',
    revisionTip: 'Focus on poetic devices, character sketches, and concise grammatical accuracy.',
  },
];
