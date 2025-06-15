import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation, useParams } from 'react-router-dom';
import DeliveryAddressForm from './DeliveryAddressForm';
import OrderSummary from './OrderSummary';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const steps = ['Login', 'Delevery Address', 'Order Summary', 'Payment'];

export default function Checkout() {
    
    const param = useParams()
  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation()
  const querySearch = new URLSearchParams(location.search)

  const step = param.step ? param.step : parseInt(querySearch.get("step"), 10)  

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className='px-10 py-10 lg:px-20 bg-[#111827]'>
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={step}>
                {steps.map((label) => {
                    return (
                        <Step key={label} 
                            sx={{
                                ".MuiStepLabel-label": { 
                                    color: "gray",
                                    fontWeight: "semibold",
                                    fontSize: "1.25rem",
                                    "&.Mui-completed" :{
                                        color: "#8DDC26"
                                    },
                                    "&.Mui-active" : {
                                        color: "#2DCCFF"
                                    }
                                },
                                ".MuiSvgIcon-root": {
                                    color: "gray",
                                    width: "35px",
                                    height: "35px",
                                    "&.Mui-completed" :{
                                        color: "#8DDC26"
                                    },
                                    "&.Mui-active": {
                                        color: "#2DCCFF",
                                        ".MuiStepIcon-text" :{
                                            fill: "black"
                                        }
                                    },
                                },
                            }}
                        >
                            <StepLabel>
                                {label}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            
            {activeStep === steps.length ? (
                <>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                </>
            ) : (
                <>
                    {param.activeStep && 
                        <div className='pt-7'>
                            <Button
                                startIcon={<ArrowBackIcon/>}
                                sx={{
                                        px: "2.5rem",
                                        py: "0.5rem",
                                        bgcolor: "#2DCCFF",
                                        color: "black",
                                        fontWeight: "bold",
                                        fontSize: '1rem',
                                        borderRadius: "40px",
                                        ":hover": {
                                            bgcolor: "#56F000",
                                        }
                                    }}
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                        </div>
                    }
                    
                    <div className='mt-10'>
                        {step === 2 ? <DeliveryAddressForm/> : <OrderSummary/>}
                    </div>
                </>
            )}
        </Box>
    </div>
    
  );
}