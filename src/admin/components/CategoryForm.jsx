import { Listbox, Transition } from '@headlessui/react'
import { Grid, TextField } from '@mui/material'
import React from 'react'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import CheckIcon from '@mui/icons-material/Check';

const CategoryForm = ({ productId, handleTierChange, setSelected, selected, productData, initialTier, handleChange, Fragment, classNames, initialDifficulty, handleDiffcultyChange, selectedDiffculty, setSelectedDiffculty }) => {
    const handleCategory = (category) => {
        // if(category)
            switch (category) {
                case "skin":
                    return (
                        <>
                            <Grid item xs={6} sm={6}>
                                Tier:
                                <Listbox value={selected} onChange={productId ? handleTierChange : setSelected} className="h-full">
                                    {({ open }) => (
                                        <>
                                            <div className="relative h-full">
                                                <Listbox.Button className="h-14 relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                                    {productId ? (
                                                        <>
                                                            <span className="flex items-center">
                                                                {productData?.skin?.imageTier !== "" &&
                                                                    <img
                                                                        src={productData?.skin?.imageTier}
                                                                        alt=""
                                                                        className="h-[2rem] w-[2rem]"
                                                                    />
                                                                }
                                                                <span className={`${productData?.skin?.imageTier === "" ? 'ml-14' : ''} ml-3 block truncate font-bold`}>
                                                                    {productData?.skin?.tier}
                                                                </span>
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="flex items-center">
                                                                {selected.image !== "" &&
                                                                    <img
                                                                        src={selected.image}
                                                                        alt=""
                                                                        className="h-[2rem] w-[2rem]"
                                                                    />
                                                                }
                                                                <span className={`${selected.image === "" ? 'ml-14' : ''} ml-3 block truncate font-bold`}>
                                                                    {selected.name}
                                                                </span>
                                                            </span>
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
                                                        {initialTier.map((person) => (
                                                            <Listbox.Option
                                                                key={person.id}
                                                                className={({ active }) =>
                                                                    classNames(
                                                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                        'relative cursor-default select-none py-2 pl-3 pr-9'
                                                                    )
                                                                }
                                                                value={person}
                                                            >
                                                                {({ selected, active }) => (
                                                                    <>
                                                                        <div className="flex items-center">
                                                                            {person.image !== "" ? (
                                                                                <img src={person.image} alt="" className="h-[2rem] w-[2rem]" />
                                                                            ) : (
                                                                                <div className="h-[2rem] w-[2rem]"></div>
                                                                            )}

                                                                            <span
                                                                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                            >
                                                                                {person.name}
                                                                            </span>
                                                                        </div>

                                                                        {selected ? (
                                                                            <span
                                                                                className={classNames(
                                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                )}
                                                                            >
                                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
                            </Grid>

                            <Grid item xs={6} sm={6} marginTop={3}>
                                <TextField
                                    fullWidth
                                    label="Series"
                                    name="series"
                                    value={productData.series}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                        </>
                    )
                case "champion":
                    return (
                        <>
                            <Grid item xs={4} sm={4}>
                                Difficulty:
                                <Listbox value={selectedDiffculty} onChange={productId ? handleDiffcultyChange : setSelectedDiffculty} className="h-full">
                                    {({ open }) => (
                                        <>
                                            <div className="relative h-full">
                                                <Listbox.Button className="h-14 relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                                    {productId ? (
                                                        <>
                                                            <span className="flex items-center">
                                                                {productData?.champion?.difficulty !== "" &&
                                                                    <>
                                                                        <span className={`${productData?.champion?.difficulty === "" ? 'ml-14' : ''} ml-3 block truncate font-bold`}>
                                                                            {productData?.champion?.difficulty}
                                                                        </span>
                                                                        <div className='flex items-center'>
                                                                            <span
                                                                                className='w-5 h-5 bg-[#08D7F7] mr-1'
                                                                                style={{ transform: 'skewX(-40deg)', }}
                                                                            />
                                                                            <span
                                                                                className={`${productData?.champion?.difficulty !== 'LOW' ? '' : 'opacity-20'} w-5 h-5 bg-[#08D7F7] mr-1`}
                                                                                style={{ transform: 'skewX(-40deg)', }}
                                                                            />
                                                                            <span
                                                                                className={`${productData?.champion?.difficulty === 'HIGH' ? '' : 'opacity-20'} w-5 h-5 bg-[#08D7F7] mr-1`}
                                                                                style={{ transform: 'skewX(-40deg)', }}
                                                                            />
                                                                        </div>
                                                                    </>
                                                                }
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="flex justify-between">
                                                                <span className='pl-3 font-semibold'>
                                                                    {selectedDiffculty.name}
                                                                </span>
                                                                <div className='flex pt-1'>
                                                                    <span
                                                                        className='w-5 h-5 bg-[#08D7F7] mr-1'
                                                                        style={{ transform: 'skewX(-40deg)', }}
                                                                    />
                                                                    <span
                                                                        className={`${selectedDiffculty.name !== 'LOW' ? '' : 'opacity-20'} w-5 h-5 bg-[#08D7F7] mr-1`}
                                                                        style={{ transform: 'skewX(-40deg)', }}
                                                                    />
                                                                    <span
                                                                        className={`${selectedDiffculty.name === 'HIGH' ? '' : 'opacity-20'} w-5 h-5 bg-[#08D7F7] mr-1`}
                                                                        style={{ transform: 'skewX(-40deg)', }}
                                                                    />
                                                                </div>
                                                            </span>

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
                                                        {initialDifficulty.map((person) => (
                                                            <Listbox.Option
                                                                key={person.id}
                                                                className={({ active }) =>
                                                                    classNames(
                                                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                        'relative cursor-default select-none py-2 pl-3 pr-9'
                                                                    )
                                                                }
                                                                value={person}
                                                            >
                                                                {({ selectedDiffculty, active }) => (
                                                                    <>
                                                                        <div className="flex justify-between">
                                                                            <span
                                                                                className={classNames(setSelectedDiffculty ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                            >
                                                                                {person.name}
                                                                            </span>
                                                                            <div className='flex'>
                                                                                <span
                                                                                    className='w-5 h-5 bg-[#08D7F7] mr-1'
                                                                                    style={{ transform: 'skewX(-40deg)', }}
                                                                                />
                                                                                <span
                                                                                    className={`${person.name !== 'LOW' ? '' : 'opacity-20'} w-5 h-5 bg-[#08D7F7] mr-1`}
                                                                                    style={{ transform: 'skewX(-40deg)', }}
                                                                                />
                                                                                <span
                                                                                    className={`${person.name === 'HIGH' ? '' : 'opacity-20'} w-5 h-5 bg-[#08D7F7] mr-1`}
                                                                                    style={{ transform: 'skewX(-40deg)', }}
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        {selectedDiffculty ? (
                                                                            <span
                                                                                className={classNames(
                                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                )}
                                                                            >
                                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
                            </Grid>

                            <Grid item xs={4} sm={4} marginTop={3}>
                                <TextField
                                    fullWidth
                                    label="Region"
                                    name="region"
                                    value={productData?.champion?.region}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>

                            <Grid item xs={4} sm={4} marginTop={3}>
                                <TextField
                                    fullWidth
                                    label="Role"
                                    name="role"
                                    value={productData?.champion?.role}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                        </>
                    )
                case undefined:
                    return (
                        <>
                            
                        </>
                    )
            }
        // else 
        //     return (
        //         <>
        //             <h1>abc</h1>
        //         </>
        //     )
    }

    return (
        <Grid container spacing={2}>
            {handleCategory(productData?.category)}
            {/* <Grid item xs={6} sm={6}>
                Tier:
                <Listbox value={selected} onChange={productId ? handleTierChange : setSelected} className="h-full">
                    {({ open }) => (
                        <>
                            <div className="relative h-full">
                                <Listbox.Button className="h-14 relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                    {productId ? (
                                        <>
                                            <span className="flex items-center">
                                                {productData?.skin?.imageTier !== "" &&
                                                    <img
                                                        src={productData?.skin?.imageTier}
                                                        alt=""
                                                        className="h-[2rem] w-[2rem]"
                                                    />
                                                }
                                                <span className={`${productData?.skin?.imageTier === "" ? 'ml-14' : ''} ml-3 block truncate font-bold`}>
                                                    {productData?.skin?.tier}
                                                </span>
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="flex items-center">
                                                {selected.image !== "" &&
                                                    <img
                                                        src={selected.image}
                                                        alt=""
                                                        className="h-[2rem] w-[2rem]"
                                                    />
                                                }
                                                <span className={`${selected.image === "" ? 'ml-14' : ''} ml-3 block truncate font-bold`}>
                                                    {selected.name}
                                                </span>
                                            </span>
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
                                        {initialTier.map((person) => (
                                            <Listbox.Option
                                                key={person.id}
                                                className={({ active }) =>
                                                    classNames(
                                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                        'relative cursor-default select-none py-2 pl-3 pr-9'
                                                    )
                                                }
                                                value={person}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <div className="flex items-center">
                                                            {person.image !== "" ? (
                                                                <img src={person.image} alt="" className="h-[2rem] w-[2rem]" />
                                                            ) : (
                                                                <div className="h-[2rem] w-[2rem]"></div>
                                                            )}

                                                            <span
                                                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                            >
                                                                {person.name}
                                                            </span>
                                                        </div>

                                                        {selected ? (
                                                            <span
                                                                className={classNames(
                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                )}
                                                            >
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
            </Grid>

            <Grid item xs={6} sm={6} marginTop={3}>
                <TextField
                    fullWidth
                    label="Series"
                    name="series"
                    value={productData.series}
                    onChange={handleChange}
                    required
                />
            </Grid>

            <Grid item xs={4} sm={4}>
                Difficulty:
                <Listbox value={selectedDiffculty} onChange={productId ? handleDiffcultyChange : setSelectedDiffculty} className="h-full">
                    {({ open }) => (
                        <>
                            <div className="relative h-full">
                                <Listbox.Button className="h-14 relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                    {productId ? (
                                        <>
                                            <span className="flex items-center">
                                                {productData?.champion?.difficulty !== "" &&
                                                    <>
                                                        <span className={`${productData?.champion?.difficulty === "" ? 'ml-14' : ''} ml-3 block truncate font-bold`}>
                                                            {productData?.champion?.difficulty}
                                                        </span>
                                                        <div className='flex items-center'>
                                                            <span
                                                                className='w-5 h-5 bg-[#08D7F7] mr-1'
                                                                style={{ transform: 'skewX(-40deg)', }}
                                                            />
                                                            <span
                                                                className={`${productData?.champion?.difficulty !== 'LOW' ? '' : 'opacity-20'} w-5 h-5 bg-[#08D7F7] mr-1`}
                                                                style={{ transform: 'skewX(-40deg)', }}
                                                            />
                                                            <span
                                                                className={`${productData?.champion?.difficulty === 'HIGH' ? '' : 'opacity-20'} w-5 h-5 bg-[#08D7F7] mr-1`}
                                                                style={{ transform: 'skewX(-40deg)', }}
                                                            />
                                                        </div>
                                                    </>
                                                }
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="flex justify-between">
                                                <span className='pl-3 font-semibold'>
                                                    {selectedDiffculty.name}
                                                </span>
                                                <div className='flex pt-1'>
                                                    <span
                                                        className='w-5 h-5 bg-[#08D7F7] mr-1'
                                                        style={{ transform: 'skewX(-40deg)', }}
                                                    />
                                                    <span
                                                        className={`${selectedDiffculty.name !== 'LOW' ? '' : 'opacity-20'} w-5 h-5 bg-[#08D7F7] mr-1`}
                                                        style={{ transform: 'skewX(-40deg)', }}
                                                    />
                                                    <span
                                                        className={`${selectedDiffculty.name === 'HIGH' ? '' : 'opacity-20'} w-5 h-5 bg-[#08D7F7] mr-1`}
                                                        style={{ transform: 'skewX(-40deg)', }}
                                                    />
                                                </div>
                                            </span>

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
                                        {initialDifficulty.map((person) => (
                                            <Listbox.Option
                                                key={person.id}
                                                className={({ active }) =>
                                                    classNames(
                                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                        'relative cursor-default select-none py-2 pl-3 pr-9'
                                                    )
                                                }
                                                value={person}
                                            >
                                                {({ selectedDiffculty, active }) => (
                                                    <>
                                                        <div className="flex justify-between">
                                                            <span
                                                                className={classNames(setSelectedDiffculty ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                            >
                                                                {person.name}
                                                            </span>
                                                            <div className='flex'>
                                                                <span
                                                                    className='w-5 h-5 bg-[#08D7F7] mr-1'
                                                                    style={{ transform: 'skewX(-40deg)', }}
                                                                />
                                                                <span
                                                                    className={`${person.name !== 'LOW' ? '' : 'opacity-20'} w-5 h-5 bg-[#08D7F7] mr-1`}
                                                                    style={{ transform: 'skewX(-40deg)', }}
                                                                />
                                                                <span
                                                                    className={`${person.name === 'HIGH' ? '' : 'opacity-20'} w-5 h-5 bg-[#08D7F7] mr-1`}
                                                                    style={{ transform: 'skewX(-40deg)', }}
                                                                />
                                                            </div>
                                                        </div>

                                                        {selectedDiffculty ? (
                                                            <span
                                                                className={classNames(
                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                )}
                                                            >
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
            </Grid>

            <Grid item xs={4} sm={4} marginTop={3}>
                <TextField
                    fullWidth
                    label="Region"
                    name="region"
                    value={productData?.champion?.region}
                    onChange={handleChange}
                    required
                />
            </Grid>

            <Grid item xs={4} sm={4} marginTop={3}>
                <TextField
                    fullWidth
                    label="Role"
                    name="role"
                    value={productData?.champion?.role}
                    onChange={handleChange}
                    required
                />
            </Grid> */}
        </Grid>
    )
}

export default CategoryForm