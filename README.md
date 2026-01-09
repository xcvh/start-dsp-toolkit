## Project Overview

This is a React application for the Start-DSP Entrepreneurial University Toolbox - a digital entrepreneurship resource platform that provides educational tools for universities and educators. The application serves as a multilingual web interface for browsing and accessing 24 entrepreneurship education resources across 4 languages (English, Spanish, German, Greek).

## Getting Started

1. **Install dependencies**: `npm install`
2. **Start development**: `npm run dev` (automatically generates data files)
3. **Open browser**: Navigate to `http://localhost:5173`

The first `npm run dev` will generate all necessary data files from the source CSV and YAML translation files.

## Development Commands

- `npm run dev` - Start development server with hot reload (includes data generation)
- `npm run build` - Build for production (includes data generation)
- `npm run generate` - Generate all data files (translations + tools)
- `npm run generate-translations` - Generate JavaScript files from YAML translations
- `npm run generate-tools` - Generate JSON files from CSV data
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

## Architecture & Technology Stack

**Frontend Framework**: React 19 with Vite 7 build tool
**Routing**: React Router v7 with HashRouter for client-side compatibility
**Styling**: Tailwind CSS v4 with @tailwindcss/vite plugin
**UI Components**: Headless UI, Heroicons, Lucide React, React Select
**Internationalization**: Custom i18n system with YAML translations
**Data Processing**: Node.js scripts for CSV→JSON and YAML→JS conversion
**Build System**: Vite 7.3.1 with modern ESLint flat config
**Security**: 0 vulnerabilities, all dependencies up-to-date

## Key Components Structure

**Main Application Flow**:
- `App.jsx` - Main app component with routing setup and analytics
- Navigation components in `src/components/navigation/`
- Page components in `src/pages/` (ToolboxPage, ToolDetailPage, NotFoundPage)
- UI components in `src/components/ui/` and `src/components/`

**Data Management**:
- Source data: `src/data/input.csv` - contains 24 tools with metadata
- Generated data: `public/data/tools-{lang}.json` - processed JSON files (4 languages)
- Translation files: `src/i18n/translations/{lang}.yml` - YAML translation files
- Static assets (PDFs, images) served from `public/assets/`

**Core Features**:
- Multilingual support (English, Spanish, German, Greek)
- Tool catalog with filtering and search capabilities
- Individual tool detail pages with downloadable resources
- Responsive design with mobile navigation support
- Real-time data generation from source files

## Important Data Structure

**Source Data** (`src/data/input.csv`):
- Contains 24 entrepreneurship tools with comprehensive metadata
- Columns: partner, number, name, purpose, summary, benefits, prerequisiteTools, link_1_title, link_1_url, description, instructions, outcomes

**Generated Data** (`public/data/tools-{lang}.json`):
- Array of tool objects with properties: `number`, `name`, `summary`, `description`, `outcomes`, `instructions`, `benefits`, `purpose`, `prerequisiteTools`, `partner`, `links`, `image`
- `purpose` for filtering (6 main categories for entrepreneurship education)
- `links` array pointing to PDF resources in `public/assets/tools/{lang}/`
- Navigation uses tool numbers in URLs: `/toolbox/:number`
- Image references use `/assets/images/{number}.jpg` pattern

**Categories**: 6 main purposes for entrepreneurship education tools

## Static Asset Management

PDF files and images are stored in `public/assets/` with language-specific organization:

**PDFs**: Educational resources stored in `public/assets/tools/{lang}/` with systematic naming:
- `tool_X.Y_Z.pdf` where X=tool number, Y=resource index, Z=description
- Examples: `tool_1.0_TheEntrepreneurialWallPack.pdf`, `tool_1.1_Guide.pdf`

**Images**: Tool images stored in `public/assets/images/`:
- Numbered files: `1.jpg`, `2.jpg`, ... `24.jpg`
- Progressive loading with fallback: `.jpg` → `.jpeg` → `.png`
- Picsum placeholders for missing images

When adding new tools, ensure corresponding PDF files are placed in language-specific directories and images follow the numbered convention.

## Tailwind Configuration

The project uses Tailwind CSS v4 with custom design tokens defined in `src/index.css`. Custom color palettes include:
- Grass colors (--color-grass-50 through --color-grass-950)
- Aqua colors (--color-aqua-50 through --color-aqua-950)
- Mandarine colors (--color-mandarine-50 through --color-mandarine-950)
- Seafoam colors (--color-seafoam-50 through --color-seafoam-950) - primary brand color
- Custom fonts: Avenir (sans) and Nexa (display)



## Key Application Features

**Search & Filter System** (`ToolboxPage.jsx`):
- Real-time text search with result highlighting
- Purpose-based dropdown filtering (6 categories)
- URL state persistence for search/filter parameters
- Responsive grid layout (1-3 columns)

**Smart Image Loading** (`ToolImage.jsx`):
- Progressive image format fallback (.jpg → .jpeg → .png)
- Picsum placeholder system for missing images
- Graceful error handling

**Navigation Architecture**:
- Main routes: `/` (Toolbox), `/toolbox/:number` (Tool Detail), 404 page
- State-aware navigation (back button remembers search context)
- Responsive mobile menu with hamburger toggle

**Internationalization**:
- 4 language support: English (en), Spanish (es), German (de), Greek (el)
- Language detection from browser/storage with fallback
- URL-based language switching and persistence

**Analytics & Tracking**:
- Google Analytics integration with page view tracking
- Dynamic page titles based on current route
- Cookie consent management for compliance

## Data Generation Process

The application uses automated scripts to process data:

**Translation Generation** (`scripts/generate-translations-js.js`):
- Reads YAML files from `src/i18n/translations/{lang}.yml`
- Converts to JavaScript modules in `src/i18n/translations/{lang}.js`
- Supports all 4 languages

**Tools Data Generation** (`scripts/generate-tools-json.js`):
- Processes CSV data from `src/data/input.csv`
- Generates JSON files for each language in `public/data/tools-{lang}.json`
- Creates structured data with proper image paths and PDF links
- Automatically includes language-specific content

Both scripts run automatically during `npm run dev` and `npm run build`.
