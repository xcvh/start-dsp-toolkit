import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router'

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const userNavigation = [
    { name: 'Your Profile', to: '/profile' },
    { name: 'Settings', to: '/settings' },
    { name: 'Sign out', to: '/signout' },
]

export default function UserMenu() {
    return (
        <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
                <button
                    type="button"
                    className="relative rounded-full bg-seafoam-800 p-1 text-seafoam-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-seafoam-800 focus:outline-hidden"
                >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                </button>

                <Menu as="div" className="relative ml-3">
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-seafoam-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-seafoam-800 focus:outline-hidden">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img alt="" src={user.imageUrl} className="size-8 rounded-full" />
                    </MenuButton>
                    <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                        {userNavigation.map((item) => (
                            <MenuItem key={item.name}>
                                {({ active }) => (
                                    <Link
                                        to={item.to}
                                        className={`block px-4 py-2 text-sm text-seafoam-700 ${active ? 'bg-seafoam-100' : ''
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </MenuItem>
                        ))}
                    </MenuItems>
                </Menu>
            </div>
        </div>
    )
} 