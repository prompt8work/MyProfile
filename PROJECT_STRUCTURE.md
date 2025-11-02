# PromptAtWork - Project Structure

## Overview
A modern, component-based single-page application (SPA) for showcasing professional skills, resume, and cover letter. Built with React, TypeScript, Tailwind CSS, and Vite.

## Project Structure

```
Resume/
├── data/                           # All data files (JSON & TypeScript)
│   ├── landingPageContent.json    # Landing page text content
│   ├── coverLetter.json           # Cover letter content
│   ├── images.json                # Image URLs and references
│   ├── personalInfo.ts            # Personal information
│   ├── skills.ts                  # Skills data
│   ├── experience.ts              # Work experience
│   ├── achievements.ts            # Achievements
│   ├── passions.ts                # Professional interests
│   ├── education.ts               # Education & certifications
│   └── index.ts                   # Data exports
│
├── src/
│   ├── components/                # Reusable UI components
│   │   ├── Header.tsx            # Navigation header
│   │   ├── Footer.tsx            # Site footer
│   │   ├── Hero.tsx              # Hero section
│   │   ├── SkillsSection.tsx     # Skills display
│   │   ├── ServicesSection.tsx   # Services showcase
│   │   └── ContactSection.tsx    # Contact information
│   │
│   ├── pages/                     # Page components
│   │   ├── LandingPage.tsx       # Main landing page (/)
│   │   ├── Resume.tsx            # Resume page (/resume)
│   │   └── CoverLetter.tsx       # Cover letter page (/cover-letter)
│   │
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Global styles
│
├── public/                         # Static assets
├── vercel.json                     # Vercel deployment config
└── package.json                    # Dependencies

```

## Key Features

### 1. **Component-Based Architecture**
All UI elements are broken down into reusable components:
- **Header**: Fixed navigation with links to all pages
- **Footer**: Site-wide footer with contact info and links
- **Hero**: Customizable hero section with CTAs
- **SkillsSection**: Dynamic skills display
- **ServicesSection**: Services showcase
- **ContactSection**: Contact information cards

### 2. **Data-Driven Content**
All content is stored in JSON/TypeScript files in the `data/` folder:
- Easy to update without touching component code
- Centralized data management
- Type-safe with TypeScript interfaces

### 3. **Three Main Pages**
1. **Landing Page** (`/`) - Main marketing page with:
   - Hero section with background image
   - Core competencies
   - Technical & AI expertise
   - Tools & platforms
   - Services offered
   - Contact section

2. **Resume** (`/resume`) - Professional resume with:
   - Personal information
   - Professional summary
   - Core competencies
   - Work experience
   - Key achievements
   - Education & certifications
   - Professional interests
   - PDF export functionality

3. **Cover Letter** (`/cover-letter`) - Formal cover letter with:
   - Professional formatting
   - Dynamic content from JSON
   - PDF export functionality
   - Structured sections (opening, body, closing)

### 4. **Image Management**
- All images referenced in `data/images.json`
- Uses Unsplash placeholder images
- Easy to replace with custom images

### 5. **Responsive Design**
- Mobile-first approach
- Tailwind CSS for styling
- Print-optimized for resume and cover letter

## Data Files Explanation

### `landingPageContent.json`
Contains all text content for the landing page:
- Hero section text
- Section titles and subtitles
- Services descriptions
- Contact section content

### `coverLetter.json`
Structured cover letter content:
- Recipient information
- Opening paragraph
- Body sections (with headings)
- Closing paragraphs
- Signature details
- Attachments list

### `images.json`
Image URLs and references:
- Logo images
- Hero backgrounds
- Service images
- Skill icons
- Background patterns

### TypeScript Data Files
- `personalInfo.ts`: Name, email, phone, LinkedIn, location
- `skills.ts`: Primary, technical, AI APIs, tools
- `experience.ts`: Current and previous work experience
- `achievements.ts`: Key achievements
- `passions.ts`: Professional interests
- `education.ts`: Education and certifications

## Routing

The application uses React Router for navigation:
- `/` → Landing Page
- `/resume` → Resume
- `/cover-letter` → Cover Letter

Client-side routing is configured via `vercel.json` for proper deployment.

## How to Update Content

### To update landing page text:
Edit `data/landingPageContent.json`

### To update cover letter:
Edit `data/coverLetter.json`

### To update personal info:
Edit `data/personalInfo.ts`

### To update skills:
Edit `data/skills.ts`

### To change images:
Edit `data/images.json` and replace Unsplash URLs with your own

### To add new services:
Add items to `servicesSection.services` array in `landingPageContent.json`

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Custom Domain Setup
1. Deploy to Vercel
2. Go to Project Settings → Domains
3. Add `promptatwork.com` and `www.promptatwork.com`
4. Configure DNS at your registrar:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **Vercel** - Hosting platform

## Component Reusability

All components in `src/components/` can be:
- Reused across different pages
- Customized via props
- Styled independently
- Extended for new features

Example: The `Hero` component can be used on any page with different content:

```tsx
<Hero
  badge="Welcome"
  title="Your Title"
  titleHighlight="Highlight"
  subtitle="Subtitle"
  description="Description"
  ctaPrimary="Button 1"
  ctaSecondary="Button 2"
  onPrimaryClick={() => {}}
  onSecondaryClick={() => {}}
  backgroundImage="url"
/>
```

## Future Enhancements

- [ ] Add actual images (replace Unsplash placeholders)
- [ ] Add contact form functionality
- [ ] Add blog section
- [ ] Add portfolio/projects section
- [ ] Add testimonials section
- [ ] Add analytics tracking
- [ ] Add SEO metadata
- [ ] Add loading animations
- [ ] Add dark mode toggle
