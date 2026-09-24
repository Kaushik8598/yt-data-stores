import moment from "moment";

/**
 * Standard date & time format constants across the application
 */
export const DATE_FORMATS = {
  STANDARD_DATE: "DD/MM/YYYY",
  STANDARD_DATETIME: "DD/MM/YYYY hh:mm A",
  FRIENDLY_DATE: "MMM DD, YYYY",
  FRIENDLY_DATETIME: "MMM DD, YYYY hh:mm A",
  ISO_DATE: "YYYY-MM-DD",
  TIME_ONLY: "hh:mm A",
  TIME_24H: "HH:mm",
  MONTH_YEAR: "MMMM YYYY",
} as const;

export type DateInput = string | number | Date | moment.Moment | null | undefined;

/**
 * Formats any valid date input into standard date format (DD/MM/YYYY)
 * @param date - Date input
 * @param format - Optional custom format, defaults to STANDARD_DATE
 */
export function formatDate(
  date: DateInput,
  format: string = DATE_FORMATS.STANDARD_DATE
): string {
  if (!date) return "-";
  const m = moment(date);
  return m.isValid() ? m.format(format) : "-";
}

/**
 * Formats any valid date input into standard date & time format (DD/MM/YYYY hh:mm A)
 * @param date - Date input
 * @param format - Optional custom format, defaults to STANDARD_DATETIME
 */
export function formatDateTime(
  date: DateInput,
  format: string = DATE_FORMATS.STANDARD_DATETIME
): string {
  if (!date) return "-";
  const m = moment(date);
  return m.isValid() ? m.format(format) : "-";
}

/**
 * Formats date into human-friendly format (e.g., "Sep 24, 2026")
 */
export function formatFriendlyDate(date: DateInput): string {
  return formatDate(date, DATE_FORMATS.FRIENDLY_DATE);
}

/**
 * Formats date and time into human-friendly format (e.g., "Sep 24, 2026 05:30 PM")
 */
export function formatFriendlyDateTime(date: DateInput): string {
  return formatDate(date, DATE_FORMATS.FRIENDLY_DATETIME);
}

/**
 * Formats time only (e.g., "05:30 PM")
 */
export function formatTime(date: DateInput): string {
  return formatDate(date, DATE_FORMATS.TIME_ONLY);
}

/**
 * Returns human-readable relative time (e.g., "2 hours ago", "in 5 days")
 */
export function formatTimeAgo(date: DateInput): string {
  if (!date) return "-";
  const m = moment(date);
  return m.isValid() ? m.fromNow() : "-";
}

/**
 * Validates if the given value is a valid date
 */
export function isValidDate(date: DateInput): boolean {
  if (!date) return false;
  return moment(date).isValid();
}

/**
 * Converts date to ISO string for backend/database storage
 */
export function toIsoString(date: DateInput): string | null {
  if (!date) return null;
  const m = moment(date);
  return m.isValid() ? m.toISOString() : null;
}

/**
 * Returns start of day (00:00:00)
 */
export function getStartOfDay(date: DateInput = new Date()): Date {
  return moment(date).startOf("day").toDate();
}

/**
 * Returns end of day (23:59:59.999)
 */
export function getEndOfDay(date: DateInput = new Date()): Date {
  return moment(date).endOf("day").toDate();
}
