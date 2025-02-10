import { Button, Card, Form, Input, Image, Modal } from "antd-mobile";
import { useCallback } from "react";
import { useNavigate, NavLink } from "react-router";
import { login } from "../../../services/user";

const demoAvatarImages = [
  "https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
  "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9",
  "https://images.unsplash.com/photo-1542624937-8d1e9f53c1b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
  "https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
];
interface ApiResponse {
  username: string;
  password: string;
  message: string;
  userInfo: {
    [key in string]: string
  }
}

export default function SignUp() {
  const navigate = useNavigate();
  const onFinish = useCallback( async (values: ApiResponse) => {
    // 用户注册:  {"email":"admin@gmail.com","password":"123456","username":"admin"}
    const res  = await login(values);
    console.log("res:", res.message);
   
    Modal.alert({
      content: res.message,
      onConfirm: () => {
        navigate("/");
      },
    })
  }, []);
  return (
    <div style={{ padding: 30, maxWidth: 420 }}>
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
            <h3>Sign in to GitHub</h3>
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
                Sign in
              </Button>
            }
          >
            <Form.Item
              name="username"
              label="Username or email address"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>
            <Form.Item
              name="password"
              label={
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>Password</span>
                  <a href="#">Forgot password?</a>
                </div>
              }
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入密码" />
            </Form.Item>
          </Form>
        </div>
      </Card>
      <Card
        bodyStyle={{
          fontWeight: "normal",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span>
          <NavLink to="/user/signup">Sign in with a passkey</NavLink>
        </span>
        <p>
          <span>New to GitHub?</span>
          <NavLink to="/user/register">Create an account</NavLink>
        </p>
      </Card>
    </div>
  );
}
