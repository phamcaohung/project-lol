import React, { useEffect } from "react";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Card, CardHeader, } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, findProducts } from '../../state/product/Action'

const ProductsTableView = () => {

    const dispatch = useDispatch()
    const { products } = useSelector(store => store)


    useEffect(() => {
        const data = {
            category: "skin",
            tier: [],
            minPrice: 0,
            maxPrice: 9999,
            minDiscount: 0,
            sort: "price_low",
            pageNumber: 0,
            pageSize: 10,
            stock: ""
        }
    
        dispatch(findProducts(data))
    }, [products.deletedProduct])

    return (
        <div className="p-5">
            <Card className="mt-2 bg-[#1b1b1b]">
                <CardHeader title="Recent Products"/>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className="gap-0">
                                <TableCell className="w-auto">Image</TableCell>
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="left">Category</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {products?.products?.content?.slice(0,5).map((items) => (
                            <TableRow
                                key={items.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">
                                    <img 
                                        src={items.color.find((item) => item.name === "Default").image}
                                        className="max-w-[100px] h-auto"
                                    />
                                </TableCell>
                                <TableCell align="left" scope="row">
                                    {items.title}
                                </TableCell>
                                <TableCell align="left">{items.series}</TableCell>
                                <TableCell align="left">{items.discountedPrice}</TableCell>
                                <TableCell align="left">{items.quantity}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    )
}

export default ProductsTableView