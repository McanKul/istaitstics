import React, { useState } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { differenceInDays, format } from 'date-fns';

interface Props {
  initial?: DateRange;
  onApply: (r: DateRange) => void;
  onClose: () => void;
}

const DateRangeModal = ({ initial, onApply, onClose }: Props) => {
  const [range, setRange] = useState<DateRange | undefined>(initial);
  const days =
    range?.from && range?.to ? differenceInDays(range.to, range.from) + 1 : 0;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[350px] rounded-lg shadow-xl p-6">
        {range?.from && range?.to && (
          <p className="text-sm font-medium mb-2">{days} DAYS SELECTED</p>
        )}
        <p className="text-lg font-semibold mb-4">
          {range?.from && range?.to
            ? `${format(range.from, 'MMM d, yyyy')} – ${format(
                range.to,
                'MMM d, yyyy',
              )}`
            : 'Select date range'}
        </p>

        <DayPicker
          mode="range"
          selected={range}
          onSelect={setRange}
          showOutsideDays
          weekStartsOn={0}
          numberOfMonths={1}
          className="mb-4"
        />

        <div className="flex justify-end space-x-6">
          <button onClick={onClose} className="text-blue-600 hover:underline">
            CANCEL
          </button>
          <button
            disabled={!range?.from || !range?.to}
            onClick={() => range && onApply(range)}
            className={`font-semibold ${
              range?.from && range?.to
                ? 'text-blue-600 hover:underline'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangeModal;
