import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, findProductsById, updateProduct } from '../../state/product/Action'
import { Button, Grid, InputLabel, MenuItem, Select, Switch, Typography, styled } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useParams } from "react-router-dom";
import utc from "dayjs/plugin/utc";
import CategoryForm from "./CategoryForm";
import { initialTier, initialDifficulty, initialRole, initialRegion, initialColor, initialSkill, categories } from '../../refactor/FilterData.js'
import { CustomDatePicker, CustomFormControl, CustomTextField } from "../../refactor/CustomStyle.jsx";



dayjs.extend(utc);



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const CreateProductForm = () => {
    const param = useParams()
    const dispatch = useDispatch()
    // const jwt = localStorage.getItem("jwt")
    const { product } = useSelector(store => store.product)

    const [imageFile, setImageFile] = useState(null)
    const [selectedTier, setSelectedTier] = useState(initialTier[4])
    const [selectedDifficulty, setSelectedDifficulty] = useState(initialDifficulty[0])
    const [selectedRole, setSelectedRole] = useState(initialRole[0])
    const [selectedRegion, setSelectedRegion] = useState(initialRegion[0])
    const [productData, setProductData] = useState({
        title: "",
        skin: {
            tier: "",
            series: "",
            imageTier: ""
        },
        champion: {
            role: "",
            imageRole: "",
            difficulty: "",
            region: "",
            imageRegion: "",
            skill: initialSkill
        },
        chibi: {
            tier: "",
            imageTier: "",
            champion: ""
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
    const [skillForm, setSkillForm] = useState(initialSkill)

    useEffect(() => {
        if (param.create === 'create') {
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
                    imageRole: "",
                    difficulty: "",
                    region: "",
                    imageRegion: "",
                    skill: initialSkill
                },
                chibi: {
                    tier: "",
                    imageTier: "",
                    champion: ""
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
            setImageFile(null)
        }
    }, [param.create, dispatch])

    useEffect(() => {
        if (param.productId) {
            const data = {
                productId: param.productId
            }
            dispatch(findProductsById(data))

            setProductData((prevData) => ({
                ...prevData,
                title: product?.title,
                skin: product?.skin,
                champion: product?.champion,
                chibi: product?.chibi,
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
            setSkillForm(product?.champion?.skill.length === 0 ? initialSkill : product?.champion?.skill)
        }
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

    const handleChangeByCategory = (value, type, category) => {
        const typeMapping = {
            tier: { tier: value.name, imageTier: value.image },
            series: { series: value },
            region: { region: value.name, imageRegion: value.image },
            role: { role: value.name, imageRole: value.image },
            difficulty: { difficulty: value.difficulty },
            champion: { champion: value }
        };

        if (type === 'tier') setSelectedTier(value)
        if (type === 'region') setSelectedRegion(value)
        if (type === 'role') setSelectedRole(value)
        if (type === 'difficulty') setSelectedDifficulty(value)


        setProductData((prevData) => ({
            ...prevData,
            [category]: {
                ...prevData[category],
                ...typeMapping[type]
            }
        }));
    }

    const handleSkillChampion = (e, index) => {
        const { name, value } = e.target
        const skill = [...skillForm]
        skill[index][name] = value
        setProductData((prevData) => ({
            ...prevData,
            champion: {
                ...prevData.champion,
                skill: skill
            }
        }))
    }

    const clearOption = (event, type, category) => {
        event.stopPropagation()
        setProductData((prevData) => ({
          ...prevData,
          [category]: {
            ...prevData[category],
            [type]: ""
          }
        }))
      }

    const handleSubmit = (e) => {
        e.preventDefault()

        const updateProductData = categories.reduce((data, cat) => ({
            ...data,
            [cat]: productData.category === cat ? productData[cat] : null
        }), { ...productData });

        const formData = new FormData()
        formData.append('product', new Blob(
            [JSON.stringify(updateProductData)], {
            type: "application/json"
        })
        )

        if (imageFile == null) {
            const image = new File([product?.imageUpload], product?.imageUpload?.name)
            setImageFile(image)
        }
        console.log("imageFile", imageFile);

        formData.append('imageFile', imageFile)


        param.productId
            ? dispatch(updateProduct(param.productId, formData))
            : dispatch(createProduct(formData))


        param.productId
            ? console.log("productDataUpdate: ", updateProductData)
            : console.log("productDataCreate: ", updateProductData)
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

    useEffect(() => {
        setSelectedTier(initialTier[4])
    }, [productData?.category])
    
    return (
        <div className='p-10'>
            <Typography
                variant="h3"
                sx={{
                    textAlign: "center"
                }}
                className="py-10 text-center text-white"
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
                            sx={{
                                bgcolor: "#2DCCFF",
                                color: "black",
                                fontWeight: "bold",
                                fontSize: "1rem",
                                ":hover": {
                                    bgcolor: "#56F000"
                                }
                            }}
                        >
                            Upload Image file
                            <VisuallyHiddenInput type="file" />
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={6} marginTop={5}>
                        <CustomTextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={productData.title}
                            onChange={handleChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} marginTop={5}>
                        <CustomFormControl fullWidth>
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
                                <MenuItem value="chibi">Chibi</MenuItem>
                            </Select>
                        </CustomFormControl>
                    </Grid>

                    <Grid item xs={12} marginBottom={2}>
                        <CategoryForm
                            productId={param.productId}
                            selectedTier={selectedTier}
                            productData={productData}
                            initialTier={initialTier}
                            classNames={classNames}
                            initialDifficulty={initialDifficulty}
                            selectedDifficulty={selectedDifficulty}
                            initialRegion={initialRegion}
                            initialRole={initialRole}
                            selectedRegion={selectedRegion}
                            selectedRole={selectedRole}
                            handleChangeByCategory={handleChangeByCategory}
                            handleSkillChampion={handleSkillChampion}
                            skillForm={skillForm}
                            clearOption={clearOption}
                        />
                    </Grid>

                    <Grid item xs={12} sm={2} marginTop={1} className="text-white">
                        In Store:
                        <Switch
                            onChange={handleSwitch}
                            name="inStore"
                            checked={productData.inStore}
                            color="error"
                        />
                    </Grid>

                    <Grid item xs={12} sm={2} marginTop={1} className="text-white">
                        Can Be Looted:
                        <Switch
                            onChange={handleSwitch}
                            name="canBeLooted"
                            checked={productData.canBeLooted}
                            color="error"
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <CustomDatePicker
                                value={dayjs.utc(productData.releaseDate)}
                                onChange={handleDate}
                                name="releaseDate"
                                label="Release Date"
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} sm={5}>
                        <CustomTextField
                            fullWidth
                            label="Trailer Link"
                            name="trailerLink"
                            value={productData.trailerLink}
                            onChange={handleChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <CustomTextField
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
                        <CustomTextField
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
                        <CustomTextField
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
                                <CustomTextField
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
                                    className="w-6 h-6 rounded-xl border-2 border-white"
                                >
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={1} className="flex justify-center items-center">
                                <CustomTextField
                                    label="Color"
                                    name="color"
                                    value={item.color}
                                    onChange={(event) => handleColorChange(event, index)}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={3} className="flex justify-center items-center">
                                <CustomTextField
                                    label="Name"
                                    name="name"
                                    value={item.name}
                                    onChange={(event) => handleColorChange(event, index)}
                                    required
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={1} className="flex justify-center items-center">
                                <CustomTextField
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
                            sx={{ 
                                p: "1rem",
                                borderRadius: "30px",
                                color: "black",
                                fontWeight: "bold",
                                ":hover": {
                                    bgcolor: "#56F000",
                                    color: "black",
                                    fontWeight: "bold"
                                }
                            }}
                            size="medium"
                            color="secondary"
                            onClick={handleAddNewColor}
                        >
                            Add New Color
                        </Button>
                    </Grid>

                    <Grid item xs={12} className="flex justify-center">
                        <Button
                            sx={{ 
                                py: "1.2rem",
                                px:  "2.7rem",
                                marginTop: "20px",
                                bgcolor: "#2DCCFF",
                                color: "black",
                                fontWeight: "bold",
                                borderRadius: "30px",
                                fontSize: "1.2rem",
                                ":hover": {
                                    bgcolor: "#56F000",
                                }
                            }}
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