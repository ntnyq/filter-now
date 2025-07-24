# Filter Now - AI Coding Instructions

## Project Overview

Filter Now is a browser extension for applying CSS filters to images and downloading the results. Built with Vue 3, WXT framework, and modern tooling stack.

## Architecture & Key Patterns

### WXT Framework Structure

- **Entrypoints**: `entrypoints/` contains extension pages - `popup/`, `options/`, and `background.ts`
- **Multi-page setup**: Options page uses resizable panels (`ResizablePanelGroup`) for main content and sidebar
- **Background script**: Handles keyboard commands (Alt+O for options page) in `entrypoints/background.ts`

### State Management (Pinia)

- **App Store** (`stores/app.ts`): Centralized state for image data URL, filter values, and CSS generation
- **Reactive CSS**: `rawCSSCode` computed property automatically generates CSS filter strings from slider values
- **Auto-highlighting**: CSS code highlighting updates reactively using Shiki with `vitesse` themes

### Filter System

- **Filter definitions**: `constants/filter.ts` defines available CSS filters with units, ranges, and defaults
- **Type safety**: `FilterType` union type ensures only valid filters are used
- **Default reset**: `getDefaultFilterValues()` provides baseline filter state

### UI Component Patterns

- **Shadcn/Vue integration**: Uses `reka-ui` primitives with custom `buttonVariants` and `cn()` utility
- **Class merging**: `cn()` function combines `clsx` and `tailwind-merge` for conditional styling
- **Auto-imports**: WXT handles Vue, Pinia, and VueUse imports automatically

### Storage & Extension APIs

- **Custom storage hook**: `composables/storage.ts` wraps WXT storage with reactive refs
- **Browser APIs**: Use `browser` from `#imports` (WXT auto-import) not direct `chrome`/`webextension-polyfill`
- **Command handling**: Extension commands defined in `wxt.config.ts` manifest, handled in background script

## Development Workflows

### Build & Dev Commands

```bash
pnpm dev              # Chrome development
pnpm dev:firefox      # Firefox development
pnpm build            # Production build
pnpm build:firefox    # Firefox-specific build
pnpm zip              # Package for distribution
```

### Code Quality

- **ESLint**: Uses `@ntnyq/eslint-config` with Shadcn/Vue special rules
- **TypeScript**: Strict mode with Vue SFC support via `vue-tsc`
- **Auto-formatting**: Prettier config from `@ntnyq/prettier-config`

### Key Utilities

- **Image export**: `utils/html2canvas.ts` handles canvas rendering with CSS filter workaround
- **Syntax highlighting**: `utils/shiki.ts` creates highlighter core with JS engine for performance
- **Type definitions**: `types/` folder contains component auto-imports and global types

## Critical Integration Points

### WXT Configuration (`wxt.config.ts`)

- Auto-imports: Vue, Pinia, VueRouter, VueUse (excludes conflicting exports)
- Component resolution: Unplugin Vue Components for auto-importing from `components/`
- Browser permissions: `storage` and `tabs` for extension functionality
- CSP policy: Allows `wasm-unsafe-eval` for Shiki highlighting

### Styling Stack

- **UnoCSS**: Primary styling with Wind3 preset and Shadcn preset
- **Animations**: `unocss-preset-animations` for component transitions
- **Icon system**: Auto-icons from base PNG, Iconify for additional icons

### File Organization

- **Components**: Organized by UI type (`ui/button/`, `ui/dialog/`) with index exports
- **Constants**: Centralized in `constants/` (commands, filters, metadata)
- **Composables**: Reusable logic in `composables/` (storage, event bus, dark mode)

## Project-Specific Conventions

- Use absolute imports with `@/` prefix (configured in WXT)
- Filter values stored as `number[]` arrays (for potential multi-value filters)
- CSS generation happens reactively in computed properties, not methods
- Extension command keys use object freeze pattern for type safety
- Image processing preserves original quality with 0.97 PNG compression
- UI components follow Shadcn/Vue patterns with `as` and `asChild` props
