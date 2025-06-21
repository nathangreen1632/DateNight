export async function removeFavorite(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/favorites/${id}`, {
      method: 'DELETE',
      headers: {
        'user-id': 'demo-user-123',
      },
    });

    return res.ok;
  } catch (err) {
    console.error('Error removing favorite:', err);
    return false;
  }
}
