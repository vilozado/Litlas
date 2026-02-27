import React, { createContext, useContext, useState } from "react";

import type { Book } from "../types/book";
import { fetchBooks } from "../utils/fetchBooks";

interface BookContextType {
  allBooks: Book[]
  selectedBooks: Book[]
  selectedCountry: string | null
  readingList: Book[]
  setBookByCountry: (country: string, subject: string) => void
  addToReadingList: (book: Book) => void
}

const BookContext = createContext<BookContextType | null>(null);

export function BookProvider({ children }: { children: React.ReactNode }) {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [readingList, setReadingList] = useState<Book[]>([]);

  const setBookByCountry = async (country: string, subject: string) => {
    const books = await fetchBooks(subject);
    setSelectedCountry(country);
    setSelectedBooks(books);
  }

  const addToReadingList = (book: Book) => {
    setReadingList(prev => {
      if (prev.some(b => b.id === book.id)) return prev;
      return [...prev, book];
    })
  }

  return (
    <BookContext.Provider value={{
      allBooks,
      selectedBooks,
      selectedCountry,
      readingList,
      setBookByCountry,
      addToReadingList
    }}>
      {children}
    </BookContext.Provider>
  )
}

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) throw new Error;
  return context;
}