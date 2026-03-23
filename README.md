# Personal Academic Homepage Template

A minimal, elegant personal homepage template for academics and researchers.

## ✨ Features

- 🎨 Clean and professional design
- 🌓 Dark/Light theme toggle
- 📱 Fully responsive
- ⚡ Fast and lightweight (no frameworks)
- 🔧 Easy to configure via JSON
- 📦 Show More/Less functionality for long lists
- 🎯 Section visibility control
- 🎭 Professional icons using Lucide Icons

## 🚀 Quick Start

1. **Download** this template
2. **Edit** `config.json` with your information
3. **Replace** images in `assets/files/` with your own
4. **Open** `index.html` in a browser or deploy to a web server

That's it! No build process, no dependencies to install.

## 📝 Configuration Guide

All content is configured through `config.json`.

### Basic Information

```json
{
  "name": "Your Name",
  "title": "Your Title/Position",
  "avatar": "assets/files/avatar/avatar.jpg",
  "bio": "Your bio. Supports **bold** and *italic* markdown."
}
```

### Social Links

```json
"links": [
  {
    "icon": "github",
    "name": "GitHub",
    "url": "https://github.com/username"
  }
]
```

**Available Icons** (from [Font Awesome](https://fontawesome.com/icons)):
- `github`, `book-open`, `mail`, `linkedin`, `twitter`, `globe`, `file-text`, `youtube`, `instagram`, `facebook`

Browse all icons at: https://fontawesome.com/icons

### Sections

Each section:

```json
"section_name": {
  "title": "Section Title",
  "visible": true,        // Show/hide section
  "initialShow": 3,       // Items to show initially
  "items": [...]
}
```

#### Education

```json
"education": {
  "visible": true,
  "items": [{
    "years": "2020 - 2024",
    "school": "University Name",
    "schoolUrl": "https://university.edu",
    "dept": "Department Name",
    "degree": "Degree Name",
    "logo": "assets/files/institute/logo.png"
  }]
}
```

#### Publications

```json
"publications": {
  "visible": true,
  "items": [{
    "title": "Paper Title",
    "authors": "Author 1, **Your Name**, Author 3",
    "venue": "Conference Name",
    "type": "Conference",
    "links": [
      { "name": "Paper", "url": "https://..." }
    ],
    "award": "Best Paper Award"
  }]
}
```

#### Open Source

```json
"opensource": {
  "visible": true,
  "items": [{
    "title": "Project Name",
    "organization": "GitHub",
    "year": "2024",
    "description": "Brief description",
    "url": "https://github.com/..."
  }]
}
```

#### Awards

```json
"awards": {
  "visible": true,
  "items": [{
    "title": "Award Name",
    "organization": "Organization",
    "year": "2024",
    "description": "Brief description"
  }]
}
```

#### Projects

```json
"projects": {
  "visible": true,
  "items": [{
    "title": "Project Name",
    "description": "Project description",
    "url": "https://..."
  }]
}
```

## 🖼️ Image Guidelines

### Avatar
- Location: `assets/files/avatar/avatar.jpg`
- Size: 520x520px recommended
- Format: JPG or PNG

### Institution Logos
- Location: `assets/files/institute/`
- Format: PNG with transparent background
- Height: 60px (width auto-scales)

## 🚀 Deployment

### Local Testing
```bash
python3 -m http.server 8000
# Open http://localhost:8000
```

### GitHub Pages
1. Push to GitHub
2. Settings → Pages
3. Select branch
4. Site at `https://username.github.io/repo-name`

## 🐛 Troubleshooting

**Images not showing?**
- Check file paths in config.json
- Ensure images exist in assets/files/
- Use browser DevTools (F12) → Network tab

**Icons not displaying?**
- Check internet connection (icons load from CDN)
- Verify icon names at https://fontawesome.com/icons

**Section not appearing?**
- Ensure `visible: true` in config.json
- Check items array is not empty

## 📄 License

Free to use for personal academic homepages.

## 🙏 Credits

- Icons: [Font Awesome](https://fontawesome.com/)
- Fonts: [Google Fonts](https://fonts.google.com/)
- Built with vanilla HTML, CSS, and JavaScript
- 🤖 AI-assisted development with Claude

---

**Need help?** Check the example `config.json`!
