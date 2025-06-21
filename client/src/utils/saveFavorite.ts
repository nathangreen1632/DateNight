export async function saveFavorite(
  idea: string,
  mood?: string,
  location?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-id': 'demo-user-123', // replace with real session ID in future
      },
      body: JSON.stringify({ idea, mood, location }),
    });

    if (!res.ok) {
      const data = await res.json();
      return { success: false, error: data.error ?? 'Failed to save favorite' };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}
