import { useParams } from 'react-router'
import toolsData from '../data/tools.json'
import ToolImage from '../components/ui/ToolImage'

export default function ToolDetail() {
    const { number } = useParams()
    const tool = toolsData.tools.find(t => t.number === parseInt(number))

    if (!tool) {
        return <div>Tool not found</div>
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-6">{tool.name}</h2>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <ToolImage
                    toolNumber={tool.number}
                    alt={tool.name}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                />
                {/* First row - 7 items with shorter content */}
                <div className="grid grid-cols-7 gap-4 mb-6">
                    <div className="text-center p-3 bg-seafoam-100 rounded-lg shadow-sm">
                        <div className="flex flex-col items-center">
                            <svg className="w-5 h-5 text-seafoam-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="text-seafoam-700 text-sm font-medium">Cost</div>
                            <div className="text-seafoam-900 text-sm">{tool.cost}</div>
                        </div>
                    </div>
                    <div className="text-center p-3 bg-seafoam-100 rounded-lg shadow-sm">
                        <div className="flex flex-col items-center">
                            <svg className="w-5 h-5 text-seafoam-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <div className="text-seafoam-700 text-sm font-medium">Ease</div>
                            <div className="text-seafoam-900 text-sm">{tool.ease}</div>
                        </div>
                    </div>
                    <div className="text-center p-3 bg-seafoam-100 rounded-lg shadow-sm">
                        <div className="flex flex-col items-center">
                            <svg className="w-5 h-5 text-seafoam-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            <div className="text-seafoam-700 text-sm font-medium">Impact</div>
                            <div className="text-seafoam-900 text-sm">{tool.impact}</div>
                        </div>
                    </div>
                    <div className="text-center p-3 bg-seafoam-100 rounded-lg shadow-sm">
                        <div className="flex flex-col items-center">
                            <svg className="w-5 h-5 text-seafoam-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                            </svg>
                            <div className="text-seafoam-700 text-sm font-medium">Type</div>
                            <div className="text-seafoam-900 text-sm">{tool.type}</div>
                        </div>
                    </div>
                    <div className="text-center p-3 bg-seafoam-100 rounded-lg shadow-sm">
                        <div className="flex flex-col items-center">
                            <svg className="w-5 h-5 text-seafoam-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            <div className="text-seafoam-700 text-sm font-medium">Maturity</div>
                            <div className="text-seafoam-900 text-sm">{tool.maturity}</div>
                        </div>
                    </div>
                    <div className="text-center p-3 bg-seafoam-100 rounded-lg shadow-sm">
                        <div className="flex flex-col items-center">
                            <svg className="w-5 h-5 text-seafoam-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <div className="text-seafoam-700 text-sm font-medium">Category</div>
                            <div className="text-seafoam-900 text-sm">{tool.category}</div>
                        </div>
                    </div>
                    <div className="text-center p-3 bg-seafoam-100 rounded-lg shadow-sm">
                        <div className="flex flex-col items-center">
                            <svg className="w-5 h-5 text-seafoam-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="text-seafoam-700 text-sm font-medium">Timeframe</div>
                            <div className="text-seafoam-900 text-sm">{tool.timeframe}</div>
                        </div>
                    </div>
                </div>

                {/* Second row - 3 items */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-seafoam-100 rounded-lg shadow-sm">
                        <div className="flex flex-col items-center">
                            <svg className="w-5 h-5 text-seafoam-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <div className="text-seafoam-700 text-sm font-medium">User Level</div>
                            <div className="text-seafoam-900 text-sm">{tool.user}</div>
                        </div>
                    </div>
                    <div className="text-center p-3 bg-seafoam-100 rounded-lg shadow-sm">
                        <div className="flex flex-col items-center">
                            <svg className="w-5 h-5 text-seafoam-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <div className="text-seafoam-700 text-sm font-medium">Role</div>
                            <div className="text-seafoam-900 text-sm">{tool.role}</div>
                        </div>
                    </div>
                    <div className="text-center p-3 bg-seafoam-100 rounded-lg shadow-sm">
                        <div className="flex flex-col items-center">
                            <svg className="w-5 h-5 text-seafoam-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <div className="text-seafoam-700 text-sm font-medium">Tools Involved</div>
                            <div className="text-seafoam-900 text-sm">{tool.toolsInvolved}</div>
                        </div>
                    </div>
                </div>

                {/* Resources, Challenge, and Purpose in a single row */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="p-3 bg-seafoam-100 rounded-lg shadow-sm">
                        <div className="flex flex-col">
                            <div className="flex items-center mb-1">
                                <svg className="w-5 h-5 text-seafoam-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <div className="text-seafoam-700 text-sm font-medium">Resources</div>
                            </div>
                            <div className="text-seafoam-900 text-sm">{tool.resources}</div>
                        </div>
                    </div>

                    <div className="p-3 bg-seafoam-100 rounded-lg shadow-sm">
                        <div className="flex flex-col">
                            <div className="flex items-center mb-1">
                                <svg className="w-5 h-5 text-seafoam-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                <div className="text-seafoam-700 text-sm font-medium">Challenge</div>
                            </div>
                            <div className="text-seafoam-900 text-sm">{tool.challenge}</div>
                        </div>
                    </div>

                    <div className="p-3 bg-seafoam-100 rounded-lg shadow-sm">
                        <div className="flex flex-col">
                            <div className="flex items-center mb-1">
                                <svg className="w-5 h-5 text-seafoam-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <div className="text-seafoam-700 text-sm font-medium">Purpose</div>
                            </div>
                            <div className="text-seafoam-900 text-sm">{tool.purpose}</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <section>
                        <h3 className="text-xl font-display font-bold mb-2">Description</h3>
                        <p className="text-gray-600">{tool.description}</p>
                    </section>

                    <section>
                        <h3 className="text-xl font-display font-bold mb-2">Instructions</h3>
                        <p className="text-gray-600">{tool.instructions}</p>
                    </section>

                    <section>
                        <h3 className="text-xl font-display font-bold mb-2">Outcomes</h3>
                        <p className="text-gray-600">{tool.outcomes}</p>
                    </section>

                    <section>
                        <h3 className="text-xl font-display font-bold mb-2">Resources</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {tool.links.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    className="group relative overflow-hidden bg-gradient-to-br from-seafoam-50 to-white rounded-xl p-6 border border-seafoam-200 hover:border-seafoam-400 transition-all duration-200"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-seafoam-100 rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:bg-seafoam-200 transition-colors duration-200"></div>
                                    <div className="relative">
                                        <div className="flex items-center mb-2">
                                            <svg className="w-6 h-6 text-seafoam-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            <span className="text-lg font-medium text-seafoam-800 group-hover:text-seafoam-900">{link.title}</span>
                                        </div>
                                        <div className="text-sm text-seafoam-600 group-hover:text-seafoam-700">Click to download</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
} 