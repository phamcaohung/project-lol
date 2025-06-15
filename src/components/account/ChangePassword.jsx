import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { CustomTextField } from "../../refactor/CustomStyle";

const ChangePassword = () => {

    const [password, setPassword] = useState("")


    return (
        <div className="px-14 py-5">
            <h1 className="text-4xl font-bold pb-20">Change Password</h1>
            <h3 className="text-2xl font-bold">Give Yourself A Great New Password</h3>

            <Grid container spacing={5} className="pb-10">
                <Grid item xs={8}>
                    <Grid container className="py-12" spacing={5}>
                        <Grid item xs={4} className="flex">
                            <div className="my-auto">
                                <h3 className="text-xl text-white/70 font-semibold">Current Password</h3>
                            </div>
                        </Grid>

                        <Grid item xs={8}>
                            <CustomTextField
                                fullWidth
                                label="Please enter your current password"
                                name="password"
                                value={password}
                            />
                        </Grid>

                        <Grid item xs={4} className="flex">
                            <div className="my-auto">
                                <h3 className="text-xl text-white/70 font-semibold">New Password</h3>
                            </div>
                        </Grid>

                        <Grid item xs={8}>
                            <CustomTextField
                                fullWidth
                                label="Please enter your new password"
                                name="firstName"
                                value={password}
                            />
                        </Grid>

                        <Grid item xs={4} className="flex">
                            <div className="my-auto">
                                <h3 className="text-xl text-white/70 font-semibold">Repeat Password</h3>
                            </div>
                        </Grid>

                        <Grid item xs={8}>
                            <CustomTextField
                                fullWidth
                                label="Please re-enter your new password"
                                name="firstName"
                                value={password}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <div className="bg-[#E6FFF2] mt-12 rounded-xl">
                        <div className="px-10 py-5">
                            <h3 className="text-2xl font-bold text-black">Rules For Passwords</h3>
                            <ul className="list-disc px-8 pt-8">
                                <li className="text-xl text-black font-semibold">Minimum 8 characters</li>
                                <li className="text-xl text-black font-semibold">At least one special characters</li>
                                <li className="text-xl text-black font-semibold">At least one number</li>
                                <li className="text-xl text-black font-semibold">Can't be the same as a previous</li>
                            </ul>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <hr />

            <div className="pt-10 flex items-center">
                <Button
                    sx={{
                        px: "2.5rem",
                        py: "1rem",
                        bgcolor: "#2DCCFF",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: '1.3rem',
                        borderRadius: "40px",
                        textTransform: "none",
                        marginRight: "30px",
                        ":hover": {
                            bgcolor: "#56F000",
                        }
                    }}
                >
                    Change Password
                </Button>

                <Button
                    sx={{
                        px: "2.5rem",
                        py: "1rem",
                        color: "white",
                        border: "1px solid gray",
                        fontWeight: "bold",
                        fontSize: '1.3rem',
                        borderRadius: "40px",
                        textTransform: "none",
                        ":hover": {
                            bgcolor: "#56F000",
                            color: "black"
                        }
                    }}
                >
                    Cancel
                </Button>
            </div>
        </div>
    )
}

export default ChangePassword