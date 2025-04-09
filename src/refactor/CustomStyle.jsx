import { Listbox, Transition } from "@headlessui/react";
import { Autocomplete, FormControl, styled, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Fragment } from "react";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';


export const CustomTextField = styled(TextField)({
    "& label": { color: "white" },
    "& label.Mui-focused": { color: "white" },
    "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "white" },
        "&:hover fieldset": { borderColor: "white" },
        "&.Mui-focused fieldset": { borderColor: "white" },
    },
    "& .MuiInputBase-root": {
        color: "white",
    },
})

export const CustomFormControl = styled(FormControl)({
    "& label": { color: "white" },
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": { borderColor: "white" },
        "& fieldset": { borderColor: "white" },
        "&:hover fieldset": { borderColor: "inherit" },
    },
    "& .MuiInputBase-root": {
        color: "white",
    },
    "& .MuiInputLabel-root": {
        "&.Mui-focused": { color: "white" },
    },
})

export const CustomAutocomplete = styled(Autocomplete)({
    "& label": { color: "white" },
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": { borderColor: "white" },
        "& fieldset": { borderColor: "white" },
        "&:hover fieldset": { borderColor: "inherit" },
    },
    "& .MuiInputBase-root": {
        color: "white",
    },
    "& .MuiInputLabel-root": {
        "&.Mui-focused": { color: "white" },
    },
})

export const CustomDatePicker = styled(DatePicker)({
    "& label": { color: "white" },
    "& label.Mui-focused": { color: "white" },
    "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "white" },
        "&:hover fieldset": { borderColor: "white" },
        "&.Mui-focused fieldset": { borderColor: "white" },
    },
    "& .MuiInputBase-root": {
        color: "white",
    },
    "& .MuiButtonBase-root": {
        color: "white"
    }
})

export const CustomListBox = ({
    value,
    initial,
    onChange,
    type,
    title,
    image,
    clearOption,
    condition,
}) => {

    if (!image) {
        const optionMap = new Map(initial.map(item => [item.name, item]))
        image = optionMap.get(type)?.image
    }

    return (
        <Listbox
            value={value}
            onChange={onChange}
            className="h-full"
        >
            {({ open }) => (
                <>
                    <div className="relative h-full">
                        <Listbox.Button
                            className="h-14 relative w-full cursor-default rounded-md py-1.5 pl-4 
                                    text-left text-white border shadow-sm 
                                    sm:text-sm sm:leading-6">
                            {type ? (
                                <>
                                    <span className="flex items-center">
                                        {image !== "" &&
                                            <img
                                                src={image}
                                                alt=""
                                                className="h-[2rem] w-[2rem]"
                                            />
                                        }
                                        <span className={`${image === "" ? 'ml-14' : ''} ml-3 block truncate font-bold text-base`}>
                                            {type}
                                        </span>
                                    </span>
                                </>
                            ) : (
                                <>
                                    {condition ? (
                                        <span className="flex items-center">
                                            {value.image !== "" &&
                                                <img
                                                    src={value.image}
                                                    alt=""
                                                    className="h-[2rem] w-[2rem]"
                                                />
                                            }
                                            <span className={`${value.image === "" ? 'ml-14' : ''} ml-3 block truncate font-bold text-base`}>
                                                {value.name}
                                            </span>
                                        </span>
                                    ) : (
                                        <h2 className="text-white text-base">{title}</h2>
                                    )}
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
                                {initial.map((person) => (
                                    <Listbox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                            `${active && 'bg-[#111827] text-white'}
                                            relative cursor-default select-none py-2 pl-3 pr-9 text-base font-semibold`
                                        }
                                        value={person}
                                    >
                                        {({ active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    {person.image !== "" ? (
                                                        <img src={person.image} alt="" className="h-[2rem] w-[2rem]" />
                                                    ) : (
                                                        <div className="h-[2rem] w-[2rem]"></div>
                                                    )}

                                                    <span className='font-semibold ml-3 block truncate'>
                                                        {person.name}
                                                    </span>
                                                </div>

                                                {person.name === type ? (
                                                    <span
                                                        className={
                                                            `${active && 'bg-[#111827] text-white'}
                                                            absolute inset-y-0 right-0 flex items-center pr-4`
                                                        }
                                                    >
                                                        {condition ? (
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            <ClearIcon
                                                                className="cursor-pointer"
                                                                sx={{ fontSize: "30px" }}
                                                                onClick={clearOption}
                                                            />
                                                        )}
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
    )
}