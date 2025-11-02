# Quick Data Update Guide

This guide shows you exactly which files to edit for common updates.

## Personal Information

**File:** `data/personalInfo.ts`

```typescript
export const personalInfo = {
  name: "YOUR NAME",
  title: "Your Professional Title",
  phone: "Your Phone",
  email: "your@email.com",
  linkedin: "linkedin.com/in/yourprofile",
  location: "Your City, State"
};
```

## Skills

**File:** `data/skills.ts`

```typescript
export const skills = {
  primary: [
    "Skill 1",
    "Skill 2",
    // Add more...
  ],
  technical: [
    "Tech 1",
    "Tech 2",
    // Add more...
  ],
  tools: [
    "Tool 1",
    "Tool 2",
    // Add more...
  ],
  AI_API: [
    "API 1",
    "API 2",
    // Add more...
  ]
};
```

## Landing Page Content

**File:** `data/landingPageContent.json`

### Hero Section
```json
{
  "hero": {
    "badge": "Your Badge Text",
    "title": "Main Title",
    "titleHighlight": "Highlighted Part",
    "subtitle": "Subtitle",
    "description": "Description text",
    "ctaPrimary": "Button 1 Text",
    "ctaSecondary": "Button 2 Text"
  }
}
```

### Services Section
```json
{
  "servicesSection": {
    "services": [
      {
        "icon": "🎯",
        "title": "Service Title",
        "description": "Service description",
        "features": [
          "Feature 1",
          "Feature 2",
          "Feature 3"
        ]
      }
    ]
  }
}
```

## Cover Letter

**File:** `data/coverLetter.json`

### Opening
```json
{
  "opening": {
    "paragraph": "Your opening paragraph..."
  }
}
```

### Body Sections
```json
{
  "body": [
    {
      "heading": "Section Heading",
      "content": "Section content..."
    }
  ]
}
```

### Closing
```json
{
  "closing": {
    "paragraph": "Closing paragraph...",
    "callToAction": "Call to action..."
  }
}
```

## Work Experience

**File:** `data/experience.ts`

### Current Job
```typescript
export const currentExperience = {
  role: "Job Title",
  company: "Company Name",
  location: "City, State",
  period: "Start Date - Present",
  achievements: [
    "Achievement 1",
    "Achievement 2",
    // Add more...
  ]
};
```

### Previous Jobs
```typescript
export const previousExperience = [
  {
    role: "Job Title",
    company: "Company Name",
    location: "City, State",
    period: "Start - End",
    points: [
      "Point 1",
      "Point 2",
      // Add more...
    ]
  }
];
```

## Images

**File:** `data/images.json`

### Replace Images
```json
{
  "hero": {
    "background": "https://your-image-url.com/image.jpg",
    "alt": "Description"
  },
  "services": {
    "serviceName": "https://your-image-url.com/service.jpg"
  }
}
```

**Note:** Currently using Unsplash placeholder images. Replace with your own images.

## Education

**File:** `data/education.ts`

```typescript
export const education = [
  {
    degree: "Degree Name",
    institution: "Institution Name",
    details: "Additional details",
    year: "Year"
  }
];
```

## Achievements

**File:** `data/achievements.ts`

```typescript
export const achievements = [
  {
    title: "Achievement Title",
    description: "Achievement description"
  }
];
```

## Professional Interests

**File:** `data/passions.ts`

```typescript
export const passions = [
  "Interest 1",
  "Interest 2",
  // Add more...
];
```

## Common Tasks

### Add a New Service
1. Open `data/landingPageContent.json`
2. Find `servicesSection.services` array
3. Add new object:
```json
{
  "icon": "🎨",
  "title": "New Service",
  "description": "Service description",
  "features": ["Feature 1", "Feature 2", "Feature 3"]
}
```

### Change Hero Background Image
1. Open `data/landingPageContent.json`
2. Update `hero.backgroundImage` with your image URL

### Update Contact Information
1. Open `data/personalInfo.ts`
2. Update email, phone, linkedin, location

### Add New Skill Category
1. Open `data/skills.ts`
2. Add new property:
```typescript
export const skills = {
  // existing categories...
  newCategory: [
    "Skill 1",
    "Skill 2"
  ]
};
```

### Modify Section Titles
1. Open `data/landingPageContent.json`
2. Find the section (e.g., `skillsSection`)
3. Update `title` and `subtitle`

## After Making Changes

1. Save the file
2. If dev server is running, changes will auto-reload
3. If not, run: `npm run dev`
4. Check the changes in your browser
5. Build for production: `npm run build`
6. Deploy: `vercel --prod`

## Tips

- Always maintain the JSON structure (quotes, commas, brackets)
- Use a JSON validator if unsure about syntax
- Keep backup copies before major changes
- Test locally before deploying
- Image URLs should be complete (including https://)
- Text content supports basic HTML if needed (use with caution)

## Need Help?

- Check `PROJECT_STRUCTURE.md` for detailed documentation
- Verify JSON syntax at https://jsonlint.com/
- Check TypeScript syntax in your IDE
- Test build before deploying: `npm run build`
