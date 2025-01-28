import toolsData from '../data/tools.json'
import { useState } from 'react'
import { Link } from 'react-router'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'

export default function Toolkit() {
    const [filters, setFilters] = useState({
        user: 'all',
        cost: 'all',
        ease: 'all',
        category: 'all',
        maturity: 'all'
    })

    const options = {
        user: ['all', 'Beginner', 'Intermediate', 'Expert', 'All'],
        cost: ['all', 'Free', 'Paid', 'Enterprise'],
        ease: ['all', 'Easy', 'Medium', 'Complex']
    }

    const filterLabels = {
        all: 'All',
        user: 'User Level',
        cost: 'Cost',
        ease: 'Difficulty'
    }

    const filteredTools = toolsData.tools.filter(tool => {
        if (filters.user !== 'all' && tool.user !== filters.user) return false
        if (filters.cost !== 'all' && tool.cost !== filters.cost) return false
        if (filters.ease !== 'all' && tool.ease !== filters.ease) return false
        if (filters.category !== 'all' && tool.category !== filters.category) return false
        if (filters.maturity !== 'all' && tool.maturity !== filters.maturity) return false
        return true
    })

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }))
    }

    return (
        <div>
            <h2 className="text-2xl font-display font-bold mb-4">DSP Toolkit</h2>

            {/* Filter Controls */}
            <div className="mb-6 space-x-4 flex">
                {Object.entries(options).map(([filterType, filterOptions]) => (
                    <div key={filterType} className="w-72">
                        <Listbox value={filters[filterType]} onChange={(value) => handleFilterChange(filterType, value)}>
                            <div className="relative">
                                <ListboxButton className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-seafoam-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-seafoam-300 sm:text-sm">
                                    <span className="block truncate">
                                        {filterLabels[filterType]}: {filterLabels[filters[filterType]] || filters[filterType]}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                </ListboxButton>
                                <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                                    {filterOptions.map((option) => (
                                        <ListboxOption
                                            key={option}
                                            value={option}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-seafoam-100 text-seafoam-900' : 'text-gray-900'
                                                }`
                                            }
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                        {filterLabels[option] || option}
                                                    </span>
                                                    {selected ? (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-seafoam-600">
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </ListboxOption>
                                    ))}
                                </ListboxOptions>
                            </div>
                        </Listbox>
                    </div>
                ))}
            </div>

            {/* Tools Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTools.map(tool => (
                    <div
                        key={tool.number}
                        className="bg-white rounded-lg shadow p-6 transition-all duration-200 ease-in-out hover:shadow-lg transform hover:-translate-y-1"
                    >
                        <h3 className="text-xl font-display font-bold mb-3">{tool.name}</h3>
                        <p className="text-gray-600 mb-4">{tool.description}</p>
                        <div className="space-y-2 mb-4">
                            <div className="flex gap-2">
                                <span className="text-seafoam-600">User Level:</span>
                                <span>{tool.user}</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-seafoam-600">Cost:</span>
                                <span>{tool.cost}</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-seafoam-600">Ease:</span>
                                <span>{tool.ease}</span>
                            </div>
                        </div>
                        <Link
                            to={`/toolkit/${tool.number}`}
                            className="bg-seafoam-600 text-white px-4 py-2 rounded hover:bg-seafoam-700 transition-colors duration-200 inline-block"
                        >
                            Learn More
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
} 