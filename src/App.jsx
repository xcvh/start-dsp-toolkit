import { Routes, Route } from 'react-router'
import MainNav from './components/navigation/MainNav'
import About from './components/About'
import Project from './components/Project'
import Toolkit from './components/Toolkit'
import ToolDetail from './components/ToolDetail'

export default function App() {
  return (
    <div className="min-h-full">
      <MainNav />
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-display font-bold tracking-tight text-seafoam-900">Start-DSP Toolbox</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/project" element={<Project />} />
            <Route path="/toolkit" element={<Toolkit />} />
            <Route path="/toolkit/:number" element={<ToolDetail />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}