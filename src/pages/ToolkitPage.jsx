import { useState, useEffect } from 'react'
import { useSearchParams, useLocation, Link } from 'react-router'
import { Search, Info } from 'lucide-react'
import toolsData from '../data/tools.json'
import ToolImage from '../components/ui/ToolImage'

export default function Toolkit() {
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState('')

    const [showInfo, setShowInfo] = useState({ banner: true })

    // Initialize search query from URL params
    useEffect(() => {
        setSearchQuery(searchParams.get('search') || '')
    }, [searchParams])

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


    return (
        <div>
            {/* Search Input */}
            <div className="mb-6">
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
            </div>

            {/* Alert Banner */}
            {showInfo.banner && (
                <div className="mb-6 bg-seafoam-50 border border-seafoam-200 rounded-lg p-4 flex items-start justify-between">
                    <div className="flex items-start">
                        <Info className="w-5 h-5 text-seafoam-600 mt-0.5 mr-3 flex-shrink-0" />
                        <p className="text-sm text-gray-700">
                            <span className="font-medium">Pro tip:</span> Hover over any indicator value to see more details. For example, if a tool is marked as &quot;Multiple&quot;, hover to see all the options.
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