import { Listbox, Transition } from '@headlessui/react'
import { Grid } from '@mui/material'
import React, { Fragment } from 'react'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import CheckIcon from '@mui/icons-material/Check';
import { CustomListBox, CustomTextField } from '../../refactor/CustomStyle';

const CategoryForm = ({
    productId, selectedTier, productData, initialTier,
    classNames, initialDifficulty, selectedDifficulty, clearOption,
    handleChangeByCategory, initialRegion, initialRole, handleSkinSeriesChange,
    selectedRegion, selectedRole, handleSkillChampion, skillForm
}) => {

    console.log("productData: ", productData?.skin?.tier);


    const handleCategory = (category) => {

        switch (category) {
            case "skin":
                return (
                    <>
                        <Grid item xs={6} sm={6}>
                            <span className='text-white'>Tier:</span>
                            <CustomListBox
                                value={selectedTier}
                                initial={initialTier}
                                onChange={(value) => handleChangeByCategory(value, 'tier', productData.category)}
                                type={productData.skin.tier}
                                image={productData.skin.imageTier}
                                condition={productId}
                                title={'Skin Tier'}
                                clearOption={(event) => clearOption(event, 'tier', productData.category)}
                            />
                        </Grid>

                        <Grid item xs={6} sm={6} marginTop={3}>
                            <CustomTextField
                                fullWidth
                                label="Series"
                                value={productData?.skin?.series}
                                onChange={(e) => handleChangeByCategory(e.target.value, 'series', productData.category)}
                                required
                            />
                        </Grid>
                    </>
                )
            case "champion":
                return (
                    <>
                        {/* Difficulty */}
                        <Grid item xs={12} sm={4}>
                            <span className='text-white'>Difficulty:</span>
                            <Listbox
                                value={selectedDifficulty}
                                onChange={(value) => handleChangeByCategory(value, "difficulty", productData.category)}
                                className="h-full"
                            >
                                {({ open }) => (
                                    <>
                                        <div className="relative h-full">
                                            <Listbox.Button 
                                                className="h-14 relative w-full cursor-default rounded-md py-1.5 pl-3 
                                                text-left text-white shadow-sm border pr-12
                                                sm:text-sm sm:leading-6"
                                            >
                                                {productId ? (
                                                    <>
                                                        <span className="flex justify-between">
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
                                                                {selectedDifficulty.difficulty}
                                                            </span>
                                                            <div className='flex pt-1'>
                                                                <span
                                                                    className='w-5 h-5 bg-[#08D7F7] mr-1'
                                                                    style={{ transform: 'skewX(-40deg)', }}
                                                                />
                                                                <span
                                                                    className={`${selectedDifficulty.difficulty !== 'LOW' ? '' : 'opacity-20'} w-5 h-5 bg-[#08D7F7] mr-1`}
                                                                    style={{ transform: 'skewX(-40deg)', }}
                                                                />
                                                                <span
                                                                    className={`${selectedDifficulty.difficulty === 'HIGH' ? '' : 'opacity-20'} w-5 h-5 bg-[#08D7F7] mr-1`}
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
                                                                    active && 'bg-[#111827] text-white',
                                                                    'relative cursor-default select-none py-2 pl-3 pr-12'
                                                                )
                                                            }
                                                            value={person}
                                                        >
                                                            {({ active }) => (
                                                                <>
                                                                    <div className="flex justify-between">
                                                                        <span className='font-semibold ml-3 block truncate'>
                                                                            {person.difficulty}
                                                                        </span>
                                                                        <div className='flex'>
                                                                            <span
                                                                                className='w-5 h-5 bg-[#08D7F7] mr-1'
                                                                                style={{ transform: 'skewX(-40deg)', }}
                                                                            />
                                                                            <span
                                                                                className={`${person.difficulty !== 'LOW' ? '' : 'opacity-20'} w-5 h-5 bg-[#08D7F7] mr-1`}
                                                                                style={{ transform: 'skewX(-40deg)', }}
                                                                            />
                                                                            <span
                                                                                className={`${person.difficulty === 'HIGH' ? '' : 'opacity-20'} w-5 h-5 bg-[#08D7F7] mr-1`}
                                                                                style={{ transform: 'skewX(-40deg)', }}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    {person.difficulty === productData?.champion?.difficulty ? (
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
                            </Listbox>
                        </Grid>
                        

                        {/* Region */}
                        <Grid item xs={12} sm={4}>
                            <span className='text-white'>Region:</span>
                            <CustomListBox
                                value={selectedRegion}
                                initial={initialRegion}
                                onChange={(value) => handleChangeByCategory(value, 'region', productData.category)}
                                type={productData.champion.region}
                                image={productData.champion.imageRegion}
                                condition={productId}
                                title={'Champion Region'}
                                clearOption={(event) => clearOption(event, 'region', productData.category)}
                            />
                        </Grid>

                        {/* Role */}
                        <Grid item xs={12} sm={4}>
                            <span className='text-white'>Role</span>
                            <CustomListBox
                                value={selectedRole}
                                initial={initialRole}
                                onChange={(value) => handleChangeByCategory(value, 'role', productData.category)}
                                type={productData.champion.role}
                                image={productData.champion.imageRole}
                                condition={productId}
                                title={'Champion Role'}
                                clearOption={(event) => clearOption(event, 'role', productData.category)}
                            />
                        </Grid>

                        {/* Skill */}
                        <Grid item container xs={12} spacing={4} marginTop={1}>
                            {skillForm.map((item, index) => (
                                <Grid
                                    item
                                    container
                                    xs={12}
                                    sm={12}
                                    spacing={4}
                                    key={index}
                                >
                                    <Grid item xs={12} sm={3} className='flex justify-around text-white'>
                                        <h1 className='font-semibold text-4xl my-auto'>
                                            {item.keyboard}
                                        </h1>
                                        <img
                                            className=''
                                            src={item.image}
                                            alt=""
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3} className='flex justify-center'>
                                        <div className='my-auto w-full'>
                                            <CustomTextField
                                                label="Image Skill"
                                                name="image"
                                                value={item.image}
                                                onChange={(value) => handleSkillChampion(value, index)}
                                                required
                                                fullWidth
                                            />
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={2} className='flex justify-center'>
                                        <div className='my-auto w-full'>
                                            <CustomTextField
                                                label="Name Skill"
                                                name="name"
                                                value={item.name}
                                                onChange={(value) => handleSkillChampion(value, index)}
                                                required
                                                fullWidth
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={4} className='flex justify-center'>
                                        <div className='my-auto w-full'>
                                            <CustomTextField
                                                multiline
                                                label="Desciption Skill"
                                                name="description"
                                                value={item.description}
                                                onChange={(value) => handleSkillChampion(value, index)}
                                                rows={3}
                                                fullWidth
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )
            case "chibi":
                return (
                    <>
                        <Grid item xs={12} sm={6}>
                            <span className='text-white'>Tier:</span>
                            <CustomListBox
                                value={selectedTier}
                                initial={initialTier}
                                onChange={(value) => handleChangeByCategory(value, 'tier', productData.category)}
                                type={productData.skin.tier}
                                image={productData.skin.imageTier}
                                condition={productId}
                                title={'Skin Tier'}
                                clearOption={(event) => clearOption(event, 'tier', productData.category)}
                            />
                        </Grid>

                        <Grid item xs={6} sm={6} marginTop={3}>
                            <CustomTextField
                                fullWidth
                                label="Champion"
                                value={productData?.chibi?.champion}
                                onChange={(e) => handleChangeByCategory(e.target.value, 'champion', productData.category)}
                                required
                            />
                        </Grid>
                    </>
                )
            default:
                break
        }
    }

    return (
        <Grid container spacing={2}>
            {handleCategory(productData?.category)}
        </Grid>
    )
}

export default CategoryForm