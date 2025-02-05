import { Form, Input } from "antd-mobile";

export default function SignUp() {
  return (
    <>
      <Form requiredMarkStyle="asterisk">
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input placeholder="请输入密码" />
        </Form.Item>
      </Form>
    </>
  );
}
