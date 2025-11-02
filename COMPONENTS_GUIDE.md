# Component Library Reference

This guide explains how to use each reusable component in your project.

## Component Overview

All components are located in `src/components/` and can be imported and used across different pages.

---

## Header Component

**File:** `src/components/Header.tsx`

### Purpose
Fixed navigation header that appears on all pages.

### Props
```typescript
interface HeaderProps {
  activeSection?: string;  // Current active section (default: 'home')
  transparent?: boolean;   // Make background transparent (default: false)
}
```

### Usage
```tsx
import Header from '../components/Header';

<Header activeSection="home" transparent={false} />
```

### Features
- Fixed position at top of page
- Links to Home, Skills, Services, Contact sections
- Links to Resume, Cover Letter, and LinkedIn
- Responsive mobile/desktop layout
- Auto-highlights active section

---

## Footer Component

**File:** `src/components/Footer.tsx`

### Purpose
Site-wide footer with links and contact information.

### Props
None (uses data from `personalInfo`)

### Usage
```tsx
import Footer from '../components/Footer';

<Footer />
```

### Features
- Company branding
- Quick links to Resume, Cover Letter, LinkedIn
- Contact information (email, phone, location)
- Copyright notice
- Built with tech stack mention

---

## Hero Component

**File:** `src/components/Hero.tsx`

### Purpose
Large hero section with title, description, and call-to-action buttons.

### Props
```typescript
interface HeroProps {
  badge: string;              // Small badge text above title
  title: string;              // Main title
  titleHighlight: string;     // Highlighted part of title (gradient)
  subtitle: string;           // Subtitle below title
  description: string;        // Description text
  ctaPrimary: string;        // Primary button text
  ctaSecondary: string;      // Secondary button text
  onPrimaryClick?: () => void;    // Primary button click handler
  onSecondaryClick?: () => void;  // Secondary button click handler
  backgroundImage?: string;   // Optional background image URL
  isVisible?: boolean;        // Controls fade-in animation (default: true)
}
```

### Usage
```tsx
import Hero from '../components/Hero';

<Hero
  badge="Welcome"
  title="Your Main Title"
  titleHighlight="Highlighted Text"
  subtitle="Your subtitle here"
  description="Longer description"
  ctaPrimary="Get Started"
  ctaSecondary="Learn More"
  onPrimaryClick={() => scrollToSection('contact')}
  onSecondaryClick={() => scrollToSection('skills')}
  backgroundImage="https://example.com/image.jpg"
  isVisible={true}
/>
```

### Features
- Full-screen height
- Optional background image with overlay
- Gradient highlight text
- Two CTA buttons with hover effects
- Animated entrance
- Scroll down indicator (bouncing arrow)
- Responsive typography

---

## SkillsSection Component

**File:** `src/components/SkillsSection.tsx`

### Purpose
Display skills in a card-based grid layout.

### Props
```typescript
interface Skill {
  name: string;
  category?: string;
}

interface SkillsSectionProps {
  title: string;              // Section title
  subtitle: string;           // Section subtitle
  skills: Skill[] | string[]; // Array of skills (objects or strings)
  bgColor?: string;           // Background color class (default: 'bg-white')
}
```

### Usage
```tsx
import SkillsSection from '../components/SkillsSection';
import { skills } from '../../data';

<SkillsSection
  title="Core Competencies"
  subtitle="Expertise in multiple domains"
  skills={skills.primary}
  bgColor="bg-white"
/>
```

### Features
- Grid layout (1 col mobile, 2 cols tablet, 3 cols desktop)
- Card-based design
- Hover effects (lift and shadow)
- Icon badges with first letter
- Staggered animation delays
- Accepts string array or object array

---

## ServicesSection Component

**File:** `src/components/ServicesSection.tsx`

### Purpose
Showcase services/offerings with detailed cards.

### Props
```typescript
interface Service {
  icon: string;           // Emoji or icon
  title: string;          // Service title
  description: string;    // Service description
  features: string[];     // List of features
  image?: string;         // Optional image URL
}

interface ServicesSectionProps {
  title: string;          // Section title
  subtitle: string;       // Section subtitle
  services: Service[];    // Array of services
}
```

### Usage
```tsx
import ServicesSection from '../components/ServicesSection';

const services = [
  {
    icon: "🎯",
    title: "Service Name",
    description: "Service description here",
    features: ["Feature 1", "Feature 2", "Feature 3"]
  }
];

<ServicesSection
  title="Services I Offer"
  subtitle="Comprehensive solutions"
  services={services}
/>
```

### Features
- Grid layout (1-3 columns)
- Card-based design with shadows
- Large emoji/icon display
- Feature list with checkmarks
- Hover effects (lift and shadow increase)
- Responsive layout

---

## ContactSection Component

**File:** `src/components/ContactSection.tsx`

### Purpose
Display contact information with clickable cards.

### Props
```typescript
interface ContactSectionProps {
  title: string;      // Section title
  subtitle: string;   // Section subtitle
  ctaText: string;    // CTA button text
}
```

### Usage
```tsx
import ContactSection from '../components/ContactSection';

<ContactSection
  title="Let's Connect"
  subtitle="Ready to collaborate?"
  ctaText="Send Message"
/>
```

### Features
- Displays email, phone, LinkedIn, location
- Clickable contact cards (open email client, phone dialer, LinkedIn)
- Icon badges with colors
- Hover effects (scale icon, shadow)
- Central CTA button
- Auto-pulls data from `personalInfo`
- Grid layout (1-2 columns)

---

## Using Components Together

### Example Page Structure
```tsx
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import SkillsSection from '../components/SkillsSection';
import ServicesSection from '../components/ServicesSection';
import ContactSection from '../components/ContactSection';
import { skills, landingPageContent } from '../../data';

export default function MyPage() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div>
      <Header activeSection={activeSection} />

      <Hero
        {...landingPageContent.hero}
        onPrimaryClick={() => {/* scroll to contact */}}
        onSecondaryClick={() => {/* scroll to skills */}}
      />

      <SkillsSection
        title="My Skills"
        subtitle="What I can do"
        skills={skills.primary}
      />

      <ServicesSection
        title="Services"
        subtitle="What I offer"
        services={landingPageContent.servicesSection.services}
      />

      <ContactSection
        title="Contact"
        subtitle="Get in touch"
        ctaText="Email Me"
      />

      <Footer />
    </div>
  );
}
```

---

## Component Styling

All components use Tailwind CSS for styling:
- Responsive utilities (`sm:`, `md:`, `lg:`)
- Gradient backgrounds (`bg-gradient-to-r from-blue-600 to-purple-600`)
- Hover effects (`hover:shadow-lg`, `hover:-translate-y-2`)
- Transitions (`transition-all duration-300`)

### Color Scheme
- **Primary**: Blue-600 to Purple-600 gradients
- **Background**: Slate-50 to Blue-50 gradients
- **Text**: Slate-800 (headings), Slate-600/700 (body)
- **Accents**: Blue-100, Purple-100, Slate-100

---

## Creating New Components

To create a new reusable component:

1. **Create file** in `src/components/NewComponent.tsx`
2. **Define props interface**
```tsx
interface NewComponentProps {
  title: string;
  items: any[];
  // ... more props
}
```

3. **Create component**
```tsx
export default function NewComponent({ title, items }: NewComponentProps) {
  return (
    <section className="py-20 px-4">
      <h2>{title}</h2>
      {items.map((item, idx) => (
        <div key={idx}>{item}</div>
      ))}
    </section>
  );
}
```

4. **Import and use**
```tsx
import NewComponent from '../components/NewComponent';

<NewComponent title="Title" items={[]} />
```

---

## Component Best Practices

1. **Keep components pure**: Don't modify props
2. **Use TypeScript**: Define interfaces for props
3. **Make components flexible**: Use props for customization
4. **Keep logic minimal**: Move complex logic to parent
5. **Use semantic HTML**: `<section>`, `<article>`, `<nav>`, etc.
6. **Maintain accessibility**: Use proper ARIA labels
7. **Responsive by default**: Use Tailwind responsive utilities
8. **Consistent spacing**: Use Tailwind spacing scale
9. **Reusable styles**: Extract common patterns
10. **Document props**: Add comments explaining complex props

---

## Testing Components

### Visual Testing
```bash
# Start dev server
npm run dev

# Navigate to http://localhost:5173
# Check each component renders correctly
# Test responsive design (resize browser)
# Test interactions (hover, click)
```

### Build Testing
```bash
# Build for production
npm run build

# Preview build
npm run preview

# Check for errors
# Verify all components work in production build
```

---

## Component Checklist

When creating/updating components:
- [ ] Props interface defined
- [ ] TypeScript types correct
- [ ] Responsive design working
- [ ] Hover effects appropriate
- [ ] Accessibility considered
- [ ] Data passed via props (not hardcoded)
- [ ] Reusable across pages
- [ ] Follows existing style patterns
- [ ] No console errors
- [ ] Works in production build

---

## Need Help?

- Check existing components for patterns
- Review Tailwind CSS docs: https://tailwindcss.com
- Review React docs: https://react.dev
- Check TypeScript docs: https://www.typescriptlang.org
