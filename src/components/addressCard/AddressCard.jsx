import { Grid } from "@mui/material";
import React from "react";

const AddressCard = ({address, item}) => {
    return (
        <div className={`${item ? 'h-[12rem]' : 'h-[10rem]'}`}>
            <Grid container spacing={10} className="flex justify-center">
                <Grid item className="font-semibold">
                    Name: {address?.firstName + " " + address?.lastName} 
                </Grid>
                <Grid item className="font-semibold">
                    Phone: {address?.mobile}
                </Grid>
            </Grid>

            <Grid container spacing={10} className="pt-5 flex justify-center">
                <Grid item className="font-semibold">
                    State: {address?.state}
                </Grid>
                <Grid item className="font-semibold">
                    Street Addresss: {address?.streetAddress}
                </Grid>
                <Grid item className="font-semibold">
                    ZipCode: {address?.zipCode} 
                </Grid>
            </Grid>

            {item && 
                <Grid container spacing={10} className="pt-5 flex justify-center">
                    <Grid item className="font-semibold">
                        Total Item: {item.totalItem}
                    </Grid>
                    <Grid item className="font-semibold">
                        Discounted: {item.discounted}
                    </Grid>
                    <Grid item className="font-semibold">
                        Total Price: {item.totalPrice}
                    </Grid>
                </Grid>
            }
            
        </div>
    )
}

export default AddressCard