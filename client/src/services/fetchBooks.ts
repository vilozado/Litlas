import mockBooks from '../../mocks/mockBooks.json';
import type { Book } from '../types/book';
import type { GoogleBooksItem, GoogleBooksResponse } from '../types/googleBooks';

const mock = true;
const cache = new Map<string, Book[]>();


export const fetchBooks = async (subject: string): Promise<Book[]> => {
  if (mock) {
    return mockBooks.items
      .filter(book => book.subject === subject)
      .map(book => transformBookData(book as GoogleBooksItem, subject))
      .filter((book): book is Book => book !== null)
  } else {
    if (cache.has(subject)) return cache.get(subject)!;
    const res = await fetch(`/api/books?subject=${encodeURIComponent(subject)}`);
    const data: GoogleBooksResponse = await res.json();
    const books = (data.items ?? [])
      .map(book => transformBookData(book, subject))
      .filter((book): book is Book => book !== null)
    cache.set(subject, books);
    return books;
  }
}

const transformBookData = (book: GoogleBooksItem, subject: string): Book | null => {
  const { volumeInfo } = book;

  if (!volumeInfo.imageLinks?.thumbnail) return null;

  return {
    id: book.id,
    title: volumeInfo.title,
    author: volumeInfo.authors?.[0] ?? 'Unknown author',
    thumbnail: volumeInfo.imageLinks.thumbnail.replace('http://', 'https://'),
    publishedDate: volumeInfo.publishedDate ? parseInt(volumeInfo.publishedDate?.substring(0, 4)) : 'Unknown date',
    description: volumeInfo.description ?? 'Couldn\'t find a description for this book.',
    categories: volumeInfo.categories ?? [],
    subject,
  }
}