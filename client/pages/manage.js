
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context/index";
import { Menu, Layout, Button } from "antd";
import Link from "next/link";
import {
    UserSwitchOutlined,
} from "@ant-design/icons";
  

const AdminPage = () => {
      // context
        const {
            state: { user },
            dispatch,
        } = useContext(Context);
        // destructure components from Menu
        const { Item, SubMenu, ItemGroup } = Menu;

    return (
        <div>
            <h1>Admin Page</h1>
            {/* Add your admin page content here */}
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} style={{ display: 'block' }}>

            {user && user.role && user.role.includes("Admin") ? (
                    <>Already Admin</>
            ) : (
                <Menu.Item key="/admin/make-admin" icon={<UserSwitchOutlined />} >
                <Link href="/admin/make-admin">
                Become Admin
                </Link>
                </Menu.Item>
          )}
          </Menu>

        </div>
    );
};

export default AdminPage;