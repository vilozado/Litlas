import type { Book } from "../types/book";

const baseUrl = 'http://localhost:3000';

export async function fetchSavedBooks(): Promise<Book[]> {
  const res = await fetch(`${baseUrl}/reading-list`);
  if (!res.ok) throw new Error('Could not fetch books.')
  return await res.json();
}

export async function postBook(book: Book): Promise<Book> {
  const res = await fetch(`${baseUrl}/reading-list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book)
  });
  if (!res.ok) throw new Error('Could not save book.')
  return await res.json();
}