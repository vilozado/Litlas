import type { SavedBook } from "../types/book";
import { getCSRFToken as fetchCSRFToken } from "../utils/fetchUtils";

const baseUrl = `${import.meta.env.VITE_API_URL}/dashboard`;

let csrfToken: string | null = null;

const getCSRFToken = async () => {
  if (csrfToken) return csrfToken;
  csrfToken = await fetchCSRFToken();
  return csrfToken;
};

const apiFetch = async (
  url: string,
  options: RequestInit,
  retry = true,
): Promise<Response> => {
  const token = await getCSRFToken();
  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      "x-csrf-token": token,
    },
  });

  if (res.status === 403 && retry) {
    csrfToken = null;
    return apiFetch(url, options, false);
  }

  return res;
};

export async function fetchSavedBooks(): Promise<SavedBook[]> {
  const res = await fetch(`${baseUrl}/reading-list`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Could not fetch books.");
  return res.json();
}

export async function fetchExploredSubjects(): Promise<string[]> {
  const res = await fetch(`${baseUrl}/explored`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Could not fetch explored subjects.");
  return res.json();
}

export async function postBook(book: SavedBook): Promise<SavedBook> {
  const res = await apiFetch(`${baseUrl}/reading-list`, {
    method: "POST",
    body: JSON.stringify(book),
  });
  if (res.status === 409) throw new Error("Book already in reading list.");
  if (!res.ok) throw new Error("Could not save book.");
  return res.json();
}

export async function changeStatus(
  id: string,
  status: string,
): Promise<SavedBook> {
  const res = await apiFetch(`${baseUrl}/reading-list/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Could not update book status.");
  return res.json();
}

export async function deleteBook(id: string): Promise<void> {
  const res = await apiFetch(`${baseUrl}/reading-list/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Could not delete book.");
}
