import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Range } from './types';
import DateRangeModal from './DateRangeModal';
import {
  format,
  subDays,
  startOfYear,
  endOfYear,
  startOfMonth,
  endOfMonth,
} from 'date-fns';

/* ------------------------------------------------------------------
   PRESET LİSTESİ — screenshot sırasıyla
------------------------------------------------------------------- */
const PRESETS = [
  'Custom',
  'Last 24 hours',
  'Last 7 days',
  'Last 30 days',
  'Last 90 days',
  '2025',
  'All time',
  'June',
  'May',
] as const;
type Preset = (typeof PRESETS)[number];

interface Props {
  value: Range;
  onChange: (label: string, range: Range) => void;
}

const DateSelector = ({ value, onChange }: Props) => {
  /* ---------------- state ---------------- */
  const [menu, setMenu]   = useState(false);
  const [modal, setModal] = useState(false);
  const [preset, setPreset] = useState<Preset>('Last 30 days');
  const ref = useRef<HTMLDivElement>(null);

  /* ---------------- click-dışarı-kapat ---------------- */
  useEffect(() => {
    const cb = (e: MouseEvent) =>
      menu && ref.current && !ref.current.contains(e.target as Node) && setMenu(false);
    document.addEventListener('mousedown', cb);
    return () => document.removeEventListener('mousedown', cb);
  }, [menu]);

  /* ---------------- preset seçimi ---------------- */
  const choose = (p: Preset) => {
    setPreset(p);
    setMenu(false);

    /* Custom ise modal aç */
    if (p === 'Custom') {
      setModal(true);
      return;
    }

    const now = new Date();
    let range: Range = { from: subDays(now, 29), to: now };

    switch (p) {
      case 'Last 24 hours':
        range = { from: subDays(now, 1), to: now };
        break;
      case 'Last 7 days':
        range = { from: subDays(now, 6), to: now };
        break;
      case 'Last 30 days':
        range = { from: subDays(now, 29), to: now };
        break;
      case 'Last 90 days':
        range = { from: subDays(now, 89), to: now };
        break;
      case '2025': /* içinde bulunulan yıl yerine hard-code edilmiş örnek */
        range = { from: startOfYear(new Date('2025-01-01')), to: endOfYear(new Date('2025-01-01')) };
        break;
      case 'June':
        range = {
          from: startOfMonth(new Date(now.getFullYear(), 5, 1)),
          to: endOfMonth(new Date(now.getFullYear(), 5, 1)),
        };
        break;
      case 'May':
        range = {
          from: startOfMonth(new Date(now.getFullYear(), 4, 1)),
          to: endOfMonth(new Date(now.getFullYear(), 4, 1)),
        };
        break;
      case 'All time':
        range = { from: new Date('2020-01-01'), to: now };
        break;
    }

    onChange(p, range);
  };

  const headline = preset === 'Custom' ? 'Custom' : preset === 'All time' ? 'All time' : preset;
  const subtitle =
    value?.from && value?.to
      ? `${format(value.from, 'MMM d, yyyy')} – ${format(value.to, 'MMM d, yyyy')} (local time UTC +03:00)`
      : '';


    
  /* ---------------- render ---------------- */
  return (
    <>
       {/* ÜST BAŞLIK satırı */}

      <div className="relative inline-block" ref={ref}>
        {/* ana buton */}
        <button
          onClick={() => setMenu((o) => !o)}
          className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          <span className="font-semibold">{preset}</span>
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform ${menu ? 'rotate-180' : ''}`}
          />
        </button>
        <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
        {/* açılır menü */}
        {menu && (
          <div className="absolute z-30 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-md">
            {PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => choose(p)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                  preset === p ? 'bg-blue-50 text-blue-600 font-medium' : ''
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* custom modal */}
      {modal && (
        <DateRangeModal
          initial={value}
          onApply={(r) => {
            setPreset('Custom');
            onChange('Custom', r);
          }}
          onClose={() => setModal(false)}
        />
      )}

      {/* alt yazı (screenshot’taki küçük gri metin) */}
    </>
  );
};

export default DateSelector;
