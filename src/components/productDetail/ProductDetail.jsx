import { useEffect, useRef, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { Box, Button, Grid, LinearProgress, Rating } from '@mui/material'
import ProductReviewCard from './ProductReviewCard'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findChampionProductsByRegion, findChibiProductsByChampion, findProductsById, findProductsBySeries, findSkinProductsBySeries } from '../../state/product/Action';
import { addItemToCart } from '../../state/cart/Action';
import moment from "moment/moment";
import YouTubeIcon from '@mui/icons-material/YouTube';
import ReactPlayer from 'react-player'
import BrushIcon from '@mui/icons-material/Brush';
import ProductSkill from './ProductSkill';
import ProductCategory from './ProductCategory';
import ProductCard from '../product/ProductCard';



const products = {
    name: 'Ekko True Damage',
    price: '$192',
    href: '#',
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetail() {
    const [selectedColor, setSelectedColor] = useState({
        name: "",
        image: "",
    })
    const [showYoutube, setShowYoutube] = useState(false)
    const checkRef = useRef(null)
    const navigate = useNavigate()
    const param = useParams()
    const dispatch = useDispatch()
    const { product } = useSelector(store => store.product)
    const location = useLocation();
    const series = location.state;
    const { productSeries } = useSelector(store => store.productSeries)
    const [mainImage, setMainImage] = useState("") 
    

    const compareByName = (a, b) => {
        if (a.name === "Default")
            return -1; // Đặt "Default" đầu tiên
        else if (b.name === "Default")
            return 1; // Đặt "Default" đầu tiên
        else
            return a.name.localeCompare(b.name); // Sắp xếp theo thứ tự bảng chữ cái  
    };

    const handleAddToCart = () => {
        const data = {
            productId: param.productId,
            color: selectedColor.name,
            imageColor: selectedColor.image,
            navigate
        }

        dispatch(addItemToCart(data))
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        const data = { productId: param.productId }
        dispatch(findProductsById(data))
    }, [param.productId, dispatch])


    useEffect(() => {
        switch (product?.category?.name) {
            case 'skin':
                if (product?.skin?.series && product?.skin?.series !== checkRef.current) {
                    const skin = {
                        id: param.productId,
                        series: product?.skin?.series
                    }
                    dispatch(findSkinProductsBySeries(skin))
                    checkRef.current = product?.skin?.series
                }
                break
            case 'champion':
                if (product?.champion?.region && product?.champion?.region !== checkRef.current) {
                    const champion = {
                        id: param.productId,
                        region: product?.champion?.region
                    }
                    dispatch(findChampionProductsByRegion(champion))
                    checkRef.current = product?.skin?.region
                }
            case 'chibi':
                if (product?.chibi?.champion && product?.chibi?.champion !== checkRef.current) {
                    const chibi = {
                        id: param.productId,
                        champion: product?.chibi?.champion
                    }
                    dispatch(findChibiProductsByChampion(chibi))
                    checkRef.current = product?.chibi?.champion
                }
            default:
                break;
        }
    }, [param.productId, series, product, dispatch])

    const handleColor = (e) => {
        setSelectedColor(e)
    }


    const handleYoutube = (e) => {
        e.preventDefault();
        setShowYoutube(!showYoutube);
    }

    useEffect(() => {
        if (product?.imageUpload?.url) {
            console.log("start add image: ", product?.imageUpload?.url);
            setMainImage(product?.imageUpload?.url)
        }
    }, [product])

    return (
        <div className="bg-[#111827] text-white pb-20">

            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">

                        <li className="text-sm">
                            <a href={products.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {product?.name}
                            </a>
                        </li>
                    </ol>
                </nav>


                <section className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10'>
                    {/* Image gallery */}
                    <div className="flex flex-col items-center w-[48rem] rounded-md mx-auto overflow-hidden">
                        <h1 className="font-bold text-3xl text-gray-100 mb-8">
                            {product?.title}
                        </h1>
                        <div
                            className={`overflow-hidden rounded-lg w-full
                                ${showYoutube ? 'flex justify-center' : ''}`}
                        >
                            {showYoutube ? (
                                <ReactPlayer
                                    url={product?.trailerLink}
                                    controls
                                    className="h-[100rem] w-full"
                                />
                            ) : (
                                <div className='flex justify-center bg-white/10'>
                                    <img
                                        src={mainImage}
                                        alt=""
                                    />
                                </div>
                            )}
                        </div>

                        <div className='bg-[#1F2937] w-full'>
                            <div className='p-8 pt-15 flex justify-center'>
                                <a
                                    onClick={handleYoutube}
                                    href=""
                                    className='rounded-sm bg-white font-bold text-lg text-gray-900 px-2.5 py-1.5'
                                >
                                    {showYoutube ? (
                                        <>
                                            Show Splash
                                            <BrushIcon color='primary' className='ml-2' />
                                        </>

                                    ) : (
                                        <>
                                            Show Spotlight
                                            <YouTubeIcon color='error' className='ml-2' />
                                        </>
                                    )}
                                </a>
                            </div>

                            <p className='p-8 pt-3 text-gray-300 text-base'>
                                {product?.description}
                            </p>
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="lg:col-span-1 max-auto max-w-1xl px-4 pb-16 sm:px-6 la:max-w-7xl lg:px-8 lg:pb-24 mt-20">
                        {product?.discountPercent === 0 ? (
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <h1 className='text-lg lg:text-xl text-gray-300'>
                                        Price :
                                    </h1>
                                </Grid>
                                <Grid item xs={8} className='flex items-center'>
                                    <h1 className='font-bold text-lg lg:text-xl text-gray-100'>
                                        {product?.price}
                                    </h1>
                                    <img
                                        className='w-[1.5rem] h-[1.5rem] ml-2'
                                        src="https://rankedkings.com/img/rp.png"
                                        alt=""
                                    />
                                </Grid>
                            </Grid>
                        ) : (
                            <>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <h1 className='text-lg lg:text-xl text-gray-300'>
                                            Price :
                                        </h1>
                                    </Grid>
                                    <Grid item xs={8} className='flex items-center'>
                                        <h1 className='font-bold text-lg lg:text-xl text-gray-100 opacity-50 line-through'>
                                            {product?.price}
                                        </h1>
                                        <img
                                            className='w-[1.5rem] h-[1.5rem] ml-2'
                                            src="https://rankedkings.com/img/rp.png"
                                            alt=""
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} className='pt-5'>
                                    <Grid item xs={4}>
                                        <h1 className='text-lg lg:text-xl text-gray-300'>
                                            Discounted Price :
                                        </h1>
                                    </Grid>
                                    <Grid item xs={8} className='flex items-center'>
                                        <h1 className='font-bold text-lg lg:text-xl text-gray-100'>
                                            {product?.discountedPrice}
                                        </h1>
                                        <img
                                            className='w-[1.5rem] h-[1.5rem] ml-2'
                                            src="https://rankedkings.com/img/rp.png"
                                            alt=""
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} className='pt-5'>
                                    <Grid item xs={4}>
                                        <h1 className='text-lg lg:text-xl text-gray-300'>
                                            Discount Percent :
                                        </h1>
                                    </Grid>
                                    <Grid item xs={8} className='flex items-center'>
                                        <h1 className='font-bold text-lg lg:text-xl text-green-600'>
                                            {product?.discountPercent}% Off
                                        </h1>
                                    </Grid>
                                </Grid>
                            </>
                        )}

                        <ProductCategory data={product} />

                        <Grid container spacing={2} className='pt-5'>
                            <Grid item xs={4}>
                                <h1 className='text-lg lg:text-xl text-gray-300'>
                                    Release Date :
                                </h1>
                            </Grid>
                            <Grid item xs={8} className='flex items-center'>
                                <h1 className='font-bold text-lg lg:text-xl text-gray-100'>
                                    {moment(product?.releaseDate).format("MMMM DD, YYYY")}
                                </h1>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} className='pt-5'>
                            <Grid item xs={4}>
                                <h1 className='text-lg lg:text-xl text-gray-300'>
                                    In Store :
                                </h1>
                            </Grid>
                            <Grid item xs={8} className='flex items-center'>
                                <div className={`font-medium px-5 py-1 rounded-full inline-block text-lg ${product?.inStore ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {product?.inStore ? "Yes" : "No"}
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} className='pt-5'>
                            <Grid item xs={4}>
                                <h1 className='text-lg lg:text-xl text-gray-300'>
                                    Can Be Looted :
                                </h1>
                            </Grid>
                            <Grid item xs={8} className='flex items-center'>
                                <div className={`font-medium px-5 py-1 rounded-full inline-block text-lg ${product?.canBeLooted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {product?.canBeLooted ? "Yes" : "No"}
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} className='pt-5'>
                            <Grid item xs={4}>
                                <h1 className='text-lg lg:text-xl text-gray-300'>
                                    Category :
                                </h1>
                            </Grid>
                            <Grid item xs={8} className='flex items-center'>
                                <h1 className='font-bold text-lg lg:text-xl text-gray-100'>
                                    {product?.category.name.toUpperCase()}
                                </h1>
                            </Grid>
                        </Grid>

                        {product?.category.name === "champion" && <ProductSkill skill={product?.champion.skill} />}

                        {/* Color */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <form className="mt-10">
                                <div className="mt-10 mb-10">
                                    <RadioGroup value={selectedColor} onChange={handleColor} className="mt-4">
                                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                            {product?.color.sort(compareByName).map((item) => (
                                                <RadioGroup.Option
                                                    key={item.name}
                                                    value={item}
                                                    disabled={!item.inStock}
                                                    className={({ active }) =>
                                                        classNames(
                                                            item.inStock
                                                                ? 'cursor-pointer text-gray-900 shadow-sm'
                                                                : 'cursor-not-allowed text-gray-200',
                                                            active ? 'ring-2 ring-indigo-500' : '',
                                                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-white/10 focus:outline-none sm:flex-1 sm:py-6'
                                                        )
                                                    }
                                                    onClick={() => setMainImage(item.name === "Default" ? product?.imageUpload?.url : item.image)}
                                                >
                                                    {({ active, checked }) => (
                                                        <>
                                                            <RadioGroup.Label>
                                                                <div className='flex justify-center mb-5 -mt-9'>
                                                                    {item.name !== "Default" && (
                                                                        <div
                                                                            style={{ backgroundColor: `${item.color}` }}
                                                                            className='w-6 h-6 rounded-xl border-2 border-gray-800'
                                                                        />
                                                                    )}
                                                                </div>
                                                                <img
                                                                    className='cursor-pointer'
                                                                    src={item.image}
                                                                    alt="" />
                                                                <p className={`text-gray-300 justify-center flex ${item.name === "Default" && 'mt-9'}`}>
                                                                    {item.name}
                                                                </p>
                                                            </RadioGroup.Label>
                                                            {item.inStock ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? 'border' : 'border-2',
                                                                        checked ? 'border-indigo-500' : 'border-transparent',
                                                                        'pointer-events-none absolute -inset-px rounded-md'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <span
                                                                    aria-hidden="true"
                                                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                                >
                                                                    <svg
                                                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                        viewBox="0 0 100 100"
                                                                        preserveAspectRatio="none"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                    </svg>
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>

                                {selectedColor.name === "" ? (
                                    <Button
                                        sx={{
                                            px: "2rem",
                                            py: "1rem",
                                            bgcolor: "#9155fd",
                                            color: "white"
                                        }}
                                    >
                                        Choose Color To Add To Cart
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleAddToCart}
                                        sx={{
                                            px: "2rem",
                                            py: "1rem",
                                            bgcolor: "#9155fd",
                                            color: "white"
                                        }}
                                    >
                                        Add To Cart
                                    </Button>
                                )}
                            </form>
                        </div>
                    </div>
                </section>


                {/* Reviews */}
                <section>
                    <h1 className='font-semibold text-lg pb-4 mt-10'>Recent Review & Rating</h1>

                    <div className='border p-5'>
                        <Grid container spacing={7}>

                            <Grid item xs={7}>
                                <div className='space-y-5'>
                                    <ProductReviewCard />

                                </div>
                            </Grid>

                            {/* Rating */}
                            <Grid item xs={5}>
                                <h1 className='text-xl font-semibold pb-2'>Product Ratings</h1>

                                <div className='flex items-center space-x-3'>
                                    <Rating value={4.6} precision={.5} readOnly />
                                    <p className='opacity-60'></p>
                                </div>

                                <Box className="mt-5 space-y-3">
                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p>Excellent</p>
                                        </Grid>

                                        <Grid item xs={7}>
                                            <LinearProgress
                                                sx={{
                                                    bgcolor: "#d0d0d0",
                                                    borderRadius: 4,
                                                    height: 7
                                                }}
                                                variant='determinate'
                                                value={50}
                                                color='success' />
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p>Every Good</p>
                                        </Grid>

                                        <Grid item xs={7}>
                                            <LinearProgress
                                                sx={{
                                                    bgcolor: "#d0d0d0",
                                                    borderRadius: 4,
                                                    height: 7
                                                }}
                                                variant='determinate'
                                                value={40}
                                                color='success' />
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p>Good</p>
                                        </Grid>

                                        <Grid item xs={7}>
                                            <LinearProgress
                                                sx={{
                                                    bgcolor: "#d0d0d0",
                                                    borderRadius: 4,
                                                    height: 7,
                                                    color: "yellow"
                                                }}
                                                variant='determinate'
                                                value={30}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p>Avarage</p>
                                        </Grid>

                                        <Grid item xs={7}>
                                            <LinearProgress
                                                sx={{
                                                    bgcolor: "#d0d0d0",
                                                    borderRadius: 4,
                                                    height: 7
                                                }}
                                                variant='determinate'
                                                value={20}
                                                color='warning' />
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p>Poor</p>
                                        </Grid>

                                        <Grid item xs={7}>
                                            <LinearProgress
                                                sx={{
                                                    bgcolor: "#d0d0d0",
                                                    borderRadius: 4,
                                                    height: 7
                                                }}
                                                variant='determinate'
                                                value={10}
                                                color='error' />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>

                        </Grid>
                    </div>
                </section>

                {/* similer products */}
                <section className='pt-10'>
                    <h1 className='pt-5 text-2xl font-bold pl-20'>Similer Products</h1>

                    <Grid container spacing={2}>
                        {productSeries.map((item) => (
                            <Grid item xs={2} key={item.id} marginTop={3}>
                                <ProductCard product={item} />
                            </Grid>
                        ))}
                    </Grid>
                </section>

            </div>
        </div>
    )
}
