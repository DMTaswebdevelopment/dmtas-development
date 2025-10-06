export async function postFetch(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

// DC: created a function for saving the token to local storage
export function saveTokenToLocalStorage(token: string) {
  if (typeof window !== "undefined") {
    return localStorage.setItem("auth_token", token);
  }

  return null;
}

// JA: created a functionn for getting the token from local storage
export function getTokenFromLocalStorage() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token");
  }
  return null;
}


// JA: created a function for getting the token from local storage
export function destoryTokenFromLocalStorage() {
  if (typeof window !== "undefined") {
    return localStorage.removeItem("auth_token");
  }
  return null;
}
