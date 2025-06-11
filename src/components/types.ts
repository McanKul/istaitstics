import { DateRange } from 'react-day-picker';
import { isAfter, isBefore, isEqual } from 'date-fns';

export type Range = DateRange;

export const inRange = (d: Date, r: Range | undefined) =>
  !!r?.from &&
  !!r?.to &&
  (isEqual(d, r.from) ||
    isEqual(d, r.to) ||
    (isAfter(d, r.from) && isBefore(d, r.to)));

    