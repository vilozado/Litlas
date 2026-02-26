import mockBooks from '../../mocks/mockBooks.json';
import type { Book } from '../types/book';
import type { GoogleBooksItem, GoogleBooksResponse } from '../types/googleBooksRes';

const useMock = true;
const cache = new Map<string, Book[]>();

export const fetchBooks = async (subject: string): Promise<Book[]> => {
  if (useMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockBooks.items
      .filter((item) => item.subject === subject)
      .map((item) => transformBookData(item as GoogleBooksItem, subject))
      .filter((book): book is Book => book !== null)
  } else {
    if (cache.has(subject)) return cache.get(subject)!;
    const res = await fetch(`/api/books?subject=${encodeURIComponent(subject)}`);
    const data: GoogleBooksResponse = await res.json();
    const books = (data.items ?? [])
      .map(item => transformBookData(item, subject))
      .filter((book): book is Book => book !== null)

    cache.set(subject, books);
    return books;
  }
}

const transformBookData = (item: GoogleBooksItem, subject: string): Book | null => {
  if (!item.volumeInfo.imageLinks?.thumbnail) return null;

  return {
    id: item.id,
    title: item.volumeInfo.title,
    author: item.volumeInfo.authors?.[0] ?? 'Unknown author',
    thumbnail: item.volumeInfo.imageLinks.thumbnail,
    publishedDate: item.volumeInfo.publishedDate ? parseInt(item.volumeInfo.publishedDate?.substring(0, 4)) : null,
    description: item.volumeInfo.description ?? null,
    categories: item.volumeInfo.categories ?? [],
    subject,
  }
}