import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context/index.js";
import { Menu, Layout, Button } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  LoginOutlined,
  UserAddOutlined,
  AppstoreOutlined,
  CarryOutOutlined,
  TeamOutlined,
  CoffeeOutlined,
  AudioOutlined,
  DesktopOutlined,
  FormOutlined,
  EditOutlined,
  ReadOutlined,
} from "@ant-design/icons";

// unlike react-router-dom dont destructure {Link}
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

// https://prawira.medium.com/react-conditional-import-conditional-css-import-110cc58e0da6

// import themes
// const LightTheme = React.lazy(() => import("../themes/LightTheme"));
// const DarkTheme = React.lazy(() => import("../themes/DarkTheme"));

const { Header } = Layout;


const TopNav = () => {
  const [current, setCurrent] = useState("");
  // context
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  // router
  const router = useRouter();
  // destructure components from Menu
  const { Item, SubMenu, ItemGroup } = Menu;

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  //create a parent component that will load the components conditionally using React.Suspense
  // const ThemeSelector = ({ children }) => {
  //   const CHOSEN_THEME = "DARK_MODE";
  //   return (
  //     <>
  //       <React.Suspense fallback={<></>}>
  //         <DarkTheme />
  //         {/* {CHOSEN_THEME === TYPE_OF_THEME.LIGHT_MODE && <LightTheme />}
  //         {CHOSEN_THEME === TYPE_OF_THEME.DARK_MODE && <DarkTheme />} */}
  //       </React.Suspense>
  //       {children}
  //     </>
  //   );
  // };

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/logout");
      dispatch({ type: "LOGOUT" });
      window.localStorage.removeItem("user");
      if (data) {
        toast(data.message);
        router.push("/login");
      }
    } catch (err) {
      toast("Logout failed. Try again.");
    }
  };



  return (
    <>
      {/* <DarkTheme /> */}

      {/* <Menu style={{ display: 'block' }} mode="horizontal">
  <Menu.Item key='home'><Link href={'/'}>Home</Link></Menu.Item>
  <Menu.Item key='option1'><Link href={'/option1'}>Option 1</Link></Menu.Item>
  <Menu.Item key='notif' style={{ float: 'right' }}>
    <Link href={'/notif'}>Notifications</Link>
  </Menu.Item>
  <Menu.Item key='logout' style={{ float: 'right' }}>
    <Link href={'/notif'}>Logout</Link>
  </Menu.Item>
</Menu> */}

      <Layout className="layout">
        <Header >

        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} selectedKeys={[current]} style={{ display: 'block' }}>
        <Menu.Item onClick={(e) => setCurrent(e.key)}>
          <Link href="/">
          <div className="logo" style={{ color: 'white' }}>
            <img
                        src="/images/logo/medicine-symbol-logo.png"
                        alt="code continue logo"
                        height="40"
                        className="mb-1"
                      />
            </div>
            </Link>
          </Menu.Item>
          <Menu.Item key="/" icon={<HomeOutlined />} onClick={(e) => setCurrent(e.key)}><Link href="/">
            Home
            </Link>
          </Menu.Item>
          <Menu.Item key="/articles" icon={<ReadOutlined />} > <Link href="/articles">Articles</Link></Menu.Item>

          {user && user.role && user.role.includes("Author") ? (
            <></>
          ) : (
            <Menu.Item key="/user/become-author" icon={<FormOutlined />} >
              <Link href="/user/become-author">Become Author</Link>
            </Menu.Item>
          )}

          {user &&
          user.role &&
          user.stripe_seller &&
          user.role.includes("Instructor") &&
          user.stripe_seller.charges_enabled ? (
            <></>
          ) : (
            <Menu.Item key="/user/become-instructor" icon={<TeamOutlined />} >
              <Link href="/user/become-instructor">
              Become Instructor
              </Link>
            </Menu.Item>
          )}


          {user === null && (
                  <>
            <Menu.Item
              icon={<UserAddOutlined />}
              key="/register"
              style={{ float: 'right' }}
            >
              <Link href="/register">
              Register
              </Link>
            </Menu.Item>

            <Menu.Item icon={<LoginOutlined />} key="/login" style={{ float: 'right' }}>
              <Link href="/login">
                Login
                </Link>
            </Menu.Item>
          </>
        )}       

        {user !== null && (
          <Menu.SubMenu
            icon={<CoffeeOutlined />}
            title={user && user.name}
            style={{ float: 'right' }}
          >
            <ItemGroup>
              <Item key="/user">
                <Link href="/user">
                  Dashboard
                </Link>
              </Item>
              <Item onClick={logout}>Logout</Item>
            </ItemGroup>
          </Menu.SubMenu>
        )}

        {user && user.role && user.role.includes("Instructor") && (
          <Menu.Item
            key="/instructor"
            onClick={(e) => setCurrent(e.key)}
            icon={<TeamOutlined />}
            style={{ float: 'right' }}
          >
            <Link href="/instructor">
              Instructor
            </Link>
          </Menu.Item>
        )}
      </Menu>
    </Header>

  </Layout>

    </>
  );
};

export default TopNav;
