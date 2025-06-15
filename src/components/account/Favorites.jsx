import React, { useState } from "react";
import clsx from 'clsx'
import { Dialog, Transition } from "@headlessui/react";
import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import { Favorite } from '@mui/icons-material';
import ImagePaymentSuccess from "../../assets/payment_success.jpg"
import Backdrop from '@mui/material/Backdrop';
import Address from "../addressCard/Address";



const Favorites = () => {

    const [isShowing, setIsShowing] = useState(false)

    console.log("isShowing: ", isShowing);

    const closeModal = () => {
        setIsShowing(false)
    }

    const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


    return (
        <div className="mt-5 flex flex-col items-center">
            <div className="w-[300px] h-[300px]">
                <Transition
                    show={isShowing}
                    enter="transition duration-500"
                    enterFrom="scale-50 rotate-[-120deg] opacity-0"
                    leave="duration-300 ease-in-out"
                    leaveTo="scale-75"
                    className='dura'
                >
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={isShowing}
                        onClose={closeModal}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                        }}
                    >
                        <Fade in={isShowing}>
                            {/* <Box sx={style}>
                                <Typography id="transition-modal-title" variant="h6" component="h2">
                                    Text in a modal
                                </Typography>
                                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                </Typography>
                            </Box> */}
                            <div 
                                className="
                                    bg-[#111827] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute
                                    border-2 border-gray-600 shadow-lg py-16 px-10
                                "
                            >
                                <Address/>
                            </div>
                        </Fade>
                    </Modal>
                </Transition>

            </div>
            <div className="mt-56">
                <Button
                    onClick={() => {
                        setIsShowing(!isShowing)
                    }}
                    className="mt-5 gap-2 rounded-full bg-white/10 px-3 py-1 text-sm/6 font-semibold text-white transition data-hover:scale-105 data-hover:bg-white/15"
                >
                    <Favorite className="size-4 fill-white/50" />
                    <span>Click to transition</span>
                </Button>
            </div>

        </div>
    )
}

export default Favorites