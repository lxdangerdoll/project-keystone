# Contributing to Project Keystone

Thank you for your interest in contributing to Project Keystone! This document provides guidelines and information for contributors.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/project-keystone.git
   cd project-keystone
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start development server**:
   ```bash
   npm run dev
   ```

## 🏗️ Project Architecture

### Frontend (React + TypeScript)
- **Pages**: Located in `client/src/pages/`
- **Components**: Reusable UI components in `client/src/components/`
- **Styling**: Tailwind CSS with custom glassmorphism design system
- **State Management**: TanStack Query for server state

### Backend (Node.js + Express)
- **API Routes**: Defined in `server/routes.ts`
- **Data Layer**: Interface-based storage in `server/storage.ts`
- **Schemas**: Shared types in `shared/schema.ts`

## 🎨 Design Guidelines

### UI Principles
- **Glassmorphism**: Use translucent backgrounds with backdrop blur
- **Sci-fi Aesthetic**: Orbitron font for headings, cosmic color palette
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA-compliant components

### Color Palette
- Primary: `#6366f1` (cosmic purple)
- Secondary: `#a78bfa` (nebula pink)
- Background: `#0a0a1a` (space dark)
- Glass: `rgba(17, 24, 39, 0.4)` with backdrop blur

## 🛠️ Development Workflow

### Code Style
- **TypeScript**: Strict mode enabled
- **ESLint**: Follow configured rules
- **Prettier**: Auto-formatting on save
- **Components**: Use React functional components with hooks

### Commit Messages
Follow conventional commit format:
```
type(scope): description

feat(story): add new chapter progression system
fix(ui): resolve card background visibility issue
docs(readme): update installation instructions
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Branch Naming
- Feature: `feature/description`
- Bug Fix: `fix/description`
- Documentation: `docs/description`

## 🧪 Testing

### Before Submitting
1. **Type Check**: Ensure no TypeScript errors
2. **Manual Testing**: Test all affected functionality
3. **Responsive Design**: Verify mobile compatibility
4. **Accessibility**: Check keyboard navigation and screen readers

### Testing Checklist
- [ ] Story navigation works correctly
- [ ] Choice selection and submission is smooth
- [ ] All pages are responsive (mobile, tablet, desktop)
- [ ] Characters and universe data loads properly
- [ ] Community features display accurately

## 📝 Pull Request Process

### Before Creating PR
1. **Sync with main**: Rebase your branch on latest main
2. **Test thoroughly**: Verify all functionality works
3. **Update documentation**: Add/update relevant docs
4. **Check files**: Ensure no sensitive data or large files

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Manual testing completed
- [ ] Responsive design verified
- [ ] TypeScript errors resolved

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors or warnings
```

## 🚀 Feature Development

### Adding New Pages
1. Create page component in `client/src/pages/`
2. Add route in `client/src/App.tsx`
3. Update navigation in `client/src/components/sidebar.tsx`
4. Ensure consistent styling with glassmorphism theme

### Adding API Endpoints
1. Define types in `shared/schema.ts`
2. Add storage methods in `server/storage.ts`
3. Implement routes in `server/routes.ts`
4. Add validation with Zod schemas

### UI Components
1. Use Shadcn/ui components when possible
2. Follow glassmorphism design system
3. Ensure accessibility compliance
4. Add proper TypeScript interfaces

## 🎯 Priority Areas

### High Priority
- Story progression system
- User authentication
- Database integration
- Performance optimization

### Medium Priority
- Additional character interactions
- Enhanced community features
- Mobile app considerations
- Internationalization

### Low Priority
- Advanced animations
- Custom themes
- Analytics integration
- Social sharing features

## 🐛 Bug Reports

### Before Reporting
1. Check existing issues
2. Reproduce the bug consistently
3. Test in different browsers/devices
4. Gather relevant information

### Bug Report Template
```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to...
2. Click on...
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., Windows 10, macOS 12]
- Browser: [e.g., Chrome 96, Firefox 94]
- Device: [e.g., Desktop, iPhone 12]

## Additional Context
Screenshots, error messages, etc.
```

## 💡 Feature Requests

### Template
```markdown
## Feature Description
Clear description of the feature

## Problem it Solves
What user problem does this address?

## Proposed Solution
How should this work?

## Alternatives Considered
Other ways to solve this problem

## Implementation Notes
Technical considerations (optional)
```

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TanStack Query](https://tanstack.com/query/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)

### Project-Specific
- Check `replit.md` for architecture decisions
- Review existing components for patterns
- Follow established naming conventions

## 🤝 Community

### Code Review Process
- All PRs require review before merging
- Focus on code quality and user experience
- Provide constructive feedback
- Test changes locally when possible

### Communication
- Be respectful and professional
- Ask questions when unclear
- Share knowledge and help others
- Follow project coding standards

## 📄 License

By contributing to Project Keystone, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to the future of interactive storytelling! 🚀