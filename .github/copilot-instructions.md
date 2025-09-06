# GitHub Copilot Instructions - Timer Wildtech

## Project Context
This is a JavaScript vanilla timer application with YouTube playlist integration, built for the Wildtech brand with custom orange/brown theme colors.

## Code Style & Standards

### JavaScript Conventions
- Use ES6+ class syntax and modern JavaScript features
- Prefer `const` and `let` over `var`
- Use arrow functions for event handlers and callbacks
- Implement proper error handling with try/catch blocks
- Follow camelCase for variables and functions
- Use descriptive variable names

### File Organization
- `timer.js` contains the main Timer class
- All DOM interactions should go through the Timer class methods
- Keep YouTube API integration within the Timer class
- Maintain separation between UI logic and timer logic

### CSS Guidelines
- Use CSS custom properties for theme colors:
  - Primary: `#ff7b00` (orange)
  - Secondary: `#8b4513` (brown)
- Implement responsive design with viewport units (vw, vh)
- Use flexbox for layouts
- Apply consistent border-radius (10px, 15px, 20px, 25px)
- Include hover states and transitions (0.3s ease)

### Testing Approach
- Write Jest tests for all Timer class methods
- Mock DOM elements using jsdom
- Test both positive and negative scenarios
- Maintain high code coverage (current setup includes coverage reporting)

## Key Features to Maintain
1. **Timer Functionality**: Preset buttons (3, 5, 25, 60 min) and custom time input
2. **YouTube Integration**: Playlist loading with iframe API
3. **Responsive Design**: Mobile-first approach with breakpoints at 768px and 480px
4. **Visual Feedback**: Animations, notifications, and state indicators
5. **Accessibility**: Proper button states and keyboard navigation

## Language Preferences
- UI text and user-facing content: Portuguese (Brazilian)
- Code comments and technical documentation: English
- Variable names and function names: English

## Performance Considerations
- Use efficient DOM queries (cache elements in constructor)
- Implement proper cleanup for intervals and timeouts
- Optimize for mobile devices with appropriate font sizes and touch targets
- Lazy load YouTube iframe only when needed

## Brand Guidelines
- Maintain Wildtech color scheme throughout
- Use consistent typography (Arial font family)
- Apply glass morphism effects with backdrop-filter
- Include subtle shadows and gradients for depth