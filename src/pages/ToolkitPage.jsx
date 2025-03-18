import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, useLocation, Link } from 'react-router'
import { Info, CheckIcon, Gauge, Zap, Target, GraduationCap, Search, Users, ChevronDown } from 'lucide-react'
import toolsData from '../data/tools.json'
import ToolImage from '../components/ui/ToolImage'

export default function Toolkit() {
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState({
        ease: ['all'],
        type: ['all'],
        maturity: ['all'],
        userTargetGroups: ['all']
    })

    // Initialize filters from URL params
    useEffect(() => {
        const newFilters = {
            ease: searchParams.get('ease')?.split(',') || ['all'],
            type: searchParams.get('type')?.split(',') || ['all'],
            maturity: searchParams.get('maturity')?.split(',') || ['all'],
            userTargetGroups: searchParams.get('userTargetGroups')?.split(',') || ['all']
        }
        setFilters(newFilters)
        setSearchQuery(searchParams.get('search') || '')
    }, [searchParams])

    const [showInfo, setShowInfo] = useState({
        ease: false,
        type: false,
        maturity: false,
        userTargetGroups: false,
        banner: true
    })

    // Use validOptions from tools.json as the source of truth
    const options = {
        ease: ['all', ...toolsData.validOptions.ease],
        type: ['all', ...toolsData.validOptions.type],
        maturity: ['all', ...toolsData.validOptions.maturity],
        userTargetGroups: ['all', ...toolsData.validOptions.userTargetGroups]
    }

    const filterLabels = {
        all: 'All',
        ease: 'Ease of Implementation',
        type: 'Type',
        maturity: 'Maturity Level',
        userTargetGroups: 'User Target Groups'
    }

    const filterDescriptions = {
        ease: 'Indicates how easily the tool can be implemented, ranging from Easy to Hard based on required resources and expertise.',
        type: 'Categorizes tools as Strategic (long-term planning), Tactical (medium-term), or Operational (day-to-day implementation).',
        maturity: 'Indicates the level of expertise required to use the tool effectively, from Beginner to Advanced.',
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
        if (!filters.ease.includes('all')) {
            const toolEase = Array.isArray(tool.ease) ? tool.ease : [tool.ease];
            if (!toolEase.some(e => filters.ease.includes(e))) return false;
        }
        if (!filters.type.includes('all') && !tool.type.some(t => filters.type.includes(t))) return false;
        if (!filters.maturity.includes('all')) {
            const toolMaturity = Array.isArray(tool.maturity) ? tool.maturity : [tool.maturity];
            if (!toolMaturity.some(m => filters.maturity.includes(m))) return false;
        }
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
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
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
                <div className="w-1/4 relative">
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
                            <span className="font-medium">Pro tip:</span> Hover over any indicator value to see more details. For example, if a tool is marked as "Multiple" under Ease, Type, or Maturity, hover to see all the options.
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

            {/* Filter Controls */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(options).map(([filterType, filterOptions]) => {
                    // Skip userTargetGroups as it's now in the dropdown
                    if (filterType === 'userTargetGroups') return null;

                    return (
                        <div key={filterType} className="bg-white rounded-lg shadow p-4">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    {filterType === 'ease' && <Gauge className="w-5 h-5 text-seafoam-600 mr-2" />}
                                    {filterType === 'type' && <Target className="w-5 h-5 text-seafoam-600 mr-2" />}
                                    {filterType === 'maturity' && <GraduationCap className="w-5 h-5 text-seafoam-600 mr-2" />}
                                    <h3 className="font-medium text-seafoam-800">{filterLabels[filterType]}</h3>
                                </div>
                                <button
                                    onClick={() => toggleInfo(filterType)}
                                    className="text-seafoam-600 hover:text-seafoam-800 transition-colors"
                                    aria-label={`Show information about ${filterLabels[filterType]}`}
                                >
                                    <Info className="w-5 h-5" />
                                </button>
                            </div>

                            {showInfo[filterType] && (
                                <div className="mb-3 p-2 bg-seafoam-50 rounded-md text-sm text-gray-700">
                                    {filterDescriptions[filterType]}
                                </div>
                            )}

                            <div className="space-y-1">
                                {filterOptions.map((option) => (
                                    <div
                                        key={option}
                                        className="flex items-center space-x-2 p-2 hover:bg-seafoam-50 rounded-md cursor-pointer"
                                        onClick={() => handleFilterChange(filterType, option)}
                                    >
                                        <div className={`w-5 h-5 flex-shrink-0 border rounded-md flex items-center justify-center ${filters[filterType].includes(option) ? 'bg-seafoam-600 border-seafoam-600' : 'border-gray-300'}`}>
                                            {filters[filterType].includes(option) && (
                                                <CheckIcon className="h-4 w-4 text-white" aria-hidden="true" />
                                            )}
                                        </div>
                                        <span className={`${filters[filterType].includes(option) ? 'font-medium' : ''}`}>
                                            {filterLabels[option] || option}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

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

                        {/* Filterable Attributes */}
                        <div className="mt-4 pt-4 border-t border-seafoam-200">
                            {/* First row with ease, type, and maturity */}
                            <div className="grid grid-cols-3 gap-3 text-xs mb-3">
                                {tool.ease && tool.ease !== "none" && (
                                    <div className="flex flex-col items-center group relative bg-seafoam-50 rounded-lg p-2">
                                        <div className="flex items-center justify-center mb-1">
                                            <Gauge className="w-4 h-4 text-seafoam-600" />
                                        </div>
                                        <span className="text-seafoam-600 font-medium text-xs mb-1">Ease</span>
                                        <span
                                            className="cursor-help text-center text-sm"
                                            onMouseEnter={(e) => {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                const tooltip = document.getElementById(`ease-tooltip-${tool.number}`);
                                                if (tooltip) {
                                                    tooltip.style.left = `${rect.left}px`;
                                                    tooltip.style.top = `${rect.bottom + 5}px`;
                                                    tooltip.classList.remove('hidden');
                                                }
                                            }}
                                            onMouseLeave={() => {
                                                const tooltip = document.getElementById(`ease-tooltip-${tool.number}`);
                                                if (tooltip) {
                                                    tooltip.classList.add('hidden');
                                                }
                                            }}
                                        >
                                            {Array.isArray(tool.ease) && tool.ease.length > 1 ? 'Multiple' : tool.ease}
                                        </span>
                                        {Array.isArray(tool.ease) && tool.ease.length > 1 && (
                                            <div
                                                id={`ease-tooltip-${tool.number}`}
                                                className="fixed hidden bg-white p-2 rounded-lg shadow-lg border border-seafoam-200 z-50 min-w-[200px]"
                                            >
                                                <div className="text-sm text-gray-700">
                                                    {tool.ease.map((ease, index) => (
                                                        <div key={index} className="py-1">
                                                            {ease}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {tool.type && tool.type !== "none" && (
                                    <div className="flex flex-col items-center group relative bg-seafoam-50 rounded-lg p-2">
                                        <div className="flex items-center justify-center mb-1">
                                            <Target className="w-4 h-4 text-seafoam-600" />
                                        </div>
                                        <span className="text-seafoam-600 font-medium text-xs mb-1">Type</span>
                                        <span
                                            className="cursor-help text-center text-sm"
                                            onMouseEnter={(e) => {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                const tooltip = document.getElementById(`tooltip-${tool.number}`);
                                                if (tooltip) {
                                                    tooltip.style.left = `${rect.left}px`;
                                                    tooltip.style.top = `${rect.bottom + 5}px`;
                                                    tooltip.classList.remove('hidden');
                                                }
                                            }}
                                            onMouseLeave={() => {
                                                const tooltip = document.getElementById(`tooltip-${tool.number}`);
                                                if (tooltip) {
                                                    tooltip.classList.add('hidden');
                                                }
                                            }}
                                        >
                                            {tool.type.length > 1 ? 'Multiple' : tool.type[0]}
                                        </span>
                                        {tool.type.length > 1 && (
                                            <div
                                                id={`tooltip-${tool.number}`}
                                                className="fixed hidden bg-white p-2 rounded-lg shadow-lg border border-seafoam-200 z-50 min-w-[200px]"
                                            >
                                                <div className="text-sm text-gray-700">
                                                    {tool.type.map((type, index) => (
                                                        <div key={index} className="py-1">
                                                            {type}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {tool.maturity && tool.maturity !== "none" && (
                                    <div className="flex flex-col items-center group relative bg-seafoam-50 rounded-lg p-2">
                                        <div className="flex items-center justify-center mb-1">
                                            <GraduationCap className="w-4 h-4 text-seafoam-600" />
                                        </div>
                                        <span className="text-seafoam-600 font-medium text-xs mb-1">Maturity</span>
                                        <span
                                            className="cursor-help text-center text-sm"
                                            onMouseEnter={(e) => {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                const tooltip = document.getElementById(`maturity-tooltip-${tool.number}`);
                                                if (tooltip) {
                                                    tooltip.style.left = `${rect.left}px`;
                                                    tooltip.style.top = `${rect.bottom + 5}px`;
                                                    tooltip.classList.remove('hidden');
                                                }
                                            }}
                                            onMouseLeave={() => {
                                                const tooltip = document.getElementById(`maturity-tooltip-${tool.number}`);
                                                if (tooltip) {
                                                    tooltip.classList.add('hidden');
                                                }
                                            }}
                                        >
                                            {Array.isArray(tool.maturity) && tool.maturity.length > 1 ? 'Multiple' : tool.maturity}
                                        </span>
                                        {Array.isArray(tool.maturity) && tool.maturity.length > 1 && (
                                            <div
                                                id={`maturity-tooltip-${tool.number}`}
                                                className="fixed hidden bg-white p-2 rounded-lg shadow-lg border border-seafoam-200 z-50 min-w-[200px]"
                                            >
                                                <div className="text-sm text-gray-700">
                                                    {tool.maturity.map((maturity, index) => (
                                                        <div key={index} className="py-1">
                                                            {maturity}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            {/* Second row with user target groups */}
                            {tool.userTargetGroups && tool.userTargetGroups !== "none" && (
                                <div className="flex items-center group relative">
                                    <div className="flex-shrink-0">
                                        <Users className="w-4 h-4 text-seafoam-600" />
                                    </div>
                                    <span className="text-seafoam-600 font-medium ml-1 text-xs whitespace-nowrap">Target Groups:</span>
                                    <span
                                        className="ml-2 px-1.5 py-0.5 bg-seafoam-50 rounded cursor-help text-sm max-w-[200px] truncate"
                                        onMouseEnter={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            const tooltip = document.getElementById(`userTargetGroups-tooltip-${tool.number}`);
                                            if (tooltip) {
                                                tooltip.style.left = `${rect.left}px`;
                                                tooltip.style.top = `${rect.bottom + 5}px`;
                                                tooltip.classList.remove('hidden');
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            const tooltip = document.getElementById(`userTargetGroups-tooltip-${tool.number}`);
                                            if (tooltip) {
                                                tooltip.classList.add('hidden');
                                            }
                                        }}
                                    >
                                        {Array.isArray(tool.userTargetGroups)
                                            ? tool.userTargetGroups.length > 1
                                                ? 'Multiple'
                                                : tool.userTargetGroups[0].split('(')[0].trim()
                                            : typeof tool.userTargetGroups === 'string'
                                                ? tool.userTargetGroups.split('(')[0].trim()
                                                : tool.userTargetGroups}
                                    </span>
                                    <div
                                        id={`userTargetGroups-tooltip-${tool.number}`}
                                        className="fixed hidden bg-white p-2 rounded-lg shadow-lg border border-seafoam-200 z-50 min-w-[200px]"
                                    >
                                        <div className="text-sm text-gray-700">
                                            {Array.isArray(tool.userTargetGroups)
                                                ? tool.userTargetGroups.map((group, index) => (
                                                    <div key={index} className="py-1">
                                                        {group}
                                                    </div>
                                                ))
                                                : <div className="py-1">{tool.userTargetGroups}</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}