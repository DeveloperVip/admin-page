import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import AddCardIcon from '@mui/icons-material/AddCard';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CategoryIcon from '@mui/icons-material/Category';

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashbaord",
            icon: <AppstoreOutlined />,
            key: "/",
          },
          {
            label: "Inventory",
            key: "/inventory",
            icon: <ShopOutlined />,
          },
          {
            label: "Orders",
            key: "/orders",
            icon: <ShoppingCartOutlined />,
          },
          {
            label: "Customers",
            key: "/customers",
            icon: <UserOutlined />,
          },
          {
            label: "Sous_Categorie",
            key: "/Souscategories",
            icon: <CategoryIcon />,
          },
          {
            label: "Addproduct",
            key: "/Addproduct",
            icon: <AddCardIcon />,
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
