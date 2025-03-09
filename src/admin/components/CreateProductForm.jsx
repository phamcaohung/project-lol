import React, { Fragment, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createProduct, findProductsById, updateProduct } from '../../state/product/Action'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography, styled } from "@mui/material";
import { Listbox, Transition } from '@headlessui/react'
import CheckIcon from '@mui/icons-material/Check';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useParams } from "react-router-dom";
import utc from "dayjs/plugin/utc";
import CategoryForm from "./CategoryForm";



dayjs.extend(utc);



const initialColor = [
    { name: "Default", quantity: 1, color: "", image: null, inStock: true },
]

const initialTier = [
    {
        id: 1,
        name: "Ultimate",
        image: "https://www.skinexplorer.lol/_next/image?url=https%3A%2F%2Fraw.communitydragon.org%2Fpbe%2Fplugins%2Frcp-be-lol-game-data%2Fglobal%2Fdefault%2Fv1%2Frarity-gem-icons%2Fultimate.png&w=32&q=75"
    },
    {
        id: 2,
        name: "Mythic",
        image: "https://www.skinexplorer.lol/_next/image?url=https%3A%2F%2Fraw.communitydragon.org%2Fpbe%2Fplugins%2Frcp-be-lol-game-data%2Fglobal%2Fdefault%2Fv1%2Frarity-gem-icons%2Fmythic.png&w=32&q=75"
    },
    {
        id: 3,
        name: "Legendary",
        image: "https://www.skinexplorer.lol/_next/image?url=https%3A%2F%2Fraw.communitydragon.org%2Fpbe%2Fplugins%2Frcp-be-lol-game-data%2Fglobal%2Fdefault%2Fv1%2Frarity-gem-icons%2Flegendary.png&w=32&q=75"
    },
    {
        id: 4,
        name: "Epic",
        image: "https://www.skinexplorer.lol/_next/image?url=https%3A%2F%2Fraw.communitydragon.org%2Fpbe%2Fplugins%2Frcp-be-lol-game-data%2Fglobal%2Fdefault%2Fv1%2Frarity-gem-icons%2Fepic.png&w=32&q=75"
    },
    {
        id: 5,
        name: "None",
        image: ""
    }
]

const initialDifficulty = [
    { 
        id: 1,
        name: "LOW"
    },
    { 
        id: 1,
        name: "NORMAL"
    },
    { 
        id: 1,
        name: "HIGH"
    }
]



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const CreateProductForm = () => {
    const param = useParams()
    const dispatch = useDispatch()
    // const jwt = localStorage.getItem("jwt")
    const { product } = useSelector(store => store.product)

    console.log("product: ", product);
    

    const [imageFile, setImageFile] = useState(null)
    const [selected, setSelected] = useState(initialTier[4])
    const [selectedDiffculty, setSelectedDiffculty] = useState(initialDifficulty[0])
    const [productData, setProductData] = useState({
        title: "",
        skin: {
            tier: "",
            series: "",
            imageTier: ""
        },
        champion: {
            role: "",
            difficulty: "",
            region: ""
        },
        price: 0,
        discountPercent: 0,
        color: initialColor,
        releaseDate: "",
        trailerLink: "",
        inStore: false,
        canBeLooted: false,
        category: "",
        description: "",
    })
    const [colorForms, setColorForms] = useState(initialColor);
    
    useEffect(() => {
        console.log("create data");
        
        setProductData(prevData => ({
            ...prevData,
            title: "",
            skin: {
                tier: "",
                series: "",
                imageTier: ""
            },
            champion: {
                role: "",
                difficulty: "",
                region: ""
            },
            price: 0,
            discountPercent: 0,
            color: initialColor,
            releaseDate: "",
            trailerLink: "",
            inStore: false,
            canBeLooted: false,
            category: "",
            description: "",
        }))
        setColorForms(initialColor)

    }, [param.create, dispatch])

    useEffect(() => {
        console.log("update data");
        
        const data = {
            productId: param.productId
        }
        dispatch(findProductsById(data))
        
            
        setProductData((prevData) => ({
            ...prevData,
            title: product?.title,
            skin: product?.skin,
            champion: product?.champion,
            price: product?.price,
            discountPercent: product?.discountPercent,
            color: product?.color,
            releaseDate: product?.releaseDate,
            trailerLink: product?.trailerLink,
            inStore: product?.inStore,
            canBeLooted: product?.canBeLooted,
            category: product?.category.name,
            description: product?.description,
        }))
        setColorForms(product?.color)
        console.log("color: ", product?.color);
        
        console.log("data: ", productData);
    }, [product?.id, dispatch])

    const handleAddNewColor = () => {
        const newFormColor = {
            name: "",
            quantity: 1,
            color: "",
            image: ""
        }
        setColorForms([...colorForms, newFormColor]);
    };

    const handleDeleteColor = (index) => {
        const updateColors = [...colorForms]
        updateColors.splice(index, 1)
        setColorForms(updateColors)
    }


    const handleChange = (e) => {
        const { name, value } = e.target
        setProductData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setImageFile(file)
        console.log(file);
      };

    const handleSwitch = (e) => {
        const { name, checked } = e.target
        setProductData((prevData) => ({
            ...prevData,
            [name]: checked
        }))
    }

    const handleDate = (date) => {
        const formatDate = dayjs(date).format('YYYY-MM-DD')
        setProductData((prevData) => ({
            ...prevData,
            releaseDate: formatDate
        }))
    }

    const handleColorChange = (e, index) => {
        const { name, value } = e.target

        const updateColors = [...colorForms]
        updateColors[index][name] = value

        setProductData((prevData) => ({
            ...prevData,
            color: updateColors
        }))
    }

    const handleTierChange = (a) => {
        setSelected(a)
        setProductData((prevData) => ({
            ...prevData,
            tier: a.name,
            imageTier: a.image
        }))
    }

    const handleDiffcultyChange = (a) => {
        setSelectedDiffculty(a)
        setProductData((prevData) => ({
            ...prevData,
            difficulty: a.difficulty,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const updateProductData = {
            ...productData,
            tier: selected.name,
            imageTier: selected.image
        }

        const formData = new FormData()
        // formData.append('product', updateProductData)
        formData.append('product', new Blob(
            [JSON.stringify(updateProductData)], { 
                type: "application/json" 
            })
        )


        if(imageFile == null) {
            const image = new File([product?.imageUpload], product?.imageUpload?.name)
            setImageFile(image)
        }
        console.log("imageFile", imageFile);
        
        formData.append('imageFile', imageFile)


        console.log([...formData.entries()]);
        
        
        param.productId
            ? dispatch(updateProduct(param.productId, formData))
            : dispatch(createProduct(formData))
        console.log(updateProductData);
        
        // param.productId 
        //     ? console.log("productDataUpdate: ", updateProductData)
        //     : console.log("productDataCreate: ", formData)
    }


    const compareByName = (a, b) => {
        if (a.name === "Default")
            return -1; // Đặt "Default" đầu tiên
        else if (b.name === "Default")
            return 1; // Đặt "Default" đầu tiên
        else
            return a.name.localeCompare(b.name); // Sắp xếp theo thứ tự bảng chữ cái  
    };

    const VisuallyHiddenInput = styled('input')({
        height: 1,
        overflow: 'hidden',
        width: 1,
    });
    
    console.log("productData: ", productData);
    console.log(product?.imageUpload?.url);
    console.log("colorForms: ", colorForms);
    
    

    return (
        <div className='p-10'>
            <Typography
                variant="h3"
                sx={{
                    textAlign: "center"
                }}
                className="py-10 text-center"
            >
                {param.productId ? `Edit Product Id ${param.productId}` : `Add New Product`}
            </Typography>
                                    

            <form
                onSubmit={handleSubmit}
                className="min-h-screen"
                
            >
                <Grid container spacing={2}>
                    {
                        product?.imageUpload?.url && product?.imageUpload?.name !== "undefined" ? (
                            <Grid item xs={4}>
                                <img
                                    className="w-full h-full"
                                    src={product?.imageUpload?.url}
                                    alt=""
                                />
                            </Grid>
                        ) : (
                            imageFile ? (
                                <Grid item xs={4}>
                                    <img
                                        className="w-full h-full"
                                        src={URL.createObjectURL(imageFile) || ""}
                                        alt=""
                                    />
                                </Grid>
                            ) : (
                                <Grid item xs={4}>
                                    <img
                                        className="w-full h-full"
                                        src=""
                                        alt=""
                                    />
                                </Grid>
                            )  
                        )
                    }
                    
                    <Grid item xs={8} className="flex items-center">
                        <Button
                            component="label"
                            variant="contained"
                            onChange={handleFileChange}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload Image file
                            <VisuallyHiddenInput type="file" />
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={productData.title}
                            onChange={handleChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                name="category"
                                value={productData.category}
                                onChange={handleChange}
                                label="Category"
                                required
                            >
                                <MenuItem value="skin">Skin</MenuItem>
                                <MenuItem value="champion">Champion</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} marginBottom={2}>
                        <CategoryForm 
                            productId={param.productId}
                            handleTierChange={handleTierChange}
                            setSelected={setSelected}
                            selected={selected}
                            productData={productData}
                            initialTier={initialTier}
                            handleChange={handleChange}
                            Fragment={Fragment}
                            classNames={classNames}
                            initialDifficulty={initialDifficulty}
                            handleDiffcultyChange={handleDiffcultyChange}
                            setSelectedDiffculty={setSelectedDiffculty}
                            selectedDiffculty={selectedDiffculty}
                        />
                    </Grid>
                    
                    
                    {/* <Grid item xs={12} sm={6}>
                        Tier:
                        <Listbox value={selected} onChange={param.productId ? handleTierChange : setSelected} className="h-full">
                            {({ open }) => (
                                <>
                                    <div className="relative h-full">
                                        <Listbox.Button className="h-14 relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                            {param.productId ? (
                                                <>
                                                    <span className="flex items-center">
                                                        {productData?.skin?.imageTier !== "" &&
                                                            <img
                                                                src={productData?.skin?.imageTier}
                                                                alt=""
                                                                className="h-[2rem] w-[2rem]"
                                                            />
                                                        }
                                                        <span className={`${productData?.skin?.imageTier === "" ? 'ml-14' : ''} ml-3 block truncate font-bold`}>
                                                            {productData?.skin?.tier}
                                                        </span>
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="flex items-center">
                                                        {selected.image !== "" &&
                                                            <img
                                                                src={selected.image}
                                                                alt=""
                                                                className="h-[2rem] w-[2rem]"
                                                            />
                                                        }
                                                        <span className={`${selected.image === "" ? 'ml-14' : ''} ml-3 block truncate font-bold`}>
                                                            {selected.name}
                                                        </span>
                                                    </span>
                                                </>
                                            )}

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
                                                {initialTier.map((person) => (
                                                    <Listbox.Option
                                                        key={person.id}
                                                        className={({ active }) =>
                                                            classNames(
                                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                                            )
                                                        }
                                                        value={person}
                                                    >
                                                        {({ selected, active }) => (
                                                            <>
                                                                <div className="flex items-center">
                                                                    {person.image !== "" ? (
                                                                        <img src={person.image} alt="" className="h-[2rem] w-[2rem]" />
                                                                    ) : (
                                                                        <div className="h-[2rem] w-[2rem]"></div>
                                                                    )}

                                                                    <span
                                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                    >
                                                                        {person.name}
                                                                    </span>
                                                                </div>

                                                                {selected ? (
                                                                    <span
                                                                        className={classNames(
                                                                            active ? 'text-white' : 'text-indigo-600',
                                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                        )}
                                                                    >
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                ) : null}
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

                    <Grid item xs={12} sm={6} marginTop={3}>
                        <TextField
                            fullWidth
                            label="Series"
                            name="series"
                            value={productData?.skin?.series}
                            onChange={handleChange}
                            required
                        />
                    </Grid> */}

                    <Grid item xs={12} sm={2} marginTop={1}>
                        In Store:
                        <Switch
                            onChange={handleSwitch}
                            name="inStore"
                            checked={productData.inStore}
                        />
                    </Grid>

                    <Grid item xs={12} sm={2} marginTop={1}>
                        Can Be Looted:
                        <Switch
                            onChange={handleSwitch}
                            name="canBeLooted"
                            checked={productData.canBeLooted}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={dayjs.utc(productData.releaseDate)}
                                onChange={handleDate}
                                name="releaseDate"
                                label="Release Date"
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} sm={5}>
                        <TextField
                            fullWidth
                            label="Trailer Link"
                            name="trailerLink"
                            value={productData.trailerLink}
                            onChange={handleChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            value={productData.price}
                            onChange={handleChange}
                            type="number"
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Discounted Percent"
                            name="discountPercent"
                            value={productData.discountPercent}
                            onChange={handleChange}
                            type="number"
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            multiline
                            label="Desciption"
                            name="description"
                            value={productData.description}
                            onChange={handleChange}
                            rows={3}
                        />
                    </Grid>

                    {colorForms?.sort(compareByName).map((item, index) => (
                        <Grid container item spacing={2} key={index}>
                            <Grid item xs={12} sm={2}>
                                {item.image !== "" ? (
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="w-full h-full bg-[#111827]"
                                    />
                                ) : (
                                    <div></div>
                                )}
                            </Grid>

                            <Grid item xs={12} sm={3} className="flex justify-center items-center">
                                <TextField
                                    label="Image"
                                    name="image"
                                    value={item.image}
                                    onChange={(event) => handleColorChange(event, index)}
                                    required
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={1} className="flex justify-center items-center">
                                <div
                                    style={{ backgroundColor: `${item.color}` }}
                                    className="w-6 h-6 rounded-xl border-2 border-gray-800"
                                >
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={1} className="flex justify-center items-center">
                                <TextField
                                    label="Color"
                                    name="color"
                                    value={item.color}
                                    onChange={(event) => handleColorChange(event, index)}
                                    fullWidth
                                    required
                                    disabled={item.name === "Default"}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} className="flex justify-center items-center">
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={item.name}
                                    onChange={(event) => handleColorChange(event, index)}
                                    required
                                    fullWidth
                                    disabled={item.name === "Default"}
                                />
                            </Grid>

                            <Grid item xs={12} sm={1} className="flex justify-center items-center">
                                <TextField
                                    label="Quantity"
                                    name="quantity"
                                    type="number"
                                    value={item.quantity}
                                    onChange={(event) => handleColorChange(event, index)}
                                    required
                                    fullWidth
                                />
                            </Grid>

                            {item.name !== "Default" &&
                                <Grid item xs={12} sm={1} className="flex justify-center items-center">
                                    {/* <DeleteForeverIcon
                                        sx={{
                                            width: "3rem",
                                            height: "3rem",
                                            textAlign: "center"
                                        }}
                                        onClick={() => handleDeleteColor(index)}
                                    /> */}
                                    <Button
                                        variant="contained"
                                        sx={{ p: 1.8 }}
                                        size="medium"
                                        color="error"
                                        onClick={() => handleDeleteColor(index)}
                                    >
                                        <DeleteForeverIcon
                                            sx={{
                                                width: "3rem",
                                                height: "3rem",
                                                textAlign: "center"
                                            }}
                                        />
                                    </Button>
                                </Grid>
                            }
                        </Grid>
                    ))}
                    <Grid item xs={12} className="flex justify-center">
                        <Button
                            variant="contained"
                            sx={{ p: 1.8 }}
                            className="py-20"
                            size="medium"
                            color="success"
                            onClick={handleAddNewColor}
                        >
                            Add New Color
                        </Button>
                    </Grid>

                    <Grid item xs={12} className="flex justify-center">
                        <Button
                            variant="contained"
                            sx={{ p: 2, marginTop: "20px" }}
                            className="py-20 w-[30rem]"
                            size="large"
                            type="submit"
                        >
                            {param.productId ? `Update Product Id ${param.productId}` : `Add New Product`}
                        </Button>
                    </Grid>
                </Grid>


            </form>
        </div>
    )
}

export default CreateProductForm