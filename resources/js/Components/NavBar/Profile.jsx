import {BellIcon} from "@heroicons/react/24/outline/index.js";
import {Menu, Transition} from "@headlessui/react";
import { Fragment } from 'react'

const userNavigation = [
    { name: 'Your Profile', href: '/profile' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '/logout', method: 'post' }, // Sign out link
]

export default function Profile({user}) {
    return (
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
                                 src={`/storage/${user.profile_photo}`} alt=""/>
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
                    <Menu.Items
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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



    )
}
