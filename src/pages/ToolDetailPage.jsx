import { useParams, useNavigate, useLocation } from 'react-router'
import toolsData from '../data/tools.json'
import ToolImage from '../components/ui/ToolImage'
import { Users } from 'lucide-react'

export default function ToolDetail() {
    const { number } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const tool = toolsData.tools.find(t => t.number === parseInt(number))

    if (!tool) {
        return <div>Tool not found</div>
    }

    const handleBack = () => {
        // If we came from the toolkit page, go back to it with the same search params
        if (location.state?.from === '/toolkit') {
            navigate('/toolkit' + location.state.search)
        } else {
            // Fallback to browser back if we didn't come from toolkit
            navigate(-1)
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <button
                onClick={handleBack}
                className="flex items-center text-seafoam-600 hover:text-seafoam-800 mb-4 transition-colors"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Toolkit
            </button>

            <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
                <h2 className="text-3xl font-display font-bold mb-6">{tool.name}</h2>
                <ToolImage
                    toolNumber={tool.number}
                    alt={tool.name}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                />
                {/* Challenge, Purpose, Resources, and User Target Group in a single row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {tool.challenge && (
                        <div className="p-3 bg-seafoam-100 rounded-lg shadow-md">
                            <div className="flex flex-col">
                                <div className="flex items-center mb-1">
                                    <svg className="w-5 h-5 text-seafoam-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    <div className="text-seafoam-700 text-sm font-medium">Challenge</div>
                                </div>
                                <div className="text-seafoam-900 text-sm whitespace-pre-line">
                                    {tool.challenge.replace(/✔/g, '\n✔')}
                                </div>
                            </div>
                        </div>
                    )}

                    {tool.purpose && (
                        <div className="p-3 bg-seafoam-100 rounded-lg shadow-md">
                            <div className="flex flex-col">
                                <div className="flex items-center mb-1">
                                    <svg className="w-5 h-5 text-seafoam-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <div className="text-seafoam-700 text-sm font-medium">Purpose</div>
                                </div>
                                <div className="text-seafoam-900 text-sm whitespace-pre-line">
                                    {tool.purpose.replace(/✔/g, '\n✔')}
                                </div>
                            </div>
                        </div>
                    )}

                    {tool.resources && (
                        <div className="p-3 bg-seafoam-100 rounded-lg shadow-md">
                            <div className="flex flex-col">
                                <div className="flex items-center mb-1">
                                    <svg className="w-5 h-5 text-seafoam-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <div className="text-seafoam-700 text-sm font-medium">Resources</div>
                                </div>
                                <div className="text-seafoam-900 text-sm whitespace-pre-line">
                                    {tool.resources.replace(/✔/g, '\n✔')}
                                </div>
                            </div>
                        </div>
                    )}

                    {tool.userTargetGroups && tool.userTargetGroups.length > 0 && (
                        <div className="p-3 bg-seafoam-100 rounded-lg shadow-md">
                            <div className="flex flex-col">
                                <div className="flex items-center mb-1">
                                    <Users className="w-5 h-5 text-seafoam-600 mr-2" />
                                    <div className="text-seafoam-700 text-sm font-medium">User Target Groups</div>
                                </div>
                                <div className="text-seafoam-900 text-sm whitespace-pre-line">
                                    {tool.userTargetGroups.join('\n')}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    {tool.description && (
                        <section>
                            <h3 className="text-xl font-display font-bold mb-2">Description</h3>
                            <p className="text-gray-600">{tool.description}</p>
                        </section>
                    )}

                    {tool.instructions && (
                        <section>
                            <h3 className="text-xl font-display font-bold mb-2">Instructions</h3>
                            <div className="text-gray-600">
                                {tool.instructions.split('\n').map((instruction, index) => (
                                    <p key={index} className="mb-2">{instruction}</p>
                                ))}
                            </div>
                        </section>
                    )}

                    {tool.outcomes && (
                        <section>
                            <h3 className="text-xl font-display font-bold mb-2">Outcomes</h3>
                            <p className="text-gray-600">{tool.outcomes}</p>
                        </section>
                    )}

                    {tool.links && tool.links.length > 0 && (
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
                    )}
                </div>
            </div>
        </div>
    )
} 