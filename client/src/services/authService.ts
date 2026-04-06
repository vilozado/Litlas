import { getCSRFToken } from "../utils/fetchUtils";

const base_url = "http://localhost:3000";
const auth_url = `${base_url}/auth`;

const authFetch = async (url: string, user: object) => {
  const csrfToken = await getCSRFToken();
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrfToken,
    },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error(`Request failed ${res.status}`);
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
  return authFetch(`${auth_url}/login`, user);
};

export const logout = async () => {
  const csrfToken = await getCSRFToken();
  const res = await fetch(`${auth_url}/logout`, {
    method: "POST",
    credentials: "include",
    headers: { "x-csrf-token": csrfToken },
  });
  if (!res.ok) throw new Error(`Logout failed: ${res.status}`);
  return res.json();
};
