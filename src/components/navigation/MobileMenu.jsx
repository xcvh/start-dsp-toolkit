import { DisclosureButton, DisclosurePanel } from '@headlessui/react'
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

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function MobileMenu({ navigation }) {
    return (
        <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                {navigation.map((item) => (
                    <DisclosureButton
                        key={item.name}
                        as={Link}
                        to={item.to}
                        className={({ isActive }) =>
                            classNames(
                                isActive ? 'bg-seafoam-900 text-white' : 'text-seafoam-300 hover:bg-seafoam-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium'
                            )
                        }
                    >
                        {item.name}
                    </DisclosureButton>
                ))}
            </div>
            <div className="border-t border-seafoam-700 pt-4 pb-3">
                <div className="flex items-center px-5">
                    <div className="shrink-0">
                        <img alt="" src={user.imageUrl} className="size-10 rounded-full" />
                    </div>
                    <div className="ml-3">
                        <div className="text-base/5 font-medium text-white">{user.name}</div>
                        <div className="text-sm font-medium text-seafoam-400">{user.email}</div>
                    </div>
                    <button
                        type="button"
                        className="relative ml-auto shrink-0 rounded-full bg-seafoam-800 p-1 text-seafoam-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-seafoam-800 focus:outline-hidden"
                    >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as={Link}
                            to={item.to}
                            className="block rounded-md px-3 py-2 text-base font-medium text-seafoam-400 hover:bg-seafoam-700 hover:text-white"
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </div>
        </DisclosurePanel>
    )
} 