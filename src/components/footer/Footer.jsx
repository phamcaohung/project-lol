import React from "react";
import { Grid, Button, TextField } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Footer = () => {
    return (
        <div className="mx-20 mt-20">
            <Grid container spacing={10}>
                <Grid item xs={4}>
                    <div>
                        <img
                            src="https://oyster.ignimgs.com/mediawiki/apis.ign.com/league-of-legends/8/86/League_of_legends_logo_transparent.png"
                            alt=""
                        />
                        <p className="text-2xl text-justify">
                            Dolore erat dolor sit lorem vero amet. Sed sit lorem magna,
                            ipsum no sit erat lorem et magna ipsum dolore amet erat.
                        </p>

                        <div className="mt-8">
                            <LocationOnIcon fontSize="large" />
                            <span className="text-xl ml-2">
                                116/78B Nguyễn Cư Trinh, Quận 1, Hồ Chí Minh city
                            </span>
                        </div>
                        <div className="text-xl mt-4">
                            <EmailIcon fontSize="large" />
                            <span className="ml-3">
                                phamcao77@gmail.com
                            </span>
                        </div>
                        <div className="text-xl mt-4">
                            <PhoneIcon fontSize="large" />
                            <span className="ml-3">
                                +036 834 9903
                            </span>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={3}>
                    <div>
                        <h2 className="text-4xl font-bold mb-10 mt-24">
                            Quick Links
                        </h2>

                        <div>
                            <NavigateNextIcon fontSize="large" />
                            <span className="text-2xl ml-2">
                                Home
                            </span>
                        </div>

                        <div className="mt-2">
                            <NavigateNextIcon fontSize="large" />
                            <span className="text-2xl ml-2">
                                Our Shop
                            </span>
                        </div>

                        <div className="mt-2">
                            <NavigateNextIcon fontSize="large" />
                            <span className="text-2xl ml-2">
                                Shopping Cart
                            </span>
                        </div>

                        <div className="mt-2">
                            <NavigateNextIcon fontSize="large" />
                            <span className="text-2xl ml-2">
                                Checkout
                            </span>
                        </div>

                        <div className="mt-2">
                            <NavigateNextIcon fontSize="large" />
                            <span className="text-2xl ml-2">
                                Contact Us
                            </span>
                        </div>
                    </div>
                </Grid>


                <Grid item xs={2}>
                    <div>
                        <h2 className="text-4xl font-bold mb-10 mt-24">
                            Quick Links
                        </h2>

                        <div>
                            <NavigateNextIcon fontSize="large" />
                            <span className="text-2xl ml-2">
                                Home
                            </span>
                        </div>

                        <div className="mt-2">
                            <NavigateNextIcon fontSize="large" />
                            <span className="text-2xl ml-2">
                                Our Shop
                            </span>
                        </div>

                        <div className="mt-2">
                            <NavigateNextIcon fontSize="large" />
                            <span className="text-2xl ml-2">
                                Shopping Cart
                            </span>
                        </div>

                        <div className="mt-2">
                            <NavigateNextIcon fontSize="large" />
                            <span className="text-2xl ml-2">
                                Checkout
                            </span>
                        </div>

                        <div className="mt-2">
                            <NavigateNextIcon fontSize="large" />
                            <span className="text-2xl ml-2">
                                Contact Us
                            </span>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={3}>
                    <div>
                        <h2 className="text-4xl font-bold mb-10 mt-24">
                            Newsletter
                        </h2>
                        <TextField
                            margin="normal"
                            label="Your Name"
                            fullWidth
                        />
                        <TextField
                            margin="normal"
                            label="Your Email"
                            fullWidth
                            color="info"
                        />
                        <Button
                            fullWidth
                            sx={{
                                marginTop: "15px",
                                py: "20px",
                                fontSize: "1.2rem",
                                color: "#F87171",
                                border: "1px solid #F87171",
                                ":hover": {
                                    color: "black",
                                    backgroundColor: "white",
                                    border: "black"
                                }
                            }}
                        >
                            Subscribe Now
                        </Button>
                    </div>
                </Grid>
            </Grid>

            <hr className="bg-black h-[0.2rem] mt-5" />
            <div className="text-center text-3xl py-6">
                © Your Site Name. All Rights Reserved
            </div>
        </div>
    )
}

export default Footer 