{/* <Listbox
    value={dataSearch.chibi}
    onChange={(value) => handleChangeByCategory(value, 'tier', dataSearch.category)}
    className="h-full"
>
    {({ open }) => (
        <>
            <div className="relative h-full">
                <Listbox.Button className="h-14 relative w-full cursor-default rounded-md py-1.5 pl-2 
                                                text-left text-white border shadow-sm 
                                                sm:text-sm sm:leading-6">
                    {dataSearch.chibi.tier ? (
                        <>
                            <span className="flex items-center">
                                {chibiTier.image !== "" &&
                                    <img
                                        src={chibiTier.image}
                                        alt=""
                                        className="h-[2rem] w-[2rem]"
                                    />
                                }
                                <span className={`${chibiTier.image === "" ? 'ml-14' : ''} ml-3 block truncate font-bold text-base`}>
                                    {dataSearch.chibi.tier}
                                </span>
                            </span>
                        </>
                    ) : (
                        <>
                            <h2 className="text-white text-base">Chibi Tier</h2>
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
                                        active && 'bg-[#111827] text-white',
                                        'relative cursor-default select-none py-2 pl-3 pr-9'
                                    )
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

                                        {person.name === dataSearch.chibi.tier ? (
                                            <span
                                                className={classNames(
                                                    active && 'bg-[#111827] text-white',
                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                )}
                                            >
                                                <ClearIcon
                                                    className="cursor-pointer"
                                                    sx={{ fontSize: "30px" }}
                                                    onClick={(event) =>
                                                        clearOption(event, 'tier', dataSearch.category)
                                                    }
                                                />
                                            </span>
                                        ) : null
                                        }
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </>
    )}
</Listbox>  */}

//create
{/* <Listbox
    value={selectedTier}
    onChange={(value) => handleSkinChange(value, 'tier')}
    className="h-full"
>
    {({ open }) => (
        <>
            <div className="relative h-full">
                <Listbox.Button
                    className="h-14 relative w-full cursor-default rounded-md py-1.5 pl-3 
                                                text-left text-white border shadow-sm sm:text-sm sm:leading-6">
                    {productData?.skin?.tier ? (
                        <>
                            <span className="flex items-center">
                                {productData?.skin?.imageTier !== "" &&
                                    <img
                                        src={productData?.skin?.imageTier}
                                        alt=""
                                        className="h-[2rem] w-[2rem]"
                                    />
                                }
                                <span className={`${productData?.skin?.imageTier === "" ? 'ml-14' : ''} ml-3 block truncate font-bold text-base`}>
                                    {productData?.skin?.tier}
                                </span>
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="flex items-center">
                                {selectedTier.image !== "" &&
                                    <img
                                        src={selectedTier.image}
                                        alt=""
                                        className="h-[2rem] w-[2rem]"
                                    />
                                }
                                <span className={`${selectedTier.image === "" ? 'ml-14' : ''} ml-3 block truncate font-bold text-base`}>
                                    {selectedTier.name}
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
                                        active && 'bg-[#111827] text-white',
                                        'relative cursor-default select-none py-2 pl-3 pr-9 text-base font-semibold'
                                    )
                                }
                                value={person}
                            >
                                {({ selectedTier, active }) => (
                                    <>
                                        <div className="flex items-center">
                                            {person.image !== "" ? (
                                                <img src={person.image} alt="" className="h-[2rem] w-[2rem]" />
                                            ) : (
                                                <div className="h-[2rem] w-[2rem]"></div>
                                            )}

                                            <span
                                                className={classNames(selectedTier ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                            >
                                                {person.name}
                                            </span>
                                        </div>

                                        {person.name === productData?.skin?.tier ? (
                                            <span
                                                className={classNames(
                                                    active && 'bg-[#111827] text-white',
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
</Listbox> */}