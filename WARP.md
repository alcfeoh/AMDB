# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

AMDB is a modern Angular 20 application built with standalone components, signals, and the latest Angular CLI features. The project uses SCSS for styling, Karma/Jasmine for testing, and is configured with strict TypeScript settings for better code quality.

## Essential Development Commands

### Development Server
```bash
npm start                 # Start dev server at http://localhost:4200
ng serve                  # Alternative to npm start
ng serve --open          # Start and open browser automatically
```

### Building
```bash
npm run build            # Production build (default)
ng build                 # Same as above
ng build --configuration development  # Development build
npm run watch           # Build in watch mode for development
```

### Testing
```bash
npm test                # Run tests with Karma (watch mode)
npm test -- --watch=false  # Run tests once
npm test -- --watch=false --browsers=ChromeHeadless  # Headless CI testing
ng test                 # Alternative to npm test
```

### Code Generation
```bash
ng generate component my-component    # Generate standalone component
ng generate service my-service       # Generate service
ng generate --help                   # See all available schematics
```

## High-Level Architecture

### Standalone Components Architecture
This application uses Angular 20's standalone components approach:

- **No NgModules**: All components are standalone with explicit imports
- **Signal-based state**: Uses `signal()` for reactive state management
- **Modern routing**: Uses `provideRouter()` in application config
- **Zone coalescing**: `provideZoneChangeDetection({ eventCoalescing: true })` for performance

### Key Files Structure
```
src/
├── app/
│   ├── app.ts           # Root standalone component
│   ├── app.config.ts    # Application configuration (providers)
│   ├── app.routes.ts    # Route definitions
│   ├── app.html         # Root template
│   └── app.scss         # Root styles
├── main.ts              # Bootstrap application
└── styles.scss          # Global styles
```

### Application Bootstrap
The app bootstraps via `bootstrapApplication()` with a configuration object containing providers for routing, error handling, and zone change detection.

## Key Configuration Highlights

### TypeScript Configuration
- **Strict mode enabled**: All strict compiler options are active
- **Isolated modules**: Better build performance
- **Experimental decorators**: For Angular decorators support
- **Strict templates**: Enhanced template type checking

### Angular Configuration (angular.json)
- **SCSS by default**: Component schematics generate SCSS files
- **Custom assets path**: Assets served from `public/` directory
- **Bundle budgets**: Production builds have size limits (500kB warning, 1MB error)
- **Source maps**: Enabled in development mode

### Code Formatting
Prettier is configured with:
- 100 character line width
- Single quotes
- Angular HTML parser for templates

## Development Workflow

1. **Install dependencies**: `npm install`
2. **Start development**: `npm start`
3. **Create components**: `ng generate component feature-name`
4. **Write tests**: Add `.spec.ts` files alongside components
5. **Run tests**: `npm test`
6. **Build for production**: `npm run build`

### Component Creation Pattern
All new components should be:
- **Standalone**: `standalone: true` in component decorator
- **Explicitly import dependencies**: Use `imports: []` array
- **Use signals for state**: Prefer `signal()` over traditional properties
- **Follow SCSS naming**: Use `.scss` extension for styles

## Testing Strategy

### Test Framework
- **Karma**: Test runner
- **Jasmine**: Testing framework
- **Coverage**: Included with karma-coverage

### Test File Locations
- Place `.spec.ts` files alongside source files
- Use `TestBed.configureTestingModule()` with component imports
- Import standalone components in test configuration

### Running Tests
```bash
npm test                    # Interactive mode with watch
npm test -- --code-coverage  # Generate coverage report
```

## Build & Deployment

### Build Configurations
- **Production** (default): Optimized, tree-shaken, minified
- **Development**: Source maps, no optimization

### Build Output
- Built files output to `dist/AMDB/`
- Static files can be served from any web server
- Assets are automatically copied from `public/` directory

### Production Build Features
- Output hashing for cache busting
- Bundle size budgets enforcement
- License extraction
- AOT compilation

## Code Organization Patterns

### Recommended Feature Structure
```
src/app/
├── features/
│   ├── user/
│   │   ├── user.component.ts
│   │   ├── user.component.html
│   │   ├── user.component.scss
│   │   └── user.service.ts
│   └── shared/
│       ├── components/
│       └── services/
```

### State Management
- Use `signal()` for component state
- Use `computed()` for derived values
- Use `effect()` for side effects
- Services with signals for shared state

## Gotchas & Tips for Future WARP Agents

### Standalone Component Pitfalls
- **Always set `standalone: true`** in component decorators
- **Explicitly import all dependencies** in the `imports` array
- **Router outlet**: Use `<router-outlet />` (self-closing) in templates

### Signal Usage
- Prefer `signal()` over traditional properties for reactive state
- Use `computed()` for derived values instead of getters
- Remember `mySignal.set()` and `mySignal.update()` for mutations

### SCSS vs CSS
- Default schematic creates SCSS files
- Global styles in `src/styles.scss`
- Component styles automatically scoped

### Testing with Standalone Components
- Import the component itself in `TestBed.configureTestingModule({ imports: [MyComponent] })`
- No need for NgModule declarations

### TypeScript Strictness
- All strict flags enabled - handle null/undefined explicitly
- Use type assertions carefully due to `noPropertyAccessFromIndexSignature`
- Injection parameters are strictly typed

### Performance Considerations
- Zone change detection has event coalescing enabled
- Use OnPush change detection strategy when beneficial
- Lazy load feature modules with route-based code splitting

### Assets and Public Files
- Static assets go in `public/` directory, not `src/assets/`
- Files in `public/` are copied directly to build output
- Reference public assets with absolute paths from root

### Route Configuration
- Routes defined in `app.routes.ts` as a simple array
- Use lazy loading: `loadComponent: () => import('./feature/feature.component')`
- No NgModule-based routing
