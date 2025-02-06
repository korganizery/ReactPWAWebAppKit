import { Button, Card, Form, Input, Image } from "antd-mobile";

import useHttpRequest from "../../../hooks/useHttpRequest";
import { useCallback } from "react";

const demoAvatarImages = [
  "https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
  "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9",
  "https://images.unsplash.com/photo-1542624937-8d1e9f53c1b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
  "https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
];

interface ApiResponse {
  email: string;
  password: string;
  username: string;
}

/*
  // 1、导入
  import useHttpRequest from '../../../hooks/useHttpRequest'; 
  // 2、使用
  const { post } = useHttpRequest();

  // 3、调用
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

export default function Register() {
  const { post } = useHttpRequest();
  const onFinish = useCallback(async (values: ApiResponse) => {
    // 用户注册:  {"email":"admin@gmail.com","password":"123456","username":"admin"}
    // console.log("用户注册: ", values);
    try {
      const postData: ApiResponse = await post<ApiResponse>(
        "/auth/register",
        values
      );
      console.log("POST 请求成功:", postData);
    } catch (err) {
      console.error("POST 请求失败:", err);
    }
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <Card
        title={
          <div
            style={{
              fontWeight: "normal",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 32,
            }}
          >
            <Image
              src={demoAvatarImages[3]}
              style={{ borderRadius: 20 }}
              fit="cover"
              width={48}
              height={48}
            />
            <h3>Create your free account</h3>
          </div>
        }
        headerStyle={{
          fontWeight: "normal",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        style={{ borderRadius: "16px", marginBottom: 25 }}
      >
        <div>
          <Form
            requiredMarkStyle="asterisk"
            name="form"
            onFinish={onFinish}
            footer={
              <Button
                block
                color="success"
                type="submit"
                size="middle"
                style={{ width: "100%" }}
              >
                <span>Continue</span>
                <svg
                  aria-hidden="true"
                  height="16"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  data-view-component="true"
                  className="octicon octicon-chevron-right"
                >
                  <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z"></path>
                </svg>
              </Button>
            }
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true },
                { type: "string", min: 6 },
                { type: "email", warningOnly: true },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input type={"password"} placeholder="Password" />
            </Form.Item>
            <p>
              Password should be at least 15 characters OR at least 8 characters
              including a number and a lowercase letter.
            </p>
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <p>
              Username may only contain alphanumeric characters or single
              hyphens, and cannot begin or end with a hyphen.
            </p>
          </Form>
        </div>
        <div onClick={(e) => e.stopPropagation()}></div>
      </Card>
    </div>
  );
}
