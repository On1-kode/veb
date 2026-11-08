export async function request(path = '/postings', method = 'GET', value) {
  const response = await fetch(path, {
    method,
    headers: value === undefined ? {} : { 'Content-Type': 'application/json' },
    body: value === undefined ? undefined : JSON.stringify(value)
  });
  if (!response.ok) {
    const error = new Error(`Сервер повернув помилку HTTP ${response.status}.`);
    if (response.status === 400) {
      const body = await response.json().catch(() => ({}));
      error.fields = body.errors;
    }
    throw error;
  }
  return response.status === 204 ? null : response.json();
}
