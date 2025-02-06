import { post, setToken, setTokenExpDate, removeToken } from "../utils/httpRequest";

interface ApiResponse {
    username: string;
    password: string;
    message: string;
    userInfo: {
      [key in string]: string
    }
}


export const login = async (param: ApiResponse) => {
    try {
        const postData = await post<ApiResponse>(
          "/auth/login",
          param
        );
        console.log("POST 请求成功:", postData.userInfo);
        setToken(postData.userInfo.token as string);
        setTokenExpDate(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
        // navigate("/");
      } catch (err) {
        console.error("POST 请求失败:", err);
      }
}

export const logout = async () => {
    try {
        const postData = await post<void>(
          "/auth/logout",
        );
        console.log("POST 请求成功:", postData);
        removeToken();
        // navigate("/");
        console.log('用户已退出');
      } catch (err) {
        console.error('退出请求失败:', err);
      }
}