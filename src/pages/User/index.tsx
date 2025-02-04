import { SafeArea } from "antd-mobile";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function User() {
  const navigate = useNavigate();
  const locationa = useLocation();
  return (
    <>
     
      <div style={{ background: "#ace0ff" }}>
        <SafeArea position="top" />
      </div>
      <div>
        <p>User</p>
        <Outlet />
      </div>
      <div style={{ background: "#ffcfac" }}>
        <SafeArea position="bottom" />
      </div>
    </>
  );
}
