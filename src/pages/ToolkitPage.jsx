import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, useLocation, Link } from 'react-router'
import { Info, Search, Users, ChevronDown } from 'lucide-react'
import toolsData from '../data/tools.json'
import ToolImage from '../components/ui/ToolImage'

export default function Toolkit() {
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState({
        userTargetGroups: ['all']
    })

    // Initialize filters from URL params
    useEffect(() => {
        const newFilters = {
            userTargetGroups: searchParams.get('userTargetGroups')?.split(',') || ['all']
        }
        setFilters(newFilters)
        setSearchQuery(searchParams.get('search') || '')
    }, [searchParams])

    const [showInfo, setShowInfo] = useState({
        userTargetGroups: false,
        banner: true
    })

    // Use validOptions from tools.json as the source of truth
    const options = {
        userTargetGroups: ['all', ...toolsData.validOptions.userTargetGroups]
    }

    const filterLabels = {
        all: 'All',
        userTargetGroups: 'User Target Groups'
    }

    const filterDescriptions = {
        userTargetGroups: 'Indicates the user target groups for which the tool is intended.'
    }

    const highlightText = (text, query) => {
        if (!query) return text;
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase() ?
                <mark key={i} className="bg-yellow-200 px-1 py-0.5 rounded">{part}</mark> :
                part
        );
    };

    const filteredTools = toolsData.tools.filter(tool => {
        // Apply existing filters
        if (!filters.userTargetGroups.includes('all')) {
            const toolUserTargetGroups = Array.isArray(tool.userTargetGroups) ? tool.userTargetGroups : [tool.userTargetGroups];
            if (!toolUserTargetGroups.includes(filters.userTargetGroups[0])) return false;
        }

        // Apply search filter
        if (searchQuery) {
            const searchLower = searchQuery.toLowerCase();
            return (
                tool.name.toLowerCase().includes(searchLower) ||
                tool.summary.toLowerCase().includes(searchLower)
            );
        }

        return true;
    });

    const handleFilterChange = (filterType, value) => {
        let newFilters
        // If clicking on 'all', make it the only selection
        if (value === 'all') {
            newFilters = {
                ...filters,
                [filterType]: ['all']
            }
        }
        // If 'all' is currently selected and clicking on another option, remove 'all'
        else if (filters[filterType].includes('all')) {
            newFilters = {
                ...filters,
                [filterType]: [value]
            }
        }
        // If value is already selected, remove it
        else if (filters[filterType].includes(value)) {
            const newValues = filters[filterType].filter(v => v !== value)
            // If removing the last non-'all' option, default to 'all'
            newFilters = {
                ...filters,
                [filterType]: newValues.length === 0 ? ['all'] : newValues
            }
        }
        // Otherwise, add the value to the selection
        else {
            newFilters = {
                ...filters,
                [filterType]: [...filters[filterType], value]
            }
        }

        setFilters(newFilters)

        // Update URL params
        const newParams = new URLSearchParams(searchParams)
        Object.entries(newFilters).forEach(([key, values]) => {
            if (values.includes('all')) {
                newParams.delete(key)
            } else {
                newParams.set(key, values.join(','))
            }
        })
        setSearchParams(newParams)
    }

    const toggleInfo = (filterType) => {
        setShowInfo(prev => ({
            ...prev,
            [filterType]: !prev[filterType]
        }))
    }

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Update URL params
        const newParams = new URLSearchParams(searchParams);
        if (query) {
            newParams.set('search', query);
        } else {
            newParams.delete('search');
        }
        setSearchParams(newParams);
    };

    const handleMultiSelectChange = (selectedOption) => {
        // Update URL params
        const newParams = new URLSearchParams(searchParams);
        if (selectedOption) {
            newParams.set('userTargetGroups', selectedOption.value);
        } else {
            newParams.delete('userTargetGroups');
        }
        setSearchParams(newParams);

        // Update filters state
        setFilters(prev => ({
            ...prev,
            userTargetGroups: selectedOption ? [selectedOption.value] : ['all']
        }));
    };

    // Add this new constant for select options
    const userTargetGroupOptions = [
        { value: 'all', label: 'All Target Groups' },
        ...toolsData.validOptions.userTargetGroups.map(group => ({
            value: group,
            label: group
        }))
    ];

    return (
        <div>
            {/* Search Input and User Target Groups Dropdown */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search tools by name or description..."
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-seafoam-500 focus:border-seafoam-500"
                    />
                </div>
                <div className="w-full sm:w-1/4 relative">
                    <select
                        value={filters.userTargetGroups[0]}
                        onChange={(e) => handleMultiSelectChange({ value: e.target.value })}
                        className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-seafoam-500 focus:border-seafoam-500 appearance-none bg-white"
                    >
                        {userTargetGroupOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Alert Banner */}
            {showInfo.banner && (
                <div className="mb-6 bg-seafoam-50 border border-seafoam-200 rounded-lg p-4 flex items-start justify-between">
                    <div className="flex items-start">
                        <Info className="w-5 h-5 text-seafoam-600 mt-0.5 mr-3 flex-shrink-0" />
                        <p className="text-sm text-gray-700">
                            <span className="font-medium">Pro tip:</span> Hover over any indicator value to see more details. For example, if a tool is marked as "Multiple", hover to see all the options.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowInfo(prev => ({ ...prev, banner: false }))}
                        className="ml-4 text-gray-400 hover:text-gray-500"
                        aria-label="Dismiss alert"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}


            {/* Tools Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTools.map(tool => (
                    <Link
                        key={tool.number}
                        to={`/tool/${tool.number}`}
                        state={{ from: '/toolkit', search: location.search }}
                        className="group relative overflow-hidden bg-gradient-to-br from-seafoam-50 to-white rounded-xl p-6 border border-seafoam-200 hover:border-seafoam-400 transition-all duration-200 flex flex-col h-full"
                    >
                        <div className="flex-1">
                            <ToolImage
                                toolNumber={tool.number}
                                alt={tool.name}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-display font-bold mb-3">
                                {highlightText(tool.name, searchQuery)}
                            </h3>
                            <p className="text-gray-600">
                                {highlightText(tool.summary, searchQuery)}
                            </p>
                        </div>

                    </Link>
                ))}
            </div>
        </div>
    )
}