// src/hooks/useCsvData.ts
import { useState, useEffect, SetStateAction } from 'react';
import Papa from 'papaparse';

export function useCsvData<T = any>(path: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error|undefined>();

  useEffect(() => {
    setLoading(true);
    Papa.parse<T>(path, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: (res: { data: SetStateAction<T[]>; }) => {
        setData(res.data);
        setLoading(false);
      },
      error: (err: SetStateAction<Error | undefined>) => {
        setError(err);
        setLoading(false);
      }
    });
  }, [path]);

  return { data, loading, error };
}
