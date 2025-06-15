import React, { useEffect, useState, Fragment } from "react";
import { Table, Skeleton, Pagination, TableHead, TableRow, TableCell, TableBody, Button, CardHeader, Grid, InputLabel, Select, MenuItem, createTheme } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, findProducts, getAllSeriesSkin } from '../../state/product/Action'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useLocation, useNavigate } from "react-router-dom";
import { Listbox, Transition } from "@headlessui/react";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { initialTier, initialRole, initialRegion, initialSort } from '../../refactor/FilterData.js'
import FilterByCategory from "./FilterByCategory.jsx";
import moment from "moment/moment";
import { CustomFormControl, CustomTextField } from "../../refactor/CustomStyle.jsx";



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ProductsTable = () => {
    const [selected, setSelected] = useState(true)
    const [page, setPage] = useState(1)
    const [selectedTier, setSelectedTier] = useState(initialTier[0])
    const [selectedRegion, setSelectedRegion] = useState(initialRegion[0])
    const [selectedRole, setSelectedRole] = useState(initialRole[0])
    const [selectedSort, setSelectedSort] = useState(initialSort[6])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const { products, loading } = useSelector(store => store.products)
    const { deletedProduct } = useSelector(store => store.deletedProduct)
    const { series } = useSelector(store => store.series)
    const decodedQueryString = decodeURIComponent(location.search)
    const searchParams = new URLSearchParams(decodedQueryString)
    const pageNumber = searchParams.get('page')


    const [dataSearch, setDataSearch] = useState({
        category: "skin",
        minPrice: 0,
        maxPrice: 9999,
        minDiscount: 0,
        sort: selectedSort.value,
        pageNumber: 0,
        pageSize: 10,
        stock: "",
        title: "",
        skin: {
            series: "",
            tier: ""
        },
        champion: {
            region: "",
            role: ""
        },
        chibi: {
            champion: "",
            tier: ""
        }
    })

    const handleDeleteProduct = (productId) => {
        dispatch(deleteProduct(productId))
    }

    const handlePaginationChange = (event, value) => {
        setDataSearch((prevData) => ({
            ...prevData,
            pageNumber: value - 1
        }))
        setPage(value)
        const searchParams = new URLSearchParams(location.search)
        searchParams.set("page", value)
        const query = searchParams.toString()
        navigate({ search: `?${query}` })
    }

    const handleChange = (value, type) => {
        console.log("value: ", value);
        console.log("type: ", type);

        if (type === 'category') {
            setSelected(false)
            setDataSearch((prevData) => ({
                ...prevData,
                skin: {
                    tier: "",
                    series: ""
                },
                champion: {
                    region: "",
                    role: ""
                },
                chibi: {
                    tier: "",
                    champion: ""
                }
            }))
        }
        if (type === 'sort') setSelectedSort(value)
        setDataSearch((prevData) => ({
            ...prevData,
            [type]: type === 'sort' ? value.value : value
        }))
    }


    const handleChangeByCategory = (value, type, category) => {
        console.log("value: ", value);
        console.log("type: ", type);

        const typeMapping = {
            tier: { tier: value ? value.name : '' },
            series: { series: value ? value : '' },
            champion: { champion: value ? value : '' },
            region: { region: value ? value.region : '' },
            role: { role: value ? value.role : '' }
        };

        if (type === 'tier') setSelectedTier(value)
        if (type === 'region') setSelectedRegion(value)
        if (type === 'role') setSelectedRole(value)

        setDataSearch((prevData) => ({
            ...prevData,
            [category]: {
                ...prevData[category],
                ...typeMapping[type]
            }
        }));
    }

    const clearOption = (type, category) => {
        setDataSearch((prevData) => ({
            ...prevData,
            [category]: {
                ...prevData[category],
                [type]: ""
            }
        }))
    }

    useEffect(() => {
        if (dataSearch.title || dataSearch.skin || dataSearch.chibi || dataSearch.champion) {
            searchParams.delete("page")
            window.history.replaceState(null, "", `?${searchParams.toString()}`)
            console.log("start delete");
            setDataSearch((prevData) => ({
                ...prevData,
                pageNumber: 0
            }))
            setPage(1)
        }
    }, [dataSearch.title, dataSearch.skin, dataSearch.chibi, dataSearch.champion, dispatch])


    useEffect(() => {
        if (dataSearch.category)
            dispatch(getAllSeriesSkin(dataSearch.category))
    }, [dispatch, dataSearch.category])

    useEffect(() => {
        console.log(dataSearch);
        const timer = setTimeout(() => {
            dispatch(findProducts(dataSearch))
        }, 100)
        return () => clearTimeout(timer)
    }, [deletedProduct, pageNumber, dataSearch, dispatch])


    const theme = createTheme({
        components: {
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        color: "white",
                    },
                },

            },
        },
    });


    return (
        <div className="p-5 mt-2">
            <CardHeader className="text-center text-white mb-5" title="All Products" />
            <Grid container>
                <Grid item xs={12} sm={3} className="flex justify-center">
                    <CustomFormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            name="category"
                            value={dataSearch.category}
                            onChange={(e) => handleChange(e.target.value, 'category')}
                            label="Category"
                            required
                        >
                            <MenuItem value="skin">Skin</MenuItem>
                            <MenuItem value="champion">Champion</MenuItem>
                            <MenuItem value="chibi">Chibi</MenuItem>
                        </Select>
                    </CustomFormControl>
                </Grid>

                <Grid item xs={12} sm={3} className="flex justify-center">
                    <CustomTextField
                        label="Title"
                        variant="outlined"
                        onChange={(e) => handleChange(e.target.value, 'title')}
                        value={dataSearch.title}
                        className="w-72"
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Listbox
                        value={selectedSort}
                        onChange={(value) => handleChange(value, 'sort')}
                        className="h-full"
                    >
                        {({ open }) => (
                            <>
                                <div className="relative h-full">
                                    <Listbox.Button
                                        className="h-14 relative w-full cursor-default rounded-md py-1.5 pl-2 
                                                text-left text-white border shadow-sm 
                                                sm:text-sm sm:leading-6"
                                    >
                                        <span className="ml-3 block truncate text-base">
                                            {selectedSort.name}
                                        </span>
                                        <span
                                            className='absolute inset-y-0 right-0 flex items-center pr-9'
                                        >
                                            {selectedSort.id % 2 === 0
                                                ? <ArrowUpwardIcon />
                                                : <ArrowDownwardIcon />
                                            }
                                        </span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                            <UnfoldMoreIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {initialSort.map((person) => (
                                                <Listbox.Option
                                                    key={person.id}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active && 'bg-[#111827] text-white',
                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                                        )
                                                    }
                                                    value={person}
                                                >
                                                    {({ active }) => (
                                                        <>
                                                            <span className='ml-3 block truncate text-base'>
                                                                {person.name}
                                                            </span>
                                                            <span
                                                                className={classNames(
                                                                    active && 'bg-[#111827] text-white',
                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                )}
                                                            >
                                                                {person.id % 2 === 0
                                                                    ? <ArrowUpwardIcon />
                                                                    : <ArrowDownwardIcon />
                                                                }
                                                            </span>
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>
                </Grid>
            </Grid>


            <FilterByCategory
                dataSearch={dataSearch}
                handleChangeByCategory={handleChangeByCategory}
                clearOption={clearOption}
                series={series}
                initialTier={initialTier}
                initialRole={initialRole}
                initialRegion={initialRegion}
                selectedTier={selectedTier}
                selectedRole={selectedRole}
                selectedRegion={selectedRegion}
            />

            <div className="mt-6" >
                <Table aria-label="simple table">
                    <TableHead 
                        sx={{'& .MuiTableCell-root': {
                                fontSize: '18px',
                                color: 'white',
                                fontWeight: "bold"
                            }
                        }}
                    >
                        <TableRow>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">
                                Title
                            </TableCell>
                            {dataSearch.category !== 'champion' ? (
                                <TableCell align="center">Series | Champion</TableCell>
                            ) : (
                                <>
                                    <TableCell align="center">Region</TableCell>
                                    <TableCell align="center">Role</TableCell>
                                </>
                            )}
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Release Date</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Edit</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody
                        sx={{'& .MuiTableCell-root': {
                                color: 'white'
                            }
                        }}
                    >
                        {products?.content?.map((items) => (
                            <TableRow
                                key={items.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className="gap-0"
                            >
                                <TableCell className="max-w-[80px]">
                                    {!loading ? (
                                        <>
                                            <img
                                                src={items.imageUrl}
                                                className="w-full h-full"
                                                alt=""
                                            />
                                            {items.imageTier &&
                                                <div className="flex justify-center">
                                                    <img
                                                        src={items.imageTier}
                                                        className="w-7 h-7 -mt-4"
                                                        alt=""
                                                    />
                                                </div>
                                            }
                                        </>
                                    ) : (
                                        <Skeleton variant="rectangular" height={80} />
                                    )}
                                </TableCell>
                                <TableCell align="center" scope="row">
                                    {!loading
                                        ? items.title
                                        : <Skeleton variant="text" height={40} />
                                    }
                                </TableCell>
                                {
                                    dataSearch.category !== 'champion' ? (
                                        <TableCell align="center">
                                            {!loading
                                                ? items.series
                                                : <Skeleton variant="text" height={40} />
                                            }
                                        </TableCell>
                                    ) : (
                                        <>
                                            <TableCell align="center">
                                                {!loading ? (
                                                    <>
                                                        {items.region}
                                                        <div className="w-full justify-center flex">
                                                            <img
                                                                className="w-12 h-12 mt-2"
                                                                src={items.imageRegion}
                                                                alt=""
                                                            />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <Skeleton variant="text" height={40} />
                                                )}
                                            </TableCell>
                                            <TableCell align="center">
                                                {!loading ? (
                                                    <>
                                                        {items.role}
                                                        <div className="w-full justify-center flex">
                                                            <img
                                                                className="w-12 h-12 mt-2"
                                                                src={items.imageRole}
                                                                alt=""
                                                            />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <Skeleton variant="text" height={40} />
                                                )}
                                            </TableCell>
                                        </>
                                    )
                                }
                                <TableCell align="center">
                                    {!loading
                                        ? items.discountedPrice
                                        : <Skeleton variant="text" height={40} />
                                    }
                                </TableCell>
                                <TableCell align="center">
                                    {!loading
                                        ? <>{moment(items.releaseDate).format("MMMM DD, YYYY")}</>
                                        : <Skeleton variant="text" height={40} />
                                    }
                                </TableCell>
                                <TableCell align="center">
                                    {!loading
                                        ? items.quantity
                                        : <Skeleton variant="text" height={40} />
                                    }
                                </TableCell>
                                <TableCell align="center">
                                    {!loading
                                        ? <Button
                                            variant="contained"
                                            onClick={() => navigate(`/admin/product/edit/${items.id}`)}
                                            sx={{
                                                bgcolor: "#2DCCFF",
                                                color: "black",
                                                borderRadius: "30px",
                                                fontSize: "1rem",
                                                fontWeight: "bold",
                                                ":hover": {
                                                    bgcolor: "#56F000"
                                                }
                                            }}
                                            startIcon={<EditIcon />}
                                        >
                                            Edit
                                        </Button>

                                        : <Skeleton variant="text" height={60} />
                                    }
                                </TableCell>
                                <TableCell align="center">
                                    {!loading
                                        ? <Button
                                            variant="contained"
                                            onClick={() => handleDeleteProduct(items.id)}
                                            sx={{
                                                bgcolor: "#FF3838",
                                                color: "black",
                                                borderRadius: "30px",
                                                fontSize: "1rem",
                                                fontWeight: "bold",
                                                ":hover": {
                                                    bgcolor: "#56F000"
                                                }
                                            }}
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
                        page={page}
                        color='error'
                        onChange={handlePaginationChange}
                        sx={{
                            '& .MuiPaginationItem-root': {
                                color: "white"
                            }
                        }}
                    />
                </div>
            </div>
        </div>

    )
}

export default ProductsTable