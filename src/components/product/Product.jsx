import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { initialTier, initialRole, initialRegion, initialSort, singleFilter } from '../../refactor/FilterData.js'
import { findProducts, getAllSeriesSkin } from '../../state/product/Action.js'
import FilterByCategory from '../../admin/components/FilterByCategory.jsx'
import { FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Pagination, Radio, RadioGroup, Select } from '@mui/material'
import { Disclosure, Listbox, Transition } from '@headlessui/react'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ProductCard from './ProductCard.jsx'
import { CustomFormControl, CustomTextField } from '../../refactor/CustomStyle.jsx'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Product = () => {
    const [page, setPage] = useState(1)
    const [selectedTier, setSelectedTier] = useState(initialTier[0])
    const [selectedRegion, setSelectedRegion] = useState(initialRegion[0])
    const [selectedRole, setSelectedRole] = useState(initialRole[0])
    const [selectedSort, setSelectedSort] = useState(initialSort[6])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const { products } = useSelector(store => store.products)
    const { deletedProduct } = useSelector(store => store.deletedProduct)
    const { series } = useSelector(store => store.series)
    const decodedQueryString = decodeURIComponent(location.search)
    const searchParams = new URLSearchParams(decodedQueryString)
    const pageNumber = searchParams.get('page')
    const group = searchParams.get('series')
    const region = searchParams.get('region')
    const role = searchParams.get('role')
    const champion = searchParams.get('champion')
    const chibiTier = searchParams.get('chibiTier')
    const skinTier = searchParams.get('skinTier')
    const param = useParams()

    const [dataSearch, setDataSearch] = useState({
      category: param.category,
      minPrice: 0,
      maxPrice: 9999,
      minDiscount: 0,
      sort: selectedSort.value,
      pageNumber: 0,
      pageSize: 8,
      stock: "",
      title: "",
      skin: {
        series: "",
        tier: ""
      },
      champion: {
        region: "",
        role: ""
      },
      chibi: {
        champion: "",
        tier: ""
      }
    })

    const handlePaginationChange = (event, value) => {
      setDataSearch((prevData) => ({
        ...prevData,
        pageNumber: value - 1
      }))
      setPage(value)
      const searchParams = new URLSearchParams(location.search)
      searchParams.set("page", value)
      const query = searchParams.toString()
      navigate({ search: `?${query}` })
    }

    const handleChange = (value, type) => {
      if (type === 'category') {
        setDataSearch((prevData) => ({
          ...prevData,
          skin: {
            tier: "",
            series: ""
          },
          champion: {
            region: "",
            role: ""
          },
          chibi: {
            tier: "",
            champion: ""
          }
        }))
      }
      if (type === 'sort') setSelectedSort(value)
      setDataSearch((prevData) => ({
        ...prevData,
        [type]: type === 'sort' ? value.value : value
      }))
    }


    const handleChangeByCategory = (value, type, category) => {
      const typeMapping = {
        tier: { tier: value ? value.name : '' },
        series: { series: value ? value : '' },
        champion: { champion: value ? value : '' },
        region: { region: value ? value.name : '' },
        role: { role: value ? value.name : '' }
      };
      
      if (type === 'tier') setSelectedTier(value)
      if (type === 'region') setSelectedRegion(value)
      if (type === 'role') setSelectedRole(value) 
      
      setDataSearch((prevData) => ({
        ...prevData,
        [category]: {
          ...prevData[category],
          ...typeMapping[type]
        }
      }));
    }

    const clearOption = (event, type, category) => {
      event.stopPropagation()
      setDataSearch((prevData) => ({
        ...prevData,
        [category]: {
          ...prevData[category],
          [type]: ""
        }
      }))
    }

    const handleChangePrice = (e) => {
        const priceSplit = e.target.value.split("-")
        setDataSearch((prevData) => ({
            ...prevData,
            minPrice: parseInt(priceSplit[0], 10),
            maxPrice: parseInt(priceSplit[1], 10)
        }))
    }

    useEffect(() => {
      if (dataSearch.title || dataSearch.skin || dataSearch.chibi || dataSearch.champion || dataSearch.category) {
        searchParams.delete("page")
        window.history.replaceState(null, "", `?${searchParams.toString()}`)
        console.log("start delete");
        setDataSearch((prevData) => ({
          ...prevData,
          pageNumber: 0
        }))
        setPage(1)
      }
    }, [
      dataSearch.title, dataSearch.skin, dataSearch.chibi, dataSearch.champion, 
      dataSearch.minPrice, dataSearch.maxPrice, dataSearch.sort, dispatch
    ])

    useEffect(() => {
      setDataSearch((prevData) => ({
        ...prevData,
        category: param.category,
        skin: {
          tier: skinTier || "",
          series: group || ""
        },
        champion: {
          region: region || "",
          role: role || ""
        },
        chibi: {
          tier: chibiTier || "",
          champion: champion || ""
        }
      }))
    }, [dispatch, param.category])

    useEffect(() => {
      if (dataSearch.category)
        dispatch(getAllSeriesSkin(dataSearch.category))
    }, [dispatch, dataSearch.category])

    useEffect(() => {
      console.log(dataSearch);
      const timer = setTimeout(() => {
        dispatch(findProducts(dataSearch))
      }, 100)
      return () => clearTimeout(timer)
    }, [deletedProduct, pageNumber, dataSearch, dispatch, param.category])
    
    return (
      <div className='bg-[#111827] px-12'>
        <Grid container spacing={2} className='border-b border-gray-300 pb-10 pt-24'>
          <Grid item xs={12} sm={3} className='flex justify-center'>
            <span className='my-auto'>
              <h1 className='text-4xl font-bold text-white'>New Arrivals</h1>
            </span>
          </Grid>

          <Grid item xs={12} sm={9}>
            <Grid container>
              <Grid item xs={12} sm={3} className="flex justify-center">
                <CustomFormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={dataSearch.category}
                    onChange={(e) => handleChange(e.target.value, 'category')}
                    label="Category"
                    required
                  >
                    <MenuItem value="skin">Skin</MenuItem>
                    <MenuItem value="champion">Champion</MenuItem>
                    <MenuItem value="chibi">Chibi</MenuItem>
                  </Select>
                </CustomFormControl>
              </Grid>

              <Grid item xs={12} sm={3} className="flex justify-center">
                <CustomTextField
                  label="Title"
                  variant="outlined"
                  onChange={(e) => handleChange(e.target.value, 'title')}
                  value={dataSearch.title}
                  className="w-72"
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Listbox
                  value={selectedSort}
                  onChange={(value) => handleChange(value, 'sort')}
                  className="h-full"
                >
                  {({ open }) => (
                    <>
                      <div className="relative h-full">
                        <Listbox.Button
                          className="h-14 relative w-full cursor-default rounded-md py-1.5 pl-2 
                                                text-left text-white border shadow-sm 
                                                sm:text-sm sm:leading-6"
                        >
                          <span className="ml-3 block truncate text-base font-semibold">
                            {selectedSort.name}
                          </span>
                          <span
                            className='absolute inset-y-0 right-0 flex items-center pr-9'
                          >
                            {selectedSort.id % 2 === 0
                              ? <ArrowUpwardIcon />
                              : <ArrowDownwardIcon />
                            }
                          </span>
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
                            {initialSort.map((person) => (
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
                                    <span className='ml-3 block truncate text-base'>
                                      {person.name}
                                    </span>
                                    <span
                                      className={classNames(
                                        active && 'bg-[#111827] text-white',
                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                      )}
                                    >
                                      {person.id % 2 === 0
                                        ? <ArrowUpwardIcon />
                                        : <ArrowDownwardIcon />
                                      }
                                    </span>
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
            </Grid>

            <FilterByCategory
              dataSearch={dataSearch}
              handleChangeByCategory={handleChangeByCategory}
              clearOption={clearOption}
              series={series}
              initialTier={initialTier}
              initialRole={initialRole}
              initialRegion={initialRegion}
              selectedTier={selectedTier}
              selectedRole={selectedRole}
              selectedRegion={selectedRegion}
            />
          </Grid>
        </Grid>

        <Grid container columnSpacing={5}>
          <Grid item xs={12} sm={3}>
            <div className='flex justify-between pt-10'>
              <h2 className='font-semibold text-xl text-white'>Filters</h2>
              <FilterListIcon sx={{ fontSize: "35px" }} color='error' />
            </div>

            <div className='mt-7'>
              {singleFilter.map((items, index) => (
                <Disclosure key={index}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="py-2 w-full flex justify-between mt-5">
                        <h2 className='font-semibold text-xl text-gray-300'>
                          {items.name}
                        </h2>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <RemoveIcon sx={{ fontSize: "35px" }} color='error' />
                          ) : (
                            <AddIcon sx={{ fontSize: "25px" }} color='error' />
                          )}
                        </span>
                      </Disclosure.Button>
                      <Disclosure.Panel className="text-gray-500">
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                          >
                            {items.options.map((item, index) => (
                              <FormControlLabel
                                key={index}
                                value={item.value}
                                control={<Radio sx={{
                                  color: "white",
                                }} color='error' />}
                                label={item.label}
                                className='text-gray-100 font-semibold'
                                sx={{
                                  "& .MuiFormControlLabel-label": {
                                    paddingLeft: "10px"
                                  },
                                }}
                                onChange={handleChangePrice}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}

            </div>
          </Grid>

          <Grid item xs={12} sm={9}>
            <Grid container spacing={3}>
              {products && products?.content?.map((item) => (
                <Grid item xs={3} key={item.id}>
                  <ProductCard product={item} />
                </Grid>
              ))}
            </Grid>

            <div className='flex justify-center pt-20 pb-10'>
              <Pagination
                count={products?.totalPages}
                page={page}
                color='error'
                onChange={handlePaginationChange}
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: "white"
                  }
                }}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    )
}

export default Product
