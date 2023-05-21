import { Layout } from "antd";
import React from "react";
import { useRouter } from "next/router";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const { Content } = Layout;

const LayoutComponent = (props) => {
  const { children } = props;
  const router = useRouter();
  if((router.pathname !=="/login")&& ( router.pathname !=="/signup") &&(router.pathname !=="/resetpassword")){
    return (
      <Layout className="App" theme="light">
        <Header />
        <Content className="App-content" style={{ height: "auto",paddingTop:"60px" }}>
          {children}
        </Content>
        <Footer />
      </Layout>
    );
  }
  else {
    return (
      <Layout className="App" theme="light">
        <Content className="App-content" style={{ height: "auto",paddingTop:"60px" }}>
          {children}
        </Content>
        <Footer />
      </Layout>
    );
  }
};

export default LayoutComponent;
