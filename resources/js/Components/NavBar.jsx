import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const navigation = [
    { name: 'My Shelf', href: '#', current: true },
    { name: 'New and Trending', href: '#', current: false },
    // { name: 'Projects', href: '#', current: false },
    // { name: 'Calendar', href: '#', current: false },
]

const userNavigation = [
    { name: 'Your Profile', href: '/profile' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '/logout', method: 'post' }, // Sign out link
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavBar({ user }) {
    const handleLogout = (event) => {
        event.preventDefault();
        document.getElementById('logout-form').submit();
    };

    console.log(user.profile_photo);

    return (
        <Disclosure as="nav" className="bg-gray-800 fixed top-0 w-full z-50">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8">
                        <div className="relative flex h-16 justify-between">
                            <div className="relative z-10 flex px-2 lg:px-0">
                                <div className="flex flex-shrink-0 items-center">
                                    <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg"
                                         xmlnsXlink="http://www.w3.org/1999/xlink"
                                         viewBox="0 0 512 512" xmlSpace="preserve" height={50} width={50}
                                         className={'fill-current text-purple-500 mb-3'}>
                                        <g>
                                            <rect x="36.823" y="215.559" className="st0" fill="currentColor"
                                                  width="73.646"
                                                  height="18.412"/>
                                            <rect x="36.823" y="141.912" className="st0" fill="currentColor"
                                                  width="73.646"
                                                  height="36.823"/>
                                            <rect x="165.704" y="215.559" className="st0" fill="currentColor"
                                                  width="73.646"
                                                  height="18.412"/>
                                            <rect x="165.704" y="141.912" className="st0" fill="currentColor"
                                                  width="73.646"
                                                  height="36.823"/>
                                            <path className="st0" fill="currentColor" d="M510.067,401.059L403.032,66.108c-5.512-17.206-21.41-28.193-38.577-28.193c-4.081,0-8.244,0.63-12.325,1.933
                                                l-0.023,0.008l-63.114,20.156c-5.853,1.879-10.91,5.026-15.135,8.945c-5.434-15.976-20.389-27.536-38.203-27.546h-66.256
                                                c-12.694,0.009-23.882,5.96-31.312,15.094c-7.43-9.134-18.619-15.085-31.312-15.094H40.518C18.137,41.422,0.005,59.545,0,81.931
                                                v351.635c0.005,22.386,18.137,40.509,40.518,40.518h66.256c12.694-0.009,23.882-5.961,31.312-15.094
                                                c7.43,9.134,18.619,15.085,31.312,15.094h66.256c22.381-0.009,40.514-18.132,40.518-40.518V153.015l93.591,292.887
                                                c5.52,17.206,21.419,28.192,38.59,28.183c4.09,0,8.262-0.63,12.334-1.924l63.119-20.174c17.207-5.51,28.202-21.405,28.193-38.576
                                                C512,409.312,511.38,405.14,510.067,401.059z M128.881,433.566c-0.022,12.209-9.903,22.08-22.107,22.107H40.518
                                                c-12.204-0.026-22.085-9.898-22.107-22.107V81.931c0.022-12.208,9.903-22.089,22.107-22.107h66.256
                                                c12.204,0.018,22.084,9.898,22.107,22.107V433.566z M257.762,433.566c-0.022,12.209-9.903,22.08-22.107,22.107h-66.256
                                                c-12.204-0.026-22.084-9.898-22.106-22.107V81.931c0.022-12.208,9.902-22.089,22.106-22.107h66.256
                                                c12.204,0.018,22.085,9.898,22.107,22.107V433.566z M478.197,434.457l-63.11,20.164c-2.256,0.72-4.513,1.052-6.733,1.052
                                                c-9.34-0.009-18.061-5.987-21.055-15.382L280.268,105.341c-0.724-2.256-1.056-4.513-1.056-6.733
                                                c0.005-9.341,5.988-18.061,15.386-21.054l63.11-20.166h0.009c2.252-0.719,4.509-1.06,6.738-1.06
                                                c9.337,0.009,18.052,5.988,21.046,15.391l107.035,334.95c0.72,2.257,1.052,4.513,1.052,6.743
                                                C493.579,422.742,487.601,431.463,478.197,434.457z"/>
                                            <path className="st0" fill="currentColor"
                                                  d="M352.099,39.857c0.013,0,0.022,0,0.031-0.008l1.061-0.342L352.099,39.857z"/>
                                            <polygon className="st0" fill="currentColor"
                                                     points="338.484,227.03 344.085,244.561 414.242,222.148 408.633,204.608 	"/>
                                            <polygon className="st0" fill="currentColor"
                                                     points="386.211,134.459 316.062,156.872 327.273,191.951 397.422,169.53 	"/>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div
                                className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
                                <div className="w-full sm:max-w-xs">
                                    <label htmlFor="search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative">
                                        <div
                                            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                        </div>
                                        <input
                                            id="search"
                                            name="search"
                                            className="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                                            placeholder="Search"
                                            type="search"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="relative z-10 flex items-center lg:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button
                                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5"/>
                                    <span className="sr-only">Open menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                                <button
                                    type="button"
                                    className="relative flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="absolute -inset-1.5"/>
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-4 flex-shrink-0">
                                    <div>
                                        <Menu.Button
                                            className="relative flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5"/>
                                            <span className="sr-only">Open user menu</span>
                                            {user.profile_photo && (
                                                <img className="h-8 w-8 rounded-full"
                                                     src={user.profile_photo} alt=""/>
                                            )}
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
                                            {userNavigation.map((item) =>
                                                item.method === 'post' ? (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <a
                                                                href={item.href}
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                onClick={handleLogout}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ) : (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <a
                                                                href={item.href}
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                )
                                            )}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                        <nav className="hidden lg:flex lg:space-x-8 lg:py-2" aria-label="Global">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium',
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                        <div className="border-t border-gray-700 pb-3 pt-4">
                            <div className="flex items-center px-4">
                                <div className="flex-shrink-0">
                                    {user.profile_photo && (
                                        <img className="h-10 w-10 rounded-full" src={user.profile_photo} alt="" />
                                    )}
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-white">{user.name}</div>
                                    <div className="text-sm font-medium text-gray-400">{user.email}</div>
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
                                {userNavigation.map((item) =>
                                    item.method === 'post' ? (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                            onClick={handleLogout}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ) : (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    )
                                )}
                            </div>
                        </div>
                    </Disclosure.Panel>
                    <form id="logout-form" action="/logout" method="POST" className="hidden">
                        <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />
                    </form>
                </>
            )}
        </Disclosure>
    )
}
