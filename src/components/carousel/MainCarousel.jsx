import { Collapse, Grid, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import React from "react"
import Slider from "react-slick"
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import './MainCarousel.css'
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import CategoryIcon from '@mui/icons-material/Category';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useNavigate } from "react-router-dom";

const MainCarousel = ({ data, onChangeName }) => {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate()

    const handleClick = () => {
        setOpen(!open);
    };

    const handleCarousel = (name) => {
        onChangeName(name)
    }

    const settings = {
        className: 'center',
        centerMode: true,
        focusOnSelect: true,
        infinite: true,
        centerPadding: '100px',
        slidesToShow: 3,
        speed: 500,
        nextArrow: <KeyboardDoubleArrowRightIcon
            fontSize="large"
            sx={{
                color: "#F87171",
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                right: "0rem",
                "&:hover": {
                    color: "white"
                },
                cursor: "pointer"
            }}
        />,
        prevArrow: <KeyboardDoubleArrowLeftIcon
            fontSize="large"
            sx={{
                color: "#F87171",
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: "0rem",
                "&:hover": {
                    color: "white"
                },
                cursor: "pointer"
            }}
        />
    }

    const iconStyle = {
        fontSize: "35px",
        color: "#F87171"
    }

    return (
        <Grid container className="main-carousel">
            <div>
                <img src="../../../" alt="" />
            </div>
            <Grid item xs={3} className="flex justify-center items-center ">
                <List
                    sx={{ width: '100%', maxWidth: 360, color: "white" }}
                >
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <CategoryIcon fontSize="large" color="secondary" />
                        </ListItemIcon>
                        <ListItemText>
                            <span className="text-3xl">Hot Series</span>
                        </ListItemText>
                        {open ? <ExpandLess sx={iconStyle} /> : <ExpandMore sx={iconStyle} />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton onClick={() => handleCarousel("PROJECT")}>
                                <ListItemIcon>
                                    <WhatshotIcon sx={iconStyle} />
                                </ListItemIcon>
                                <ListItemText>
                                    <span className="text-2xl">PROJECT</span>
                                </ListItemText>
                            </ListItemButton>

                            <ListItemButton onClick={() => handleCarousel("Coven")}>
                                <ListItemIcon>
                                    <WhatshotIcon sx={iconStyle} />
                                </ListItemIcon>
                                <ListItemText>
                                    <span className="text-2xl">Coven</span>
                                </ListItemText>
                            </ListItemButton>

                            <ListItemButton onClick={() => handleCarousel("Immortal Journey")}>
                                <ListItemIcon>
                                    <WhatshotIcon sx={iconStyle} />
                                </ListItemIcon>
                                <ListItemText>
                                    <span className="text-2xl">Immortal Journey</span>
                                </ListItemText>
                            </ListItemButton>

                            <ListItemButton onClick={() => handleCarousel("Pulsefire")}>
                                <ListItemIcon>
                                    <WhatshotIcon sx={iconStyle} />
                                </ListItemIcon>
                                <ListItemText>
                                    <span className="text-2xl">Pulsefire</span>
                                </ListItemText>
                            </ListItemButton>

                            <ListItemButton onClick={() => handleCarousel("High Noon")}>
                                <ListItemIcon>
                                    <WhatshotIcon sx={iconStyle} />
                                </ListItemIcon>
                                <ListItemText>
                                    <span className="text-2xl">High Noon</span>
                                </ListItemText>
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </Grid>

            <Grid item xs={9}>
                <Slider {...settings}>
                    {data.map((items) =>
                        <div
                            key={items.id}
                            className="border-2 border-black rounded-lg cursor-pointer"
                            onClick={() => navigate(`/product/${items.id}`, { state: items.series })}
                        >
                            <img
                                alt=""
                                src={items.imageUrl}
                            />
                            {items.imageTier !== "" &&
                                <div className="flex justify-center">
                                    <img
                                        style={{
                                            marginTop: "-18px",
                                        }}
                                        className="h-8 w-8"
                                        src={items.imageTier}
                                        alt=""
                                    />
                                </div>
                            }
                            <div className="mt-3 mb-3">
                                <h2 className='font-bold lg:text-lg text-gray-100 text-center'>
                                    {items.title}
                                </h2>
                                <div className="flex items-center justify-center">
                                    <h1 className='font-bold text-lg lg:text-lg text-gray-100'>
                                        {items.price}
                                    </h1>
                                    <img
                                        className='w-[1rem] h-[1rem] ml-2 mt-0.5'
                                        src="https://rankedkings.com/img/rp.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </Slider>
            </Grid>
        </Grid>
    )
}

export default MainCarousel

