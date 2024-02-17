import React, { useEffect, useState } from "react";
import { Table, TableContainer, Pagination, TextField, TableHead, TableRow, TableCell, TableBody, Paper, Button, Card, CardHeader, } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, findProducts } from '../../state/product/Action'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useLocation, useNavigate } from "react-router-dom";

const columns = [
    { field: 'image', headerName: 'Image', width: 70 },
    { field: 'firstName', headerName: 'Title', width: 130 },
    { field: 'lastName', headerName: 'Series', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
]

const ProductsTable = () => {
    const [name, setName] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const { products } = useSelector(store => store.products)
    const decodedQueryString = decodeURIComponent(location.search)
    const searchParams = new URLSearchParams(decodedQueryString)
    const pageNumber = searchParams.get('page') || 1

    // console.log("products: ", products);

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleDeleteProduct = (productId) => {
        dispatch(deleteProduct(productId))
    }

    const handlePaginationChange = (event,value) => {
        const searchParams = new URLSearchParams(location.search)
        searchParams.set("page", value)
        const query = searchParams.toString()
        navigate({search: `?${query}`})
    }

    useEffect(() => {
        const data = {
            category: "skin",
            tier: [],
            minPrice: 0,
            maxPrice: 9999,
            minDiscount: 0,
            sort: "price_low",
            pageNumber: pageNumber - 1,
            pageSize: 5,
            stock: "",
            name: name,
        }
        console.log("data: ", data);
    
        dispatch(findProducts(data))
    }, [products.deletedProduct, name, pageNumber])

    return (
        <div className="p-5">
            <Card className="mt-2 bg-[#1b1b1b]">
                <CardHeader className="text-center" title="All Products"/>
                <div className="ml-56">
                    <TextField 
                        id="standard-basic" 
                        label="Title" 
                        variant="standard" 
                        onChange={handleChangeName}
                        value={name}
                    />
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className="gap-0">
                                <TableCell className="w-auto">Image</TableCell>
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="left">Series</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Quantity</TableCell>
                                <TableCell align="left">Edit</TableCell>
                                <TableCell align="left">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {products?.content?.map((items) => (
                            <TableRow
                                key={items.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className="gap-0"
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
                                <TableCell align="left">
                                    <Button 
                                        variant="contained"
                                        onClick={() => navigate(`/admin/product/edit/${items.id}`)} 
                                        color="secondary"
                                        startIcon={<EditIcon/>}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell align="left">
                                    <Button 
                                        variant="contained"
                                        onClick={() => handleDeleteProduct(items.id)}
                                        color="error"
                                        startIcon={<DeleteIcon/>}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>

                    <div className='px-4 py-4 flex justify-center'>
                        <Pagination 
                          count={products?.totalPages} 
                          color='secondary'
                          onChange={handlePaginationChange}
                        />
                    </div>
                </TableContainer>
            </Card>
        </div>
        
    )
}

export default ProductsTable