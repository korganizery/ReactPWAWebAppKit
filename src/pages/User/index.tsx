import { SafeArea } from "antd-mobile";
import { Outlet, useLocation, useNavigate } from "react-router";
// import ExampleApp from "../example";

export default function User() {
  const navigate = useNavigate();
  const locationa = useLocation();
  return (
    <>
     
      <div style={{ background: "#ace0ff" }}>
        <SafeArea position="top" />
      </div>
      <div>
         {/* <ExampleApp /> */}
        <Outlet />
      </div>
      <div style={{ background: "#ffcfac" }}>
        <SafeArea position="bottom" />
      </div>
    </>
  );
}
