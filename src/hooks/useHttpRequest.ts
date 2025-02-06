import { useState, useEffect, useCallback } from "react";

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

const useHttpRequest = () => {
  const baseUrl: string = 'http://localhost:5000';
  const [token, setToken] = useState<string | null>(null);

  // 获取新的 token
  const refreshToken = useCallback(async () => {
    const response = await fetch(`${baseUrl}/refreshToken`, {
      method: "POST",
    });
    const data = await response.json();
    setToken(data.token);
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "tokenExpDate",
      new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    );
  }, [baseUrl]);

  // 检查 token 是否过期（假设 token 有效期为一天）
  const isTokenExpired = useCallback(() => {
    const tokenExpDate = new Date(localStorage.getItem("tokenExpDate")!);
    return Date.now() > tokenExpDate.getTime();
  }, []);

  // 发起请求
  const request = useCallback(
    async <T>(url: string, options: ExtendedRequestInit = {}): Promise<T> => {
      if (isTokenExpired()) {
        await refreshToken();
      }

      // 过滤无效字符
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
      const timeout = setTimeout(
        () => controller.abort(),
        options.timeout || 5000
      );
      options.signal = controller.signal;

      try {
        const response = await fetch(`${baseUrl}${url}`, {
          ...options,
          headers: filteredHeaders,
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
    },
    [baseUrl, token, isTokenExpired, refreshToken]
  );

  // GET 请求
  const get = useCallback(
    <T>(url: string, options: ExtendedRequestInit = {}): Promise<T> => {
      return request<T>(url, { method: "GET", ...options });
    },
    [request]
  );

  // POST 请求
  const post = useCallback(
    <T>(
      url: string,
      data: T,
      options: ExtendedRequestInit = {}
    ): Promise<T> => {
      return request<T>(url, {
        method: "POST",
        body: JSON.stringify(data),
        ...options,
      });
    },
    [request]
  );

  useEffect(() => {
    if (!token) {
      setToken(localStorage.getItem("token"));
    }
  }, [token]);

  return { get, post, refreshToken, isTokenExpired };
};

export default useHttpRequest;

// TODO: Help
/*
  // 1、import
  import useHttpRequest from '../../../hooks/useHttpRequest'; 
  // 2、Use
  const { post } = useHttpRequest();

  // 3、Start
  const onFinish = useCallback(async (values: ApiResponse) => {
    // 用户注册:  {"email":"admin@gmail.com","password":"123456","username":"admin"}
    // console.log("用户注册: ", values);
    try {
      const postData: ApiResponse = await post<ApiResponse>('/auth/register', values);
      console.log('POST 请求成功:', postData);
    } catch (err) {
      console.error('POST 请求失败:', err);
    }
  }, []);
*/
