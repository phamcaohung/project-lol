import { Box, CssBaseline, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreateProductForm from "./CreateProductForm";
import ProductsTable from "./ProductsTable";
import OrdersTable from "./OrdersTable";
import AdminDashboard from "./Dashboard";



const menu = [
    { name: "Dashboard", path: "/admin", icon: <DashboardIcon color="error" fontSize="large"/>},
    { name: "Products", path: "/admin/products", icon: <DashboardIcon color="error" fontSize="large"/>},
    { name: "Customers", path: "/admin/customers", icon: <DashboardIcon color="error" fontSize="large"/>},
    { name: "Orders", path: "/admin/orders", icon: <DashboardIcon color="error" fontSize="large"/>},
    { name: "Create Product", path: "/admin/product/create", icon: <DashboardIcon color="error" fontSize="large"/>},
]

const Admin = () => {
    const navigate = useNavigate()

    const drawer = (
        <Box
            sx={{
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
            }}
        >
            <>
                <List>
                    {menu.map((item) => 
                        <ListItem 
                            key={item.name}
                            disablePadding
                            onClick={() => navigate(item.path)} 
                            className="text-white hover:bg-black"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>

                                <ListItemText>{item.name}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
            </>

            

            <List>
                <ListItem disablePadding className="text-white">
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleIcon color="error" fontSize="large"/>
                            
                        </ListItemIcon>
                        <ListItemText>Account</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )

    return (
        <div className="relative flex h-full bg-[#111827]">
            <CssBaseline/>

            <div className="w-[15%] border border-r-gray-400 border-t-0 border-l-0 h-full fixed top-0">
                {drawer}
            </div>

            <div className="w-[85%] h-full ml-[15%]">
                <Routes>
                    <Route path="/" element={<AdminDashboard/>}></Route>
                    <Route path="/product/:create/" element={<CreateProductForm/>}></Route>
                    <Route path="/product/edit/:productId" element={<CreateProductForm/>}></Route>
                    <Route path="/products" element={<ProductsTable/>}></Route>
                    <Route path="/orders" element={<OrdersTable/>}></Route>
                </Routes>
            </div>
        </div>
    )
}

export default Admin