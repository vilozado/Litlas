import mockBooks from "../../mocks/mockBooks.json";
import type { Book } from "../types/book";
import type {
  GoogleBooksItem,
  GoogleBooksResponse,
} from "../types/googleBooks";

const mock = import.meta.env.VITE_USE_MOCKS; // Determine whether to use mock data based on the VITE_USE_MOCKS environment variable, which can be set in the .env file
const cache = new Map<string, Book[]>(); // In-memory cache to store fetched books by subject if clicked multiple times on the same country

export const fetchBooks = async (subject: string): Promise<Book[]> => {
  if (mock) {
    // If mock is true, filter the mockBooks by subject and return them as Book objects without making an API call
    return (
      mockBooks.items
        .filter((book) => book.subject === subject)
        // Map the filtered mockBooks to Book objects using the transformBookData function, and filter out any null values (books that were skipped because they didn't have covers)
        .map((book) => transformBookData(book as GoogleBooksItem, subject))
        .filter((book): book is Book => book !== null)
    );
  } else {
    // If mock is false, check the cache first before making an API call to fetch books by subject
    const cached = cache.get(subject);
    if (cached) return cached;
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/dashboard/books?subject=${encodeURIComponent(subject)}`, // Make a GET request to the backend API to fetch books by subject, encoding the subject to ensure it's safe for use in a URL
    );
    const data: GoogleBooksResponse = await res.json();
    const books = (data.items ?? [])
      .map((book) => transformBookData(book, subject))
      .filter((book): book is Book => book !== null);
    cache.set(subject, books); // Store the fetched books in the cache before returning them, so that subsequent requests can be served from the cache without making another API call
    return books;
  }
};

const transformBookData = (
  book: GoogleBooksItem,
  subject: string,
): Book | null => {
  const { volumeInfo } = book; // Extract volumeInfo from the Google Books API response

  // if (!volumeInfo.imageLinks?.thumbnail) return null; // Skip books without covers for display in the UI

  return {
    id: book.id,
    title: volumeInfo.title,
    author: volumeInfo.authors?.[0] ?? "Unknown author",
    thumbnail: volumeInfo.imageLinks?.thumbnail?.replace("http://", "https://"), // Ensure cover URLs use HTTPS
    publishedDate: volumeInfo.publishedDate
      ? parseInt(volumeInfo.publishedDate?.substring(0, 4)) // Extract just the year from the publishedDate string and convert to a number
      : "Unknown date",
    description:
      volumeInfo.description ?? "Couldn't find a description for this book.",
    categories: volumeInfo.categories ?? [],
    subject, // Add the subject to Book - it doesn't come back in the response from the API but we need it for the UI to know which country the book is associated with
  };
};
