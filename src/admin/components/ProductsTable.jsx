import React, { useEffect, useState } from "react";
import { Table, Skeleton, Autocomplete, TableContainer, Pagination, TextField, TableHead, TableRow, TableCell, TableBody, Paper, Button, Card, CardHeader, } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, findProducts, getAllSeriesName } from '../../state/product/Action'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useLocation, useNavigate } from "react-router-dom";



const ProductsTable = () => {
    const [name, setName] = useState("")
    const [seriesName, setSeriesName] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const { products, loading } = useSelector(store => store.products)
    const { deletedProduct } = useSelector(store => store.deletedProduct)
    const { series } = useSelector(store => store.series)
    const decodedQueryString = decodeURIComponent(location.search)
    const searchParams = new URLSearchParams(decodedQueryString)
    const pageNumber = searchParams.get('page') || 1

    console.log("products: ", products);

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleDeleteProduct = (productId) => {
        dispatch(deleteProduct(productId))
    }

    const handlePaginationChange = (event, value) => {
        const searchParams = new URLSearchParams(location.search)
        searchParams.set("page", value)
        const query = searchParams.toString()
        navigate({ search: `?${query}` })
    }

    const handleChangeSeriesName = (e, value) => {
        setSeriesName(value || "")
    }

    useEffect(() => {
        dispatch(getAllSeriesName())
    }, [dispatch])

    useEffect(() => {
        const data = {
            category: "skin",
            tier: [],
            minPrice: 0,
            maxPrice: 9999,
            minDiscount: 0,
            sort: "price_low",
            pageNumber: pageNumber - 1,
            pageSize: 10,
            stock: "",
            name: name,
            series: seriesName
        }
        dispatch(findProducts(data))

    }, [deletedProduct, name, pageNumber, seriesName, dispatch])
    return (
        <div className="p-5">
            <Card className="mt-2 bg-[#1b1b1b]">
                <CardHeader className="text-center" title="All Products" />
                <div className="ml-56 flex items-center">
                    <TextField
                        id="standard-basic"
                        label="Title"
                        variant="outlined"
                        onChange={handleChangeName}
                        value={name}
                        sx={{
                            width: '18rem'
                        }}
                    />

                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={series}
                        renderInput={(params) => <TextField {...params} label="Name Series" />}
                        onChange={handleChangeSeriesName}
                        sx={{
                            width: '19rem',
                            marginLeft: '1rem'
                        }}
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
                                        {!loading ? (
                                            <img
                                                src={items.color.find((item) => item.name === "Default")?.image}
                                                className="max-w-[100px] h-auto"
                                                alt=""
                                            />
                                        ) : (
                                            <Skeleton variant="rectangular" height={80} />
                                        )}
                                    </TableCell>
                                    <TableCell align="left" scope="row">
                                        {!loading
                                            ? items.title
                                            : <Skeleton variant="text" height={40} />
                                        }
                                    </TableCell>
                                    <TableCell align="left">
                                        {!loading
                                            ? items.series
                                            : <Skeleton variant="text" height={40} />
                                        }
                                    </TableCell>
                                    <TableCell align="left">
                                        {!loading
                                            ? items.discountedPrice
                                            : <Skeleton variant="text" height={40} />
                                        }
                                    </TableCell>
                                    <TableCell align="left">
                                        {!loading
                                            ? items.quantity
                                            : <Skeleton variant="text" height={40} />
                                        }
                                    </TableCell>
                                    <TableCell align="left">
                                        {!loading
                                            ? <Button
                                                variant="contained"
                                                onClick={() => navigate(`/admin/product/edit/${items.id}`)}
                                                color="secondary"
                                                startIcon={<EditIcon />}
                                            >
                                                Edit
                                            </Button>

                                            : <Skeleton variant="text" height={60} />
                                        }
                                    </TableCell>
                                    <TableCell align="left">
                                        {!loading
                                            ? <Button
                                                variant="contained"
                                                onClick={() => handleDeleteProduct(items.id)}
                                                color="error"
                                                startIcon={<DeleteIcon />}
                                            >
                                                Delete
                                            </Button>

                                            : <Skeleton variant="text" height={60} />
                                        }
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