import { useEffect, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import ProductCard from './ProductCard'
import { filters, singleFilter, sortOptions } from './FilterData'
import { FormControlLabel, FormLabel, Pagination, TextField, Grid, Autocomplete, FormGroup, Checkbox, FormControl } from "@mui/material"
import FilterListIcon from '@mui/icons-material/FilterList';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findProducts, getAllSeriesName } from '../../state/product/Action'



export default function Product() {
  const [checked, setChecked] = useState(false)
  const [name, setName] = useState("")
  const location = useLocation()
  const navigate = useNavigate()
  const param = useParams()
  const dispatch = useDispatch()
  const { products, loading } = useSelector(store => store.products)
  const { series } = useSelector(store => store.series)


  const decodedQueryString = decodeURIComponent(location.search)
  const searchParams = new URLSearchParams(decodedQueryString)
  const seriesValue = searchParams.get('series')
  const tierValue = searchParams.get('tier')
  const priceValue = searchParams.get('price')
  const disccount = searchParams.get('disccount')
  const sortValue = searchParams.get('sort')
  const stock = searchParams.get('stock')
  const pageNumber = searchParams.get('page') || 1


  const handleFilter = (value, sectionId) => {

    const searchParams = new URLSearchParams(location.search)

    let filterValue = searchParams.getAll(sectionId)

    if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
      filterValue = filterValue[0].split(",").filter((item) => item !== value)

      if (filterValue.length === 0)
        searchParams.delete(sectionId)
    }
    else {
      filterValue.push(value)
    }

    if (filterValue.length > 0) {
      searchParams.set(sectionId, filterValue.join(","))
    }

    const query = searchParams.toString()
    navigate({ search: `?${query}` })
  }

  const handleCheckBoxFilterChange = (e, sectionId) => {
    setChecked(!checked)
    const searchParams = new URLSearchParams(location.search)
    searchParams.set(sectionId, checked ? "" : e.target.value)
    if (searchParams.get("sort") === "")
      searchParams.delete("sort")
    const query = searchParams.toString()
    navigate({ search: `${query}` })
  }


  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set("page", value)
    const query = searchParams.toString()
    navigate({ search: `?${query}` })
  }

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeSeriesName = (e, value) => {
    const searchParams = new URLSearchParams(location.search)
    if (searchParams.get("page") > 1) {
          searchParams.set("page", 1)
    }
          
    searchParams.set("series", value || "")
    if (searchParams.get("series") === "")
          searchParams.delete("series")
    const query = searchParams.toString()
    navigate({ search: `?${query}` })
  }

  useEffect(() => {
    dispatch(getAllSeriesName(param.category))
  }, [dispatch, param.category])

  useEffect(() => {
    const [minPrice, maxPrice] = priceValue === null ? [0, 100000] : priceValue.split("-").map(Number)

    const data = {
      category: param.category,
      tier: tierValue || [],
      minPrice,
      maxPrice,
      minDiscount: disccount || 0,
      sort: sortValue || "",
      pageNumber: pageNumber - 1,
      pageSize: 8,
      stock: stock,
      name: name,
      series: seriesValue || ""
    }

    dispatch(findProducts(data))

  }, [param.category, tierValue, priceValue, disccount, sortValue, pageNumber, stock, name, seriesValue, dispatch])

  return (
    <div className="bg-white mt-10">
      <div>
        <main className="mx-auto px-4 sm:px-6 lg:px-20">
          <Grid container spacing={5} className="flex border-b border-gray-200 pb-6 pt-24">
            <Grid item xs={3}>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>
            </Grid>

            <Grid item xs={9} container spacing={3}>
              <Grid item xs={3}>
                <TextField
                  id="standard-basic"
                  label="Name Skin"
                  variant="outlined"
                  onChange={handleChangeName}
                  value={name}
                  fullWidth
                />
              </Grid>

              <Grid item xs={3}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={series}
                  renderInput={(params) => <TextField {...params} label="Name Series" />}
                  fullWidth
                  onChange={handleChangeSeriesName}
                />
              </Grid>

              <Grid item xs={6} className='flex justify-end'>
                <FormGroup row>
                  {sortOptions.map((option, optionIdx) => (
                    <FormControlLabel
                      key={optionIdx}
                      control={<Checkbox />}
                      label={option.name}
                      value={option.value}
                      onChange={(e) => handleCheckBoxFilterChange(e, option.id)}
                    />
                  ))}
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>

          <section aria-labelledby="products-heading" className="pb-10 pt-5">
            <Grid container spacing={5}>
              <Grid item xs={3}>
                <div className='py-10 flex justify-between items-center'>
                  <h2 className='font-semibold text-lg opacity-50'>Filters</h2>
                  <FilterListIcon />
                </div>

                <form className="hidden lg:block">
                  {filters.map((section) => (
                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex justify-between">
                                  <input
                                    onChange={() => handleFilter(option.value, section.id)}
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />

                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>

                                  <img
                                    src={option.image}
                                    alt=""
                                    className='order-last -mt-2'
                                  />
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}

                  {singleFilter.map((section) => (
                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <FormLabel sx={{ color: "black" }} className='text-gray-900' id="demo-radio-buttons-group-label">{section.name}</FormLabel>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              <FormControl>
                                <FormGroup
                                  aria-labelledby="demo-radio-buttons-group-label"
                                  defaultValue="female"
                                  name="radio-buttons-group"
                                >
                                  {section.options.map((option, optionIdx) => (
                                    <div className='flex justify-between'>
                                      <FormControlLabel
                                        key={optionIdx}
                                        control={<Checkbox />}
                                        label={option.name}
                                        value={option.value}
                                        onChange={(e) => handleCheckBoxFilterChange(e, option.id)}
                                      />
                                    </div>
                                  ))}
                                </FormGroup>
                              </FormControl>
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Grid>

              <Grid item xs={9}>
                <div className='flex flex-wrap justify-center py-5'>
                  <Grid container spacing={3}>
                    {products && products?.content?.map((item) => (
                      <Grid item xs={3} key={item.id}>
                        <ProductCard product={item} loading={loading} />
                      </Grid>
                    ))}
                  </Grid>
                </div>

                <div className='px-4 py-4 flex justify-center'>
                  <Pagination
                    count={products?.totalPages}
                    color='secondary'
                    defaultPage={pageNumber}
                    onChange={handlePaginationChange}
                  />
                </div>
              </Grid>
            </Grid>
          </section>
        </main>
      </div>
    </div>
  )
}
