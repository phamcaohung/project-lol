import React, { useState } from "react"
import './SigninAndSignup.css'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Grid, Link, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { login, register } from "../state/auth/Action";
import { useNavigate } from "react-router-dom";

const SigninAndSignup = () => {
    const [className, setClassName] = useState("container");
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const classNameRegister = () => {
        setClassName("container active")
    }

    const classNameLogin = () => {
        setClassName("container")
    }

    const handleSubmitRegister = (event) => {
        event.preventDefault()

        const Formdata = new FormData(event.currentTarget)

        const userData = {
            firstName: Formdata.get("firstName"),
            lastName: Formdata.get("lastName"),
            email: Formdata.get("email"),
            password: Formdata.get("password")
        }

        const data = {
            userData,
            navigate
        }

        dispatch(register(data))
    }

    const handleSubmitLogin = (event) => {
        event.preventDefault()
        const Formdata = new FormData(event.currentTarget)

        const userData = {
            email: Formdata.get("email"),
            password: Formdata.get("password")
        }

        const data = {
            userData,
            navigate
        }

        dispatch(login(data))
    }

    return (
        <div className="signin-and-signup">
            <div className={className}>
                <div className="form-container sign-up">
                    <form onSubmit={handleSubmitRegister}>
                        <h1 className="text-3xl">Sign Up</h1>
                        <div className="social-icons">
                            <Link className="icon" href=""><GoogleIcon fontSize="large" /></Link>
                            <Link className="icon" href=""><FacebookIcon fontSize="large" /></Link>
                            <Link className="icon" href=""><GitHubIcon fontSize="large" /></Link>
                            <Link className="icon" href=""><LinkedInIcon fontSize="large" /></Link>
                        </div>
                        <span>or use your email for registeration</span>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    fullWidth
                                    autoComplete="given name"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    fullWidth
                                    autoComplete="given name"
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            margin="normal"
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            autoComplete="email"
                        />
                        <TextField
                            margin="normal"
                            required
                            id="password"
                            name="password"
                            label="password"
                            fullWidth
                            autoComplete="password"
                        />
                        <button>Sign Up</button>
                    </form>
                </div>

                <div className="form-container sign-in">
                    <form onSubmit={handleSubmitLogin}>
                        <h1 className="text-3xl">Sign In</h1>
                        <div className="social-icons">
                            <Link className="icon" href=""><GoogleIcon fontSize="large" /></Link>
                            <Link className="icon" href=""><FacebookIcon fontSize="large" /></Link>
                            <Link className="icon" href=""><GitHubIcon fontSize="large" /></Link>
                            <Link className="icon" href=""><LinkedInIcon fontSize="large" /></Link>
                        </div>
                        <span>or use your email password</span>
                        <TextField
                            margin="normal"
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            autoComplete="email"

                        />
                        <TextField
                            margin="normal"
                            required
                            id="password"
                            name="password"
                            label="password"
                            fullWidth
                            autoComplete="password"
                        />
                        <Link href="">Forget Your Password?</Link>
                        <button>Sign In</button>
                    </form>
                </div>

                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button onClick={classNameLogin}>Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button onClick={classNameRegister}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SigninAndSignup