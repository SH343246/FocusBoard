import.meta.env.VITE_API_BASE_URL

 export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  let accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const authHeaders = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };
  let res = await fetch(url, {
    ...options,
    headers: authHeaders,
  });
  if (res.status === 401 && refreshToken) {
     const refreshRes = await fetch(`/refresh`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });


    if (refreshRes.ok) {
      const data = await refreshRes.json();
      accessToken = data.access_token;
      localStorage.setItem("access_token", accessToken as string);
      res = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/login";
    }
  }
  return res;
}
