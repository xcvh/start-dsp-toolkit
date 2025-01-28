import toolsData from '../data/tools.json'
import { useState } from 'react'
import { Link } from 'react-router'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'
import { Gauge, Zap, Target, GraduationCap } from 'lucide-react'

export default function Toolkit() {
    const [filters, setFilters] = useState({
        ease: ['all'],
        impact: ['all'],
        type: ['all'],
        maturity: ['all']
    })

    // Use validOptions from tools.json as the source of truth
    const options = {
        ease: ['all', ...toolsData.validOptions.ease],
        impact: ['all', ...toolsData.validOptions.impact],
        type: ['all', ...toolsData.validOptions.type],
        maturity: ['all', ...toolsData.validOptions.maturity]
    }

    const filterLabels = {
        all: 'All',
        ease: 'Ease of Implementation',
        impact: 'Level of Impact',
        type: 'Type',
        maturity: 'Maturity Level'
    }

    const filteredTools = toolsData.tools.filter(tool => {
        if (!filters.ease.includes('all') && !filters.ease.includes(tool.ease)) return false
        if (!filters.impact.includes('all') && !filters.impact.includes(tool.impact)) return false
        if (!filters.type.includes('all') && !filters.type.includes(tool.type)) return false
        if (!filters.maturity.includes('all') && !filters.maturity.includes(tool.maturity)) return false
        return true
    })

    const handleFilterChange = (filterType, values) => {
        // If "all" is being added, make it the only selection
        if (!filters[filterType].includes('all') && values.includes('all')) {
            setFilters(prev => ({
                ...prev,
                [filterType]: ['all']
            }))
            return
        }

        // If a non-"all" option is being added and "all" is currently selected,
        // remove "all" from the selection
        if (filters[filterType].includes('all') && values.length > 1) {
            values = values.filter(v => v !== 'all')
        }

        // If no options are selected, default to "all"
        if (values.length === 0) {
            values = ['all']
        }

        setFilters(prev => ({
            ...prev,
            [filterType]: values
        }))
    }

    return (
        <div>
            <h2 className="text-2xl font-display font-bold mb-4">DSP Toolkit</h2>

            {/* Filter Controls */}
            <div className="mb-6 space-x-4 flex">
                {Object.entries(options).map(([filterType, filterOptions]) => (
                    <div key={filterType} className="w-72">
                        <Listbox
                            value={filters[filterType]}
                            onChange={(values) => handleFilterChange(filterType, values)}
                            multiple
                        >
                            <div className="relative">
                                <ListboxButton className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-seafoam-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-seafoam-300 sm:text-sm">
                                    <span className="block truncate">
                                        {filterLabels[filterType]}: {
                                            filters[filterType].length === 1 && filters[filterType][0] === 'all'
                                                ? 'All'
                                                : filters[filterType].map(f => filterLabels[f] || f).join(', ')
                                        }
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
                                            className={({ active, selected }) =>
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
                    <Link
                        key={tool.number}
                        to={`/toolkit/${tool.number}`}
                        className="block bg-white rounded-lg shadow p-6 transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-seafoam-50 h-full flex flex-col"
                    >
                        <div className="flex-1">
                            <img
                                src={tool.image}
                                alt={tool.name}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-display font-bold mb-3">{tool.name}</h3>
                            <p className="text-gray-600">{tool.summary}</p>
                        </div>

                        {/* Filterable Attributes */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mt-4">
                            <div className="flex items-center">
                                <Gauge className="w-4 h-4 text-seafoam-600 mr-1" />
                                <span className="text-seafoam-600 font-medium">Ease:</span>
                                <span className="ml-2 px-2 py-1 bg-seafoam-50 rounded">{tool.ease}</span>
                            </div>
                            <div className="flex items-center">
                                <Zap className="w-4 h-4 text-seafoam-600 mr-1" />
                                <span className="text-seafoam-600 font-medium">Impact:</span>
                                <span className="ml-2 px-2 py-1 bg-seafoam-50 rounded">{tool.impact}</span>
                            </div>
                            <div className="flex items-center">
                                <Target className="w-4 h-4 text-seafoam-600 mr-1" />
                                <span className="text-seafoam-600 font-medium">Type:</span>
                                <span className="ml-2 px-2 py-1 bg-seafoam-50 rounded">{tool.type}</span>
                            </div>
                            <div className="flex items-center">
                                <GraduationCap className="w-4 h-4 text-seafoam-600 mr-1" />
                                <span className="text-seafoam-600 font-medium">Maturity:</span>
                                <span className="ml-2 px-2 py-1 bg-seafoam-50 rounded">{tool.maturity}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
} 