import { getCSRFToken as fetchCSRFToken } from "../utils/fetchUtils";

const base_url = import.meta.env.VITE_API_URL;
const auth_url = `${base_url}/auth`;

let csrfToken: string | null = null;

const getCSRFToken = async () => {
  if (csrfToken) return csrfToken;

  csrfToken = await fetchCSRFToken();
  return csrfToken;
};

const authFetch = async (url: string, user: object, retry = true) => {
  const token = await getCSRFToken();

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": token,
    },
    body: JSON.stringify(user),
  });

  if (res.status === 403 && retry) {
    csrfToken = null;
    return authFetch(url, user, false);
  }

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.msg || `Request failed ${res.status}`);
  }

  return res.json();
};

export const signup = async (user: {
  name: string;
  email: string;
  password: string;
}) => {
  return authFetch(`${auth_url}/signup`, user);
};

export const login = async (user: { email: string; password: string }) => {
  const res = await authFetch(`${auth_url}/login`, user);
  csrfToken = null;
  await getCSRFToken();

  return res;
};

export const logout = async () => {
  const token = await getCSRFToken();

  const res = await fetch(`${auth_url}/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "x-csrf-token": token,
    },
  });

  if (!res.ok) {
    throw new Error(`Logout failed: ${res.status}`);
  }
  csrfToken = null;
  await getCSRFToken();
  return res.json();
};
