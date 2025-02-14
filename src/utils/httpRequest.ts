export const PUBLIC_URL_API = "http://localhost:5000";
export class HttpError extends Error {
  response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
  }
}

interface ExtendedRequestInit extends RequestInit {
  timeout?: number;
}

/**
 * Set Storage
 * @param key
 * @param data
 */
const setStorage = (key: string, data: string) => {
  localStorage.setItem(key, data);
};

/**
 * Get Storage
 * @param key
 * @returns
 */
const getStorage = (key: string) => {
  return localStorage.getItem(key);
};

const removeStorage = (key: string) => {
  localStorage.removeItem(key);
};

const deleteStorageAll = () => {
    localStorage.clear();
  };


/////////Token  Start//////////////////////////////////////////////////////
/**
 * Set Token
 * @param key
 * @param token
 */
const setToken = (token: string) => {
  setStorage("token", token);
};
/**
 * Set setTokenExpDate 过期时间
 * @param token
 */
const setTokenExpDate = (tokenExpDate: string) => {
  setStorage("tokenExpDate", tokenExpDate);
};

/**
 * Get Token
 * @param key
 * @param token
 */
const getToken = (key: string) => {
  return getStorage(key);
};

/**
 * clear Token
 * @param token
 */
const removeToken = () => {
    removeStorage("token");
    removeStorage("tokenExpDate");
};
/////////Token  Get//////////////////////////////////////////////////////

const refreshToken = async () => {
  const response = await fetch(`${PUBLIC_URL_API}/refreshToken`, {
    method: "POST",
  });
  const data = await response.json();
  // 设置 Token
  setToken(data.token);
  // 设置 setTokenExpDate 过期时间
  setTokenExpDate(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
};

const isTokenExpired = (): boolean => {
  const tokenExpDate = new Date(localStorage.getItem("tokenExpDate")!);
  return Date.now() > tokenExpDate.getTime();
};

const httpRequest = async <T>(
  method: "GET" | "POST",
  url: string,
  data?: T,
  options: ExtendedRequestInit = {}
): Promise<T> => {
  if (isTokenExpired()) {
    await refreshToken();
  }

  const token = localStorage.getItem("token");

  const filteredHeaders: HeadersInit = {};
  Object.entries({
    "Content-Type": "application/json",
    Authorization: token,
    ...options.headers,
  }).forEach(([key, value]) => {
    if (typeof value === "string") {
      filteredHeaders[key] = value
        .split("")
        .map((char) => (char.charCodeAt(0) <= 127 ? char : ""))
        .join("");
    }
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeout || 5000);
  options.signal = controller.signal;

  try {
    const response = await fetch(`${PUBLIC_URL_API}${url}`, {
      ...options,
      method,
      headers: filteredHeaders,
      body: method === "POST" ? JSON.stringify(data) : null,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new HttpError(response.statusText, response);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof HttpError) {
      console.error("HTTP 错误:", error.response);
    } else if (error instanceof Error && error.name === "AbortError") {
      console.error("请求超时");
    }
    throw error;
  }
};

const get = <T>(url: string, options: ExtendedRequestInit = {}): Promise<T> => {
  return httpRequest<T>("GET", url, undefined, options);
};

const post = <T>(
  url: string,
  data?: T,
  options: ExtendedRequestInit = {}
): Promise<T> => {
  return httpRequest<T>("POST", url, data, options);
};

export {
  get,
  post,
  setToken,
  getToken,
  setTokenExpDate,
  removeToken,
  setStorage,
  getStorage,
  deleteStorageAll,
};
