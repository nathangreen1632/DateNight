import { useEffect, useState } from 'react';

interface UseIdeaGeneratorResult {
  idea: string | null;
  loading: boolean;
  error: string | null;
  refresh: (mood?: string) => Promise<void>;
  setSelectedBudget: (value: string) => Promise<void>;
}

export function useIdeaGenerator(): UseIdeaGeneratorResult {
  const [idea, setIdea] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [mood, setMood] = useState<string>();
  const [budget, setBudget] = useState<string>();

  async function fetchIdea(moodParam?: string): Promise<void> {
    if (!coords) return;

    setLoading(true);
    setError(null);

    try {
      const query = new URLSearchParams({
        lat: coords.lat.toString(),
        lon: coords.lon.toString(),
      });

      if (moodParam) query.append('mood', moodParam);
      if (budget) query.append('budget', budget);

      const res = await fetch(`/api/ideas?${query.toString()}`);
      const data = await res.json();

      if (res.ok && Array.isArray(data.ideas)) {
        setIdea(data.ideas[0] ?? 'No ideas returned.');
      } else {
        setError(data?.error ?? 'Unknown server error.');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  const refresh: (newMood?: string | undefined) => Promise<void> = async (newMood?: string): Promise<void> => {
    setMood(newMood);
    await fetchIdea(newMood);
  };

  const setSelectedBudget: (value: string) => Promise<void> = async (value: string): Promise<void> => {
    setBudget(value);
    await fetchIdea(mood);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition): void => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => setError('Unable to access location'),
      { timeout: 8000 }
    );
  }, []);

  useEffect((): void => {
    if (coords) {
      void fetchIdea(mood);
    }
  }, [coords]);

  return { idea, loading, error, refresh, setSelectedBudget };
}
