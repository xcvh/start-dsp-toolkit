import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, useLocation, Link } from 'react-router'
import { Info, CheckIcon, Gauge, Zap, Target, GraduationCap } from 'lucide-react'
import toolsData from '../data/tools.json'
import ToolImage from '../components/ui/ToolImage'

export default function Toolkit() {
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const [filters, setFilters] = useState({
        ease: ['all'],
        impact: ['all'],
        type: ['all'],
        maturity: ['all']
    })

    // Initialize filters from URL params
    useEffect(() => {
        const newFilters = {
            ease: searchParams.get('ease')?.split(',') || ['all'],
            impact: searchParams.get('impact')?.split(',') || ['all'],
            type: searchParams.get('type')?.split(',') || ['all'],
            maturity: searchParams.get('maturity')?.split(',') || ['all']
        }
        setFilters(newFilters)
    }, [searchParams])

    const [showInfo, setShowInfo] = useState({
        ease: false,
        impact: false,
        type: false,
        maturity: false
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

    const filterDescriptions = {
        ease: 'Indicates how easily the tool can be implemented, ranging from Easy to Hard based on required resources and expertise.',
        impact: 'Measures the potential effect of the tool on entrepreneurial education outcomes, from Low to High impact.',
        type: 'Categorizes tools as Strategic (long-term planning), Tactical (medium-term), or Operational (day-to-day implementation).',
        maturity: 'Indicates the level of expertise required to use the tool effectively, from Beginner to Advanced.'
    }

    const filteredTools = toolsData.tools.filter(tool => {
        if (!filters.ease.includes('all')) {
            const toolEase = Array.isArray(tool.ease) ? tool.ease : [tool.ease];
            if (!toolEase.some(e => filters.ease.includes(e))) return false;
        }
        if (!filters.impact.includes('all')) {
            const toolImpact = Array.isArray(tool.impact) ? tool.impact : [tool.impact];
            if (!toolImpact.some(i => filters.impact.includes(i))) return false;
        }
        if (!filters.type.includes('all') && !tool.type.some(t => filters.type.includes(t))) return false
        if (!filters.maturity.includes('all') && !filters.maturity.includes(tool.maturity)) return false
        return true
    })

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

    return (
        <div>
            <h2 className="text-2xl font-display font-bold mb-4">DSP Toolkit</h2>

            {/* Filter Controls */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(options).map(([filterType, filterOptions]) => (
                    <div key={filterType} className="bg-white rounded-lg shadow p-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium text-seafoam-800">{filterLabels[filterType]}</h3>
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
                ))}
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
                            <h3 className="text-xl font-display font-bold mb-3">{tool.name}</h3>
                            <p className="text-gray-600">{tool.summary}</p>
                        </div>

                        {/* Filterable Attributes */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mt-4 pt-4 border-t border-seafoam-200">
                            {tool.ease && tool.ease !== "none" && (
                                <div className="flex items-center group relative">
                                    <Gauge className="w-4 h-4 text-seafoam-600 mr-1" />
                                    <span className="text-seafoam-600 font-medium">Ease:</span>
                                    <span
                                        className="ml-2 px-2 py-1 bg-seafoam-50 rounded cursor-help"
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
                            {tool.impact && tool.impact !== "none" && (
                                <div className="flex items-center group relative">
                                    <Zap className="w-4 h-4 text-seafoam-600 mr-1" />
                                    <span className="text-seafoam-600 font-medium">Impact:</span>
                                    <span
                                        className="ml-2 px-2 py-1 bg-seafoam-50 rounded cursor-help"
                                        onMouseEnter={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            const tooltip = document.getElementById(`impact-tooltip-${tool.number}`);
                                            if (tooltip) {
                                                tooltip.style.left = `${rect.left}px`;
                                                tooltip.style.top = `${rect.bottom + 5}px`;
                                                tooltip.classList.remove('hidden');
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            const tooltip = document.getElementById(`impact-tooltip-${tool.number}`);
                                            if (tooltip) {
                                                tooltip.classList.add('hidden');
                                            }
                                        }}
                                    >
                                        {Array.isArray(tool.impact) && tool.impact.length > 1 ? 'Multiple' : tool.impact}
                                    </span>
                                    {Array.isArray(tool.impact) && tool.impact.length > 1 && (
                                        <div
                                            id={`impact-tooltip-${tool.number}`}
                                            className="fixed hidden bg-white p-2 rounded-lg shadow-lg border border-seafoam-200 z-50 min-w-[200px]"
                                        >
                                            <div className="text-sm text-gray-700">
                                                {tool.impact.map((impact, index) => (
                                                    <div key={index} className="py-1">
                                                        {impact}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {tool.type && tool.type !== "none" && (
                                <div className="flex items-center group relative">
                                    <Target className="w-4 h-4 text-seafoam-600 mr-1" />
                                    <span className="text-seafoam-600 font-medium">Type:</span>
                                    <span
                                        className="ml-2 px-2 py-1 bg-seafoam-50 rounded cursor-help"
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
                                <div className="flex items-center">
                                    <GraduationCap className="w-4 h-4 text-seafoam-600 mr-1" />
                                    <span className="text-seafoam-600 font-medium">Maturity:</span>
                                    <span className="ml-2 px-2 py-1 bg-seafoam-50 rounded">{tool.maturity}</span>
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}