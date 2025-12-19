# CLAUDE.MD - Start-DSP Entrepreneurial University Toolbox

## Project Overview

The Start-DSP Toolbox is a **multilingual digital entrepreneurship resource platform** for universities and educators. It's a React-based web application that provides educational tools, templates, and resources for entrepreneurship education.

**Key Features:**
- 24 entrepreneurship educational tools with comprehensive documentation
- Multilingual support (English, German, Spanish, Greek)
- Search and filter functionality for tool discovery
- Downloadable PDF resources and templates
- Responsive design with custom brand styling

## Tech Stack

**Frontend:**
- React 18.3.1 with Vite 6.0.5 build system
- React Router v7.1.3 (HashRouter for client-side routing)
- Tailwind CSS v4 with custom design tokens
- Headless UI components (@headlessui/react)
- Icons: Heroicons, Lucide React
- UI: React Select for dropdowns

**Build & Development:**
- Vite with HMR (Hot Module Replacement)
- ESLint with modern flat config
- Node.js script for tool data generation

## Directory Structure

```
start-dsp-toolkit/
├── src/
│   ├── App.jsx                 # Main app with routing setup
│   ├── main.jsx                # React entry point
│   ├── index.css               # Tailwind config with custom design tokens
│   ├── components/             # Reusable UI components
│   │   └── ui/                 # UI-specific components
│   ├── pages/                  # Route page components
│   ├── data/                   # Generated tool data
│   ├── i18n/                   # Internationalization
│   │   └── translations/       # Language files
│   └── utils/                  # Helper functions
├── content/
│   └── tools/                  # Tool content (markdown)
│       ├── en/                 # English tool descriptions
│       ├── de/                 # German tool descriptions
│       ├── es/                 # Spanish tool descriptions
│       └── el/                 # Greek tool descriptions
├── public/
│   └── assets/
│       ├── tools/              # Tool PDFs organized by language
│       │   ├── en/
│       │   ├── de/
│       │   ├── es/
│       │   └── el/
│       ├── images/             # Tool thumbnail images
│       └── logos/              # Brand logos
├── scripts/
│   └── generate-tools-json.js  # Generates tools.json from markdown
└── index.html                  # Entry HTML file
```

## Development Workflow

### Starting Development
```bash
npm run dev              # Start dev server (auto-generates tools.json)
npm run build            # Production build (auto-generates tools.json)
npm run generate-tools   # Manually generate tools.json from content/
npm run lint             # Run ESLint
npm run preview          # Preview production build
```

### Important Pre-Build Step
**The `generate-tools` script runs automatically** before `dev` and `build` commands. It:
- Reads markdown files from `content/tools/{language}/`
- Parses YAML frontmatter and markdown content
- Generates `src/data/tools.json` with all tool data
- **DO NOT manually edit `src/data/tools.json`** - edit the markdown files instead

## Internationalization (i18n)

The app supports **4 languages**: English (en), German (de), Spanish (es), Greek (el)

**Content Organization:**
- Tool content: `content/tools/{lang}/*.md`
- Tool assets: `public/assets/tools/{lang}/`
- UI translations: `src/i18n/translations/`
- Default language: English

**Language Detection:**
- URL parameter: `?lang=de`
- Browser language detection as fallback
- Persisted in localStorage

**Adding a New Tool:**
1. Create markdown file in `content/tools/en/XX-tool-name.md`
2. Add translations in `content/tools/de/`, `content/tools/es/`, `content/tools/el/`
3. Add PDFs to `public/assets/tools/{lang}/`
4. Run `npm run generate-tools` to rebuild tools.json
5. Tool images go in `public/assets/images/` (named `XX.jpg` where XX is tool number)

## Key Files

### Core Application
- `src/App.jsx` - Main routing and layout
- `src/main.jsx` - React initialization
- `src/index.css` - Tailwind config and custom CSS variables

### Pages
- `src/pages/AboutPage.jsx` - Homepage/about page
- `src/pages/ToolboxPage.jsx` - Tool catalog with search/filter
- `src/pages/ToolDetailPage.jsx` - Individual tool details
- `src/pages/ProjectPage.jsx` - Project information

### Configuration
- `vite.config.js` - Vite build configuration
- `eslint.config.js` - ESLint rules
- `package.json` - Dependencies and scripts

### Content Generation
- `scripts/generate-tools-json.js` - Converts markdown to JSON
- `content/tools/{lang}/*.md` - Tool content source files

### Documentation
- `README.md` - Technical documentation
- `I18N_IMPLEMENTATION_SUMMARY.md` - Internationalization details
- `TRANSLATION_GUIDE.md` - Guide for translators

## Styling & Design System

**Custom Color Palette** (defined in `src/index.css`):
- **Seafoam** (Primary brand color): `--color-seafoam-{50-950}`
- **Grass**: `--color-grass-{50-950}`
- **Aqua**: `--color-aqua-{50-950}`
- **Mandarine**: `--color-mandarine-{50-950}`

**Typography:**
- Sans: Avenir font family
- Display: Nexa font family

**Usage in Components:**
```jsx
className="bg-seafoam-100 text-seafoam-900"
```

## Tool Data Structure

Each tool in `content/tools/{lang}/XX-tool-name.md` has YAML frontmatter:

```yaml
---
number: 1
name: "Tool Name"
summary: "Brief description"
image: "/assets/images/1.jpg"
category: "one_of_six_categories"
language: "en"
downloads:
  - title: "Main Tool"
    file: "/assets/tools/en/tool-1.pdf"
    fileType: "pdf"
---

# Markdown content below
```

## Common Tasks

### Adding a New Tool
1. Create markdown file: `content/tools/en/25-new-tool.md`
2. Add frontmatter with tool metadata
3. Write tool description in markdown
4. Add PDFs to `public/assets/tools/en/`
5. Add tool image to `public/assets/images/25.jpg`
6. Translate to other languages (de, es, el)
7. Run `npm run dev` to regenerate tools.json

### Updating Tool Content
1. Edit the markdown file in `content/tools/{lang}/`
2. The `generate-tools` script will auto-run on next dev/build

### Modifying UI Translations
1. Edit translation files in `src/i18n/translations/`
2. Update all language files (en, de, es, el) to maintain consistency

### Adding a New Page/Route
1. Create page component in `src/pages/`
2. Add route in `src/App.jsx`
3. Update navigation in relevant nav components

## Routing

**Route Structure:**
- `/` - About page
- `/project` - Project information
- `/toolbox` - Tool catalog
- `/tool/:number` - Individual tool detail page

**URL State:**
- Search: `/toolbox?search=keyword`
- Filter: `/toolbox?purpose=category`
- Language: `?lang=de`
- Combined: `/toolbox?search=keyword&purpose=category&lang=de`

## Build & Deployment

**Production Build:**
```bash
npm run build
```
Output: `dist/` directory

**Preview Build Locally:**
```bash
npm run preview
```

## Git Workflow

**Current Branch:** `claude/update-claude-md-Y8pC6`

**Branch Conventions:**
- Claude branches: `claude/{description}-{session-id}`
- Main development branch: (check repo settings)

**Important:**
- Always develop on feature branches
- Use descriptive commit messages
- Push to correct branch: `git push -u origin claude/update-claude-md-Y8pC6`

## Debugging Tips

**Common Issues:**

1. **Tools not showing up:**
   - Run `npm run generate-tools` manually
   - Check if markdown files exist in `content/tools/{lang}/`
   - Verify YAML frontmatter is valid

2. **Images not loading:**
   - Check file exists in `public/assets/images/`
   - Verify file extension (.jpg, .jpeg, or .png)
   - ToolImage component has fallback logic

3. **Translations missing:**
   - Ensure all 4 language files exist
   - Check `src/i18n/translations/` for UI strings
   - Verify tool markdown exists in `content/tools/{lang}/`

4. **Build errors:**
   - Run `npm run lint` to check for code issues
   - Ensure all imports are correct
   - Check console for specific error messages

## Performance Considerations

- Tool images lazy load with fallbacks
- HashRouter used for client-side routing (no server config needed)
- Vite provides optimized production builds with code splitting
- Search/filter is client-side (consider server-side for 100+ tools)

## Testing Recommendations

Before deploying:
1. Test all 4 languages (en, de, es, el)
2. Verify all tool detail pages load correctly
3. Test search and filter functionality
4. Check responsive design on mobile
5. Verify all PDF downloads work
6. Test navigation back button with search state

## Resources

- React Router Docs: https://reactrouter.com/
- Tailwind CSS v4: https://tailwindcss.com/
- Headless UI: https://headlessui.com/
- Vite Documentation: https://vitejs.dev/

## Notes for Claude

- **Always read markdown files** in `content/tools/` when modifying tool content
- **Never edit `src/data/tools.json` directly** - it's auto-generated
- **Test i18n changes** across all 4 languages
- **Use existing color variables** from design system
- **Follow existing component patterns** in src/components/
- **Check both README.md and I18N_IMPLEMENTATION_SUMMARY.md** for context
- **Respect the build scripts** - they auto-generate critical data

---

Last Updated: 2025-12-19
