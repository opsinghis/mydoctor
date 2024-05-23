import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/reset.css';
import "../public/css/styles.css";
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {Provider} from "../context/index";

import TopNav from "../components/nav/TopNav";
import Footer from "../components/nav/Footer";

import "../public/css/styles.css";
//import "../public/css/ant-dark.css";
import "nprogress/nprogress.css";
import Router from "next/router";
import NProgress from "nprogress";


Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <TopNav></TopNav>
      <ToastContainer position="top-center"/>
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;
