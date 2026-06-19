export default function parsingResponse<T>(response: Response): Promise<T> {
  return response.text().then((text) => {
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      throw new Error(data?.message || `HTTP ${response.status}`);
    }

    return data;
  });
}
