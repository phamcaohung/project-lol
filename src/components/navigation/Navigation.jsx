import { Fragment, useEffect, useState } from 'react'
import { Dialog, Popover, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLocation, useNavigate } from 'react-router-dom'
import { navigation } from './navigationData'
import AuthModal from '../../auth/AuthModal'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, logout } from '../../state/auth/Action'
import { Avatar, Button, Menu, MenuItem } from '@mui/material'
import { deepPurple } from '@mui/material/colors'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const openUserMenu = Boolean(anchorEl)
  const jwt = localStorage.getItem("jwt")
  const { auth } = useSelector(store => store)
  const dispatch = useDispatch()
  const location = useLocation()

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  
  const handleCloseUserMenu = (event) => {
    setAnchorEl(null)
  }

  const handleOpen = () => {
    setOpenAuthModal(true)
  }

  const handleClose = () => {
    setOpenAuthModal(false)
  }


  const handleCategoryClick = (url) => {
    navigate(`${url}`)
  }

  useEffect(() => {
    if(jwt)
      dispatch(getUser(jwt))
  }, [jwt, auth.jwt])  

  useEffect(() => {
    if(auth.user)
      handleClose()
    if(location.pathname === "/login" || location.pathname === "/register")
      navigate(-1)
  }, [auth.user])

  const handleLogout = () => {
    dispatch(logout())
    handleCloseUserMenu()
  }

  return (
    <div className="bg-white">
      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center px-11">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">

                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-8 mr-2"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Showwithzosh"
                  />

              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                    {navigation.pages.map((page) => (
                      <a
                        href=''
                        key={page.name}
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                        onClick={() => handleCategoryClick(page.id)}
                      >
                        {page.name}
                      </a>
                    ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    { 
                      auth.user?.firstName ? (
                          <div>
                              <Avatar
                                className='text-white'
                                onClick={handleUserClick}
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                sx={{
                                  bgcolor: deepPurple[500],
                                  color: 'white',
                                  cursor: 'pointer'
                                }}
                              > 
                                {auth.user?.firstName[0].toUpperCase()}
                              </Avatar>

                              <Menu
                                id='basic-menu'
                                anchorEl={anchorEl}
                                open={openUserMenu}
                                onClose={handleCloseUserMenu}
                                MenuListProps={{
                                  "aria-labelledby": "basic-button"
                                }}
                              >
                                  <MenuItem onClick={handleCloseUserMenu}>
                                      Profile
                                  </MenuItem>

                                  <MenuItem onClick={() => navigate("/account/order")}>
                                      My Orders
                                  </MenuItem>

                                  <MenuItem onClick={handleLogout}>
                                      Logout
                                  </MenuItem>
                              </Menu>
                          </div>
                      ) : (
                          <Button
                            onClick={handleOpen}
                            className='text-sm font-medium text-gray-700 hover:text-gray-800'
                          > 
                              Signin
                          </Button>
                      )

                    }
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Button className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                      onClick={() => navigate('/cart')}
                    />
                    {/* <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        0
                    </span> */}
                    <span className="sr-only">items in cart, view bag</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal handleClose={handleClose} open={openAuthModal}/>
    </div>
  )
}
