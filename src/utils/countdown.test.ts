import test from 'node:test';
import assert from 'node:assert/strict';
import {
  EXAM_TARGET_ISO,
  EXAM_TARGET_TIMESTAMP_MS,
  calculateCountdown,
  formatISTClock,
  MOTIVATIONAL_QUOTES,
  CBSE_SUBJECT_BOOKS,
} from './countdown';

test('EXAM_TARGET_ISO parses accurately to 17 February 2027 10:30:00 AM IST (05:00:00 UTC)', () => {
  assert.equal(EXAM_TARGET_ISO, '2027-02-17T10:30:00+05:30');
  const expectedUtcMs = Date.UTC(2027, 1, 17, 5, 0, 0, 0); // Month is 0-indexed: 1 = February
  assert.equal(EXAM_TARGET_TIMESTAMP_MS, expectedUtcMs);
});

test('calculateCountdown computes exact months, total days, total hours, total minutes, and seconds before target', () => {
  // Set simulated current time to 100 days (3 months), 14 hours, 25 minutes, and 42 seconds before target
  const offsetSeconds = 100 * 86400 + 14 * 3600 + 25 * 60 + 42;
  const simulatedNow = EXAM_TARGET_TIMESTAMP_MS - offsetSeconds * 1000;

  const state = calculateCountdown(simulatedNow, EXAM_TARGET_TIMESTAMP_MS);
  assert.equal(state.hasStarted, false);
  assert.equal(state.months, 3);
  assert.equal(state.days, 100);
  assert.equal(state.totalDays, 100);
  assert.equal(state.hours, 2414);
  assert.equal(state.totalHours, 2414); // 100 * 24 + 14 total hours
  assert.equal(state.minutes, 144865); // (2414 * 60) + 25 total minutes
  assert.equal(state.totalMinutes, 144865);
  assert.equal(state.seconds, 42);
  assert.equal(state.monthsFormatted, '03');
  assert.equal(state.daysFormatted, '100');
  assert.equal(state.totalDaysFormatted, '100');
  assert.equal(state.hoursFormatted, '2414');
  assert.equal(state.totalHoursFormatted, '2414');
  assert.equal(state.minutesFormatted, '144865');
  assert.equal(state.totalMinutesFormatted, '144865');
  assert.equal(state.secondsFormatted, '42');
  assert.equal(state.totalSecondsRemaining, offsetSeconds);
});

test('calculateCountdown pads single-digit months, days, hours, minutes, and seconds with leading zeros', () => {
  const offsetSeconds = 5 * 60 + 7;
  const simulatedNow = EXAM_TARGET_TIMESTAMP_MS - offsetSeconds * 1000;

  const state = calculateCountdown(simulatedNow, EXAM_TARGET_TIMESTAMP_MS);
  assert.equal(state.hasStarted, false);
  assert.equal(state.monthsFormatted, '00');
  assert.equal(state.daysFormatted, '00');
  assert.equal(state.hoursFormatted, '00');
  assert.equal(state.totalHoursFormatted, '00');
  assert.equal(state.minutesFormatted, '05');
  assert.equal(state.totalMinutesFormatted, '05');
  assert.equal(state.secondsFormatted, '07');
});

test('calculateCountdown never returns negative values when target is reached or passed', () => {
  const atTarget = calculateCountdown(EXAM_TARGET_TIMESTAMP_MS, EXAM_TARGET_TIMESTAMP_MS);
  assert.equal(atTarget.hasStarted, true);
  assert.equal(atTarget.months, 0);
  assert.equal(atTarget.days, 0);
  assert.equal(atTarget.totalDays, 0);
  assert.equal(atTarget.hours, 0);
  assert.equal(atTarget.totalHours, 0);
  assert.equal(atTarget.minutes, 0);
  assert.equal(atTarget.totalMinutes, 0);
  assert.equal(atTarget.seconds, 0);
  assert.equal(atTarget.totalSecondsRemaining, 0);

  const afterTarget = calculateCountdown(EXAM_TARGET_TIMESTAMP_MS + 500000, EXAM_TARGET_TIMESTAMP_MS);
  assert.equal(afterTarget.hasStarted, true);
  assert.equal(afterTarget.months, 0);
  assert.equal(afterTarget.days, 0);
  assert.equal(afterTarget.totalDays, 0);
  assert.equal(afterTarget.hours, 0);
  assert.equal(afterTarget.totalHours, 0);
  assert.equal(afterTarget.minutes, 0);
  assert.equal(afterTarget.totalMinutes, 0);
  assert.equal(afterTarget.seconds, 0);
  assert.equal(afterTarget.monthsFormatted, '00');
  assert.equal(afterTarget.daysFormatted, '00');
  assert.equal(afterTarget.totalDaysFormatted, '00');
  assert.equal(afterTarget.hoursFormatted, '00');
  assert.equal(afterTarget.totalHoursFormatted, '00');
  assert.equal(afterTarget.minutesFormatted, '00');
  assert.equal(afterTarget.totalMinutesFormatted, '00');
  assert.equal(afterTarget.secondsFormatted, '00');
});

test('formatISTClock formats target timestamp as 10:30:00 AM in Asia/Kolkata', () => {
  const ist = formatISTClock(EXAM_TARGET_TIMESTAMP_MS);
  assert.equal(ist.timeString, '10:30:00');
  assert.equal(ist.period, 'AM');
  assert.ok(ist.dateString.includes('2027'));
});

test('motivational quotes and CBSE subject books are populated', () => {
  assert.ok(MOTIVATIONAL_QUOTES.length >= 3);
  assert.equal(CBSE_SUBJECT_BOOKS.length, 4);
  const titles = CBSE_SUBJECT_BOOKS.map((b) => b.title);
  assert.deepEqual(titles, ['Mathematics', 'Science', 'Social Science', 'English']);
});
