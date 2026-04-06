// services/savedBooksService.ts
import type { SavedBook } from "../types/book";
import { getCSRFToken } from "../utils/fetchUtils";

const baseUrl = "http://localhost:3000/dashboard";

export async function fetchSavedBooks(): Promise<SavedBook[]> {
  const res = await fetch(`${baseUrl}/reading-list`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Could not fetch books.");
  return res.json();
}

export async function postBook(book: SavedBook): Promise<SavedBook> {
  const res = await fetch(`${baseUrl}/reading-list`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": await getCSRFToken(),
    },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Could not save book.");
  return res.json();
}

export async function changeStatus(
  id: string,
  status: string,
): Promise<SavedBook> {
  const res = await fetch(`${baseUrl}/reading-list/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": await getCSRFToken(),
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Could not update book status.");
  return res.json();
}

export async function deleteBook(id: string): Promise<void> {
  const res = await fetch(`${baseUrl}/reading-list/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "x-csrf-token": await getCSRFToken(),
    },
  });
  if (!res.ok) throw new Error("Could not delete book.");
}
