import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangeStatusOrder, deleteOrder, getOrders } from "../../state/admin/order/Action";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Avatar, Button, Card, CardHeader, AvatarGroup, } from "@mui/material"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const OrdersTable = () => {

    const dispatch = useDispatch()
    const { adminOrder }  = useSelector(store => store.adminOrder)
    const { deleted } = useSelector(store => store.deleted)
    const { status } = useSelector(store => store.status)


    console.log("adminOrder: ", adminOrder);

    useEffect(() => {
        dispatch(getOrders())
    }, [status, deleted])


    const handleStatusOrder = (orderId, status) => {
        dispatch(ChangeStatusOrder(orderId, status))
        handleClose()
    }

    const handleDeleteOrder = (orderId) => {
        dispatch(deleteOrder(orderId))
    }

    const [anchorEl, setAnchorEl] = React.useState([]);

    const handleClick = (event, index) => {
        const newAnchorElArray = [...anchorEl]
        newAnchorElArray[index] = event.currentTarget
        setAnchorEl(newAnchorElArray);
    };
    const handleClose = (index) => {
        const newAnchorElArray = [...anchorEl]
        newAnchorElArray[index] = null
        setAnchorEl(newAnchorElArray);
    };

    return (
        <div className="p-10">
            <Card className="mt-2 bg-[#1b1b1b]">
                <CardHeader title="All Products"/>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Id</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Update</TableCell>
                            <TableCell align="left">Delete</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {adminOrder?.map((item, index) => (
                            <TableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" className="">
                                    <AvatarGroup max={3} sx={{justifyContent: "start"}}>
                                        { item.orderItem.map((orderItem) => 
                                            <Avatar key={orderItem.id} src={orderItem.product.imageUrl} />
                                        )}
                                    </AvatarGroup>
                                </TableCell>
                                <TableCell align="left" scope="row">
                                    { item.orderItem.map((orderItem) => 
                                        <p key={orderItem.id}>
                                            {orderItem.product.title}
                                        </p>
                                    )}
                                </TableCell>
                                <TableCell align="left">{item.id}</TableCell>
                                <TableCell align="left">{item.totalPrice}</TableCell>
                                <TableCell align="left">
                                    <span 
                                        className={`
                                            text-white 
                                            px-5 py-2 
                                            rounded-full
                                            ${
                                                item.orderStatus === "CONFIRMED" ? "bg-[#369236]" :
                                                item.orderStatus === "SHIPPED" ? "bg-[#4141ff]" :
                                                item.orderStatus === "PLACED" ? "bg-[#02B290]" :
                                                item.orderStatus === "PENDING" ? "bg-[gray]" : "bg-[#025720]"
                                            }
                                        `}>
                                        {item.orderStatus}
                                    </span>
                                </TableCell>
                                <TableCell align="left">
                                <Button
                                    id="basic-button"
                                    aria-controls={`basic-menu-${item.id}`}
                                    aria-haspopup="true"
                                    aria-expanded={Boolean(anchorEl[index])}
                                    onClick={(event) => handleClick(event, index)}
                                >
                                    Status
                                </Button>
                                <Menu
                                    id={`basic-menu-${item.id}`}
                                    anchorEl={anchorEl[index]}
                                    open={Boolean(anchorEl[index])}
                                    onClose={() => handleClose(index)}
                                    MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={() => handleStatusOrder(item.id, "PLACED")}>
                                        Placed Order
                                    </MenuItem>
                                    <MenuItem onClick={() => handleStatusOrder(item.id, "CONFIRMED")}>
                                        Confirmed Order
                                    </MenuItem>
                                    <MenuItem onClick={() => handleStatusOrder(item.id, "SHIPPED")}>
                                        Shipped Order
                                    </MenuItem>
                                    <MenuItem onClick={() => handleStatusOrder(item.id, "DELIVERED")}>
                                        Delivered Order
                                    </MenuItem>
                                </Menu>
                                </TableCell>
                                <TableCell align="left">
                                    <Button 
                                        variant="outlined"
                                        onClick={() => handleDeleteOrder(item.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    )
}

export default OrdersTable