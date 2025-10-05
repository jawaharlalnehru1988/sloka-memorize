# Angular Development Guidelines

## 🛠️ Component Generation
- **Always use `ng generate`** to create new components, services, pipes, and directives to save time and ensure consistency
- Follow Angular CLI conventions for file structure and naming

## 📡 Data Management
- **Always use Angular services and signals** to pass data between components
- Implement reactive data patterns with Angular signals for state management
- Avoid direct component-to-component data passing for complex scenarios

## 🔄 Component Separation
- When creating a new component from part of an existing component:
  1. Use `ng generate component` to create the new component
  2. Move the relevant logic and template code to the new component
  3. **Remove unnecessary code** from the original component/page
  4. Update imports and dependencies accordingly

## 🛣️ Routing Strategy
- **For all detail components, use router with ID parameters**
- Example: `/component-name/:id` for detail views
- Implement proper route guards and navigation logic

## 💻 TypeScript Best Practices
- **Always use TypeScript** with proper type definitions
- **Avoid using `any` type** or other bad practices
- Define interfaces for complex data structures
- Use strict TypeScript configuration

## 🎨 SCSS Best Practices
- Follow SCSS best practices for maintainable styles
- Use proper nesting and variable definitions
- Implement modular and reusable style patterns

## 🌓 Theme Compatibility
- **Ensure readability in both dark and light modes**
- Test innerHTML text visibility across different themes
- Use CSS custom properties for theme-aware styling
- Avoid hardcoded colors that may not work in all themes

## 🧹 Code Cleanup
- **Remove unused imports** from components and pages
- Regularly audit and clean up unnecessary dependencies
- Keep the codebase lean and maintainable

## mobile or device responsive scss

- make sure the component is mobile responsive and table responsive

