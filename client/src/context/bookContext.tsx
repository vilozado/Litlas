import React, { createContext, useState, useEffect } from "react";

import type { Book, BookStatus, SavedBook } from "../types/book";
import { fetchBooks } from "../services/fetchBooks";
import { fetchSavedBooks, fetchExploredSubjects } from "../services/savedBooksService";
import { useAuth } from "./authContext";

interface BookContextType {
  selectedBooks: Book[];
  selectedCountry: string | null;
  setBookByCountry: (country: string, subject: string) => Promise<void>;
  loadingApp: boolean;
  readingList: SavedBook[];
  exploredSubjects: Set<string>;
  addToReadingList: (book: SavedBook) => void;
  updateBookStatus: (id: string, status: BookStatus) => void;
  deleteSavedBook: (id: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const BookContext = createContext<BookContextType | null>(null);

export function BookProvider({ children }: { children: React.ReactNode }) {
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [readingList, setReadingList] = useState<SavedBook[]>([]);
  const [exploredSubjects, setExploredSubjects] = useState<Set<string>>(new Set());
  const [loadingApp, setLoadingApp] = useState<boolean>(true);
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      setReadingList([]);
      setExploredSubjects(new Set());
      setSelectedBooks([]);
      setSelectedCountry(null);
      setLoadingApp(false);
      return;
    }
    setLoadingApp(true);

    Promise.all([fetchSavedBooks(), fetchExploredSubjects()])
      .then(([books, explored]) => {
        setReadingList(books);
        // Merge DB-persisted explored subjects with subjects of currently "read" books.
        // This covers existing users whose exploredSubjects field starts empty.
        const fromBooks = books
          .filter((b) => b.status === "read")
          .map((b) => b.subject);
        setExploredSubjects(new Set([...explored, ...fromBooks]));
      })
      .catch((err) => {
        console.error(err);
        setReadingList([]);
        setExploredSubjects(new Set());
      })
      .finally(() => setLoadingApp(false));
  }, [isAuthenticated, isLoading]);

  const setBookByCountry = async (country: string, subject: string) => {
    //fetch books by country and subject, set selected country and books in state
    const books = await fetchBooks(subject);
    setSelectedCountry(country);
    setSelectedBooks(books);
  };

  const addToReadingList = (book: SavedBook) => {
    setReadingList((prev) => {
      if (prev.some((b) => b.id === book.id)) return prev;
      return [...prev, book];
    });
  };

  const updateBookStatus = (id: string, status: BookStatus) => {
    setReadingList((prev) => {
      if (status === "read") {
        const book = prev.find((b) => b.id === id);
        if (book) setExploredSubjects((s) => new Set([...s, book.subject]));
      }
      return prev.map((book) => (book.id === id ? { ...book, status } : book));
    });
  };

  const deleteSavedBook = (id: string) => {
    setReadingList((prev) => prev.filter((book) => book.id !== id));
  };

  return (
    <BookContext.Provider
      value={{
        selectedBooks,
        selectedCountry,
        readingList,
        exploredSubjects,
        loadingApp,
        setBookByCountry,
        addToReadingList,
        updateBookStatus,
        deleteSavedBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
