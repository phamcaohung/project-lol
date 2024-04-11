import { Fragment, useEffect } from 'react'
import { Transition, Disclosure, Menu } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, BellIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { navigation } from './navigationData'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, logout } from '../../state/auth/Action'
import { Avatar } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MainCarousel from '../carousel/MainCarousel'


const userNavigation = [
  { name: 'Profile' },
  { name: 'My Order' },
  { name: 'Sign Out' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
  const navigate = useNavigate()
  const jwt = localStorage.getItem("jwt")
  const { auth } = useSelector(store => store)
  const dispatch = useDispatch()

  const handleAction = (action) => {
    switch (action) {
      case 'My Order':
        navigate("/account/order")
        break
      case 'Sign Out':
        console.log("start");
        dispatch(logout(navigate))
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (jwt)
      dispatch(getUser())
  }, [jwt, auth.jwt, dispatch])


  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[6rem]">
              <div className="flex h-full items-center justify-between">
                <div className="flex items-center justify-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12"
                      src='https://i.pinimg.com/originals/d1/b1/1d/d1b11d5e4dbae547ac0d651476cec488.png'
                      alt="Your Company"
                    />
                  </div>

                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.pages.map((item) => (
                        <Link
                          key={item.name}
                          to={item.id}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-xl font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-4">
                      <div>
                        <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          {/* <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" /> */}
                          <Avatar
                            className='text-white'
                            sx={{
                              bgcolor: deepPurple[500],
                              color: 'white',
                              cursor: 'pointer'
                            }}
                          >
                            {auth.user?.firstName[0].toUpperCase()}
                          </Avatar>

                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  href=''
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-xl text-gray-700'
                                  )}
                                  onClick={() => handleAction(item.name)}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>

                    <button
                      onClick={() => navigate('/cart')}
                      type="button"
                      className="ml-4 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <ShoppingCartIcon
                        aria-hidden="true"
                        fontSize='large'
                      />
                    </button>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.pages.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Avatar
                      className='text-white'
                      sx={{
                        bgcolor: deepPurple[500],
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      {auth.user?.firstName[0].toUpperCase()}
                    </Avatar>
                    {/* <img className="h-10 w-10 rounded-full" src={auth.user?.imageUrl} alt="" /> */}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">{auth.user?.name}</div>
                    <div className="text-sm font-medium leading-none text-gray-400">{auth.user?.email}</div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}
