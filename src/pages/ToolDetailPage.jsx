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
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-seafoam-50 rounded">
                        <div className="text-seafoam-600 font-medium">User Level</div>
                        <div>{tool.user}</div>
                    </div>
                    <div className="text-center p-3 bg-seafoam-50 rounded">
                        <div className="text-seafoam-600 font-medium">Cost</div>
                        <div>{tool.cost}</div>
                    </div>
                    <div className="text-center p-3 bg-seafoam-50 rounded">
                        <div className="text-seafoam-600 font-medium">Ease</div>
                        <div>{tool.ease}</div>
                    </div>
                </div>

                <div className="space-y-6">
                    <section>
                        <h3 className="text-xl font-display font-bold mb-2">Challenge</h3>
                        <p className="text-gray-600">{tool.challenge}</p>
                    </section>

                    <section>
                        <h3 className="text-xl font-display font-bold mb-2">Purpose</h3>
                        <p className="text-gray-600">{tool.purpose}</p>
                    </section>

                    <section>
                        <h3 className="text-xl font-display font-bold mb-2">Description</h3>
                        <p className="text-gray-600">{tool.description}</p>
                    </section>

                    <section>
                        <h3 className="text-xl font-display font-bold mb-2">Instructions</h3>
                        <p className="text-gray-600">{tool.instructions}</p>
                    </section>

                    <section>
                        <h3 className="text-xl font-display font-bold mb-2">Resources</h3>
                        <div className="space-y-2">
                            {tool.links.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    className="block text-seafoam-600 hover:text-seafoam-800"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {link.title}
                                </a>
                            ))}
                        </div>
                    </section>

                    <div className="grid grid-cols-2 gap-6">
                        <section>
                            <h3 className="text-xl font-display font-bold mb-2">Details</h3>
                            <dl className="grid grid-cols-2 gap-2">
                                <dt className="text-gray-600">Timeframe:</dt>
                                <dd>{tool.timeframe}</dd>
                                <dt className="text-gray-600">Impact:</dt>
                                <dd>{tool.impact}</dd>
                                <dt className="text-gray-600">Role:</dt>
                                <dd>{tool.role}</dd>
                                <dt className="text-gray-600">Type:</dt>
                                <dd>{tool.type}</dd>
                                <dt className="text-gray-600">Maturity:</dt>
                                <dd>{tool.maturity}</dd>
                                <dt className="text-gray-600">Category:</dt>
                                <dd>{tool.category}</dd>
                            </dl>
                        </section>

                        <section>
                            <h3 className="text-xl font-display font-bold mb-2">Outcomes</h3>
                            <p className="text-gray-600">{tool.outcomes}</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
} 