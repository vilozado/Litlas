export const getCSRFToken = async (): Promise<string> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/get-csrf-token`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch CSRF token");
  const data = await res.json();
  return data.csrfToken;
};
