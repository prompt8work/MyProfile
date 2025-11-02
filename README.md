# PromptAtWork - Professional Portfolio Website

A modern, component-based single-page application showcasing professional skills, resume, and cover letter for Niharika Dhande.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
Resume/
├── data/                    # All content (JSON & TypeScript)
│   ├── landingPageContent.json
│   ├── coverLetter.json
│   ├── images.json
│   ├── personalInfo.ts
│   ├── skills.ts
│   └── ...
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── LandingPage.tsx
│   │   ├── Resume.tsx
│   │   └── CoverLetter.tsx
│   └── main.tsx
└── ...
```

## 🌐 Pages

- **`/`** - Landing Page: Main marketing page with skills, services, and contact
- **`/resume`** - Resume: Professional resume with PDF export
- **`/cover-letter`** - Cover Letter: Formal cover letter with PDF export

## 📝 Documentation

### Essential Guides
1. **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Complete project architecture
2. **[DATA_UPDATE_GUIDE.md](DATA_UPDATE_GUIDE.md)** - How to update content
3. **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Step-by-step deployment to Vercel
4. **[COMPONENTS_GUIDE.md](COMPONENTS_GUIDE.md)** - Reusable components reference

### Quick Links
- Update personal info → `data/personalInfo.ts`
- Update skills → `data/skills.ts`
- Update landing page text → `data/landingPageContent.json`
- Update cover letter → `data/coverLetter.json`
- Change images → `data/images.json`

## ✨ Features

### Component-Based Architecture
- Fully modular, reusable components
- Easy to maintain and extend
- Type-safe with TypeScript

### Data-Driven Content
- All content in JSON/TypeScript files
- No hardcoded text in components
- Easy to update without touching code

### Three Complete Pages
1. **Landing Page** - Hero, skills, services, contact
2. **Resume** - Professional resume with PDF export
3. **Cover Letter** - Formal letter with PDF export

### Modern Tech Stack
- ⚛️ React 18
- 📘 TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS
- 🧭 React Router
- 🎯 Lucide Icons

### Responsive Design
- Mobile-first approach
- Works on all devices
- Print-optimized for resume/cover letter

### Performance
- Fast loading with Vite
- Optimized build size
- Global CDN via Vercel

## 🎨 Customization

### Update Content
All content is stored in the `data/` folder:

```typescript
// data/personalInfo.ts
export const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  email: "your@email.com",
  // ...
};
```

### Update Styling
Components use Tailwind CSS. Edit classes directly:

```tsx
<div className="bg-blue-600 text-white p-4 rounded-lg">
  Content
</div>
```

### Add New Component
1. Create file in `src/components/`
2. Define props interface
3. Export component
4. Import and use in pages

See [COMPONENTS_GUIDE.md](COMPONENTS_GUIDE.md) for details.

## 🚢 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Or use GitHub Integration
1. Push code to GitHub
2. Import project in Vercel Dashboard
3. Vercel auto-detects Vite configuration
4. Deploy with one click

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for complete instructions.

### Custom Domain (promptatwork.com)
1. Add domain in Vercel Dashboard
2. Configure DNS at your registrar:
   - `A` record: `@` → `76.76.21.21`
   - `CNAME` record: `www` → `cname.vercel-dns.com`
3. Wait for DNS propagation
4. SSL automatically provisioned

## 🛠️ Development

### File Organization
```
src/
├── components/     # Reusable components
├── pages/         # Page components (routes)
├── main.tsx       # App entry point
└── index.css      # Global styles

data/
├── *.json         # JSON data files
├── *.ts           # TypeScript data files
└── index.ts       # Data exports
```

### Adding New Pages
1. Create file in `src/pages/`
2. Add route in `src/main.tsx`:
```tsx
<Route path="/new-page" element={<NewPage />} />
```

### Using Data
```tsx
import { personalInfo, skills, landingPageContent } from '../../data';

// Use in component
<div>{personalInfo.name}</div>
<div>{landingPageContent.hero.title}</div>
```

## 📊 Technologies Used

| Technology | Purpose |
|------------|---------|
| React 18 | UI library |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS | Styling |
| React Router | Routing |
| Lucide React | Icons |
| Vercel | Hosting & deployment |

## 🎯 Key Features

### Landing Page
- ✅ Hero section with background image
- ✅ Core competencies showcase
- ✅ Technical & AI expertise
- ✅ Tools & platforms
- ✅ Services offered (6 services)
- ✅ Contact section with clickable cards
- ✅ Smooth scrolling between sections
- ✅ Active section highlighting

### Resume Page
- ✅ Professional formatting
- ✅ Personal information
- ✅ Professional summary
- ✅ Skills by category
- ✅ Work experience
- ✅ Key achievements
- ✅ Education & certifications
- ✅ Professional interests
- ✅ PDF export functionality

### Cover Letter Page
- ✅ Formal business letter format
- ✅ Dynamic content from JSON
- ✅ Professional styling
- ✅ Signature space
- ✅ PDF export functionality
- ✅ Structured sections (opening, body, closing)

### Shared Features
- ✅ Fixed navigation header
- ✅ Professional footer
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Smooth animations & transitions
- ✅ Hover effects
- ✅ Gradient color scheme (blue to purple)
- ✅ Type-safe with TypeScript
- ✅ SEO-friendly routing

## 🔄 Continuous Deployment

Once deployed with GitHub:
- Every push to `main` → Auto-deploy to production
- Every push to other branches → Auto-deploy to preview URL
- Instant rollback available
- Build logs in Vercel Dashboard

## 📞 Support

- **Documentation**: See guides in project root
- **Issues**: Create GitHub issue in your repository
- **Vercel Support**: https://vercel.com/support

## 📄 License

Personal use - All rights reserved to Niharika Dhande

## 🎉 Getting Started

1. **Clone and install**
   ```bash
   npm install
   ```

2. **Update your information**
   - Edit files in `data/` folder
   - See [DATA_UPDATE_GUIDE.md](DATA_UPDATE_GUIDE.md)

3. **Test locally**
   ```bash
   npm run dev
   ```

4. **Build**
   ```bash
   npm run build
   ```

5. **Deploy**
   ```bash
   vercel --prod
   ```

6. **Configure domain**
   - See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

## 🌟 Next Steps

- [ ] Replace Unsplash images with your own
- [ ] Add actual content to cover letter
- [ ] Test on multiple devices
- [ ] Deploy to Vercel
- [ ] Configure custom domain
- [ ] Share with network!

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

**Ready to deploy to promptatwork.com 🚀**
