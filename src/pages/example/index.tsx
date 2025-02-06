// App.tsx
import React, { useEffect, useState, useCallback } from 'react';
import useHttpRequest from '../../hooks/useHttpRequest';

interface ApiResponse {
  key: string;  // 根据实际API的返回数据结构进行定义
}

const ExampleApp: React.FC = () => {
  const { get, post } = useHttpRequest('http://localhost:5000');
  const [getData, setGetData] = useState<ApiResponse | null>(null);
  const [postData, setPostData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  // const [fetched, setFetched] = useState<boolean>(false);

  const fetchApiData = useCallback(async () => {
    // if (fetched) return; // 防止重复请求
    // setFetched(true);

    localStorage.setItem('token', '初始 token');
    localStorage.setItem('tokenExpDate', new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());

    try {
      const data: ApiResponse = await get<ApiResponse>('/other/getresource');
      setGetData(data);
      console.log('GET 请求成功:', data);
    } catch (err) {
      setError((err as Error).message);
      console.error('GET 请求失败:', err);
    }

    try {
      const postData: ApiResponse = await post<ApiResponse>('/other/postresource', { key: 'value' });
      setPostData(postData);
      console.log('POST 请求成功:', postData);
    } catch (err) {
      setError((err as Error).message);
      console.error('POST 请求失败:', err);
    }
  }, []);

  return (
    <div>
      <p onClick={fetchApiData}>通用请求方法示例</p>
      {error && <p>请求失败: {error}</p>}
      {getData && <pre>GET 请求结果: {JSON.stringify(getData, null, 2)}</pre>}
      {postData && <pre>POST 请求结果: {JSON.stringify(postData, null, 2)}</pre>}
    </div>
  );
};

export default ExampleApp;
