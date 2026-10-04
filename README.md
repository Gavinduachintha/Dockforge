<div align="center">

# 🐳 DockForge

![DockForge Banner](https://img.shields.io/badge/DockForge-v1.0.0-black?style=for-the-badge&logo=docker)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![AI Powered](https://img.shields.io/badge/AI-Powered-FF8AE2?style=for-the-badge&logo=openai)
![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)
![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2024-orange?style=for-the-badge)

**AI-Powered Dockerfile Generator for Modern Applications**

Analyze any GitHub repository and get an optimized, production-ready Dockerfile in seconds.

[🚀 Quick Start](#-quick-start) • [📖 Setup Guide](SETUP_GUIDE.md) • [🎮 Demo](#-demo) • [🛠️ Features](#-features) • [🤝 Contributing](#-contributing)

</div>

---

## 🎯 What is DockForge?

DockForge is an intelligent tool that analyzes your GitHub repository and automatically generates production-ready Dockerfiles tailored to your project's specific needs. No more copy-pasting generic Dockerfiles or spending hours optimizing Docker configurations!

### Why DockForge?

<table>
<tr>
<td width="25%" align="center">
<h3>⚡ Fast</h3>
<p>Generate Dockerfiles in seconds, not hours</p>
</td>
<td width="25%" align="center">
<h3>🧠 Smart</h3>
<p>AI-powered analysis and optimization</p>
</td>
<td width="25%" align="center">
<h3>🎯 Accurate</h3>
<p>Framework and dependency detection</p>
</td>
<td width="25%" align="center">
<h3>✨ Modern</h3>
<p>Best practices and security built-in</p>
</td>
</tr>
</table>

---

## 🚀 Quick Start

Get DockForge running in **5 minutes**:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/yourusername/dockforge.git
cd dockforge

# 2️⃣ Install dependencies
npm install

# 3️⃣ Set up environment variables
cp .env.example .env
# Add your OpenRouter API key to .env

# 4️⃣ Start the development server
npm run dev
```

🎉 **That's it!** Open [http://localhost:3000](http://localhost:3000)

> 📖 For detailed setup instructions with API key configuration, see the **[Complete Setup Guide](SETUP_GUIDE.md)**

---

## 🛠️ Features

### Core Capabilities

<table>
<tr>
<td width="50%">

#### 🤖 AI-Powered Generation

- Uses LLaMA 3.1 8B Instruct model
- Production-ready Dockerfiles
- Best practices built-in
- Multi-stage builds when beneficial
- Security optimizations

</td>
<td width="50%">

#### 🔍 Smart Analysis

- Automatic language detection
- Framework identification
- Dependency analysis
- Configuration file parsing
- Build tool detection

</td>
</tr>
<tr>
<td>

#### 🎯 Multi-Language Support

- **Node.js** (Next.js, React, Vue, Express, NestJS)
- **Python** (Django, Flask, FastAPI)
- **Ruby** (Rails, Sinatra)
- **Go** (Gin, Echo, Fiber)
- **Rust** (Actix, Rocket)
- **PHP** (Laravel, Symfony)
- **Java** (Spring Boot, Quarkus)

</td>
<td>

#### ⚡ Developer Experience

- Real-time generation
- Syntax highlighting
- One-click copy
- Clean, modern UI
- Mobile responsive
- Dark mode ready

</td>
</tr>
</table>

---

## 🎮 Demo

### Try it with popular repositories:

```
Next.js:     https://github.com/vercel/next.js
React:       https://github.com/facebook/react
Django:      https://github.com/django/django
Express:     https://github.com/expressjs/express
FastAPI:     https://github.com/tiangolo/fastapi
Laravel:     https://github.com/laravel/laravel
Spring Boot: https://github.com/spring-projects/spring-boot
```

### Example Output

Input a GitHub URL and get a Dockerfile like this:

```dockerfile
FROM node:18-alpine AS base

WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]
```

---

## 📋 Requirements

| Requirement            | Version | Installation                           |
| ---------------------- | ------- | -------------------------------------- |
| **Node.js**            | 18.0+   | [Download](https://nodejs.org/)        |
| **npm**                | 9.0+    | Included with Node.js                  |
| **OpenRouter API Key** | -       | [Get Free Key](https://openrouter.ai/) |

---

## 📖 Documentation

- **[Complete Setup Guide](SETUP_GUIDE.md)** - Step-by-step installation with API key configuration
- **[Implementation Details](IMPLEMENTATION.md)** - Technical architecture and API documentation
- **[Contributing Guide](#-contributing)** - How to contribute to the project

---

## 🏗️ Architecture

```
┌─────────────────┐
│  User Interface │  ← Next.js 15 + React 19 + Tailwind CSS
└────────┬────────┘
         │
    ┌────▼────┐
    │ API Route │  ← Next.js API Routes
    └────┬────┘
         │
    ┌────▼──────────┐
    │  GitHub API   │  ← Fetch repo metadata & files
    └───────────────┘
         │
    ┌────▼──────────┐
    │  Analysis     │  ← Detect language, framework, deps
    └────┬──────────┘
         │
    ┌────▼──────────┐
    │ OpenRouter AI │  ← Generate optimized Dockerfile
    └────┬──────────┘
         │
    ┌────▼─────────┐
    │  Dockerfile  │  ← Production-ready output
    └──────────────┘
```

### Tech Stack

```
Frontend
├── Next.js 15 (App Router)
├── React 19
├── TypeScript 5
└── Tailwind CSS 4

Backend
├── Next.js API Routes
├── OpenRouter API (LLaMA 3.1)
└── GitHub REST API

Development
├── ESLint
├── PostCSS
└── npm
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
# Required: OpenRouter API Key
OPENROUTER_API_KEY="sk-or-v1-xxxxx"

# Optional: GitHub Token (increases rate limit from 60/hr to 5000/hr)
GITHUB_TOKEN="ghp_xxxxx"
```

**Get API Keys:**

- OpenRouter: [https://openrouter.ai/keys](https://openrouter.ai/keys) (Free tier available!)
- GitHub: [https://github.com/settings/tokens](https://github.com/settings/tokens) (Optional but recommended)

> 📖 See [Setup Guide](SETUP_GUIDE.md) for detailed instructions on getting API keys

---

## 🚦 Getting Started

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Using the Application

1. **Enter GitHub Repository URL**

   ```
   https://github.com/username/repository
   ```

2. **Click "Analyze & Generate Dockerfile"**

   DockForge will:
   - 📊 Analyze repository structure
   - 🔍 Detect language and framework
   - 🤖 Generate optimized Dockerfile
   - ✅ Verify configuration

3. **Copy & Use**

   Click the **Copy** button and paste the Dockerfile into your project:

   ```bash
   # Save as Dockerfile in your project root
   docker build -t my-app .
   docker run -p 3000:3000 my-app
   ```

---

## 🌟 Supported Technologies

### Languages (15+)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![Ruby](https://img.shields.io/badge/Ruby-CC342D?style=flat-square&logo=ruby&logoColor=white)
![Go](https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white)
![Rust](https://img.shields.io/badge/Rust-000000?style=flat-square&logo=rust&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=flat-square&logo=php&logoColor=white)
![Java](https://img.shields.io/badge/Java-007396?style=flat-square&logo=java&logoColor=white)

### Frameworks (50+)

<details>
<summary>🟢 <strong>Node.js Frameworks</strong></summary>

- Next.js
- React
- Vue.js
- Nuxt.js
- Express
- NestJS
- Gatsby
- Svelte
- Angular
- Fastify

</details>

<details>
<summary>🔵 <strong>Python Frameworks</strong></summary>

- Django
- Flask
- FastAPI
- Tornado
- Pyramid
- Streamlit
- Dash
- Jupyter

</details>

<details>
<summary>🔴 <strong>Ruby Frameworks</strong></summary>

- Ruby on Rails
- Sinatra
- Hanami
- Padrino

</details>

<details>
<summary>🟡 <strong>Go Frameworks</strong></summary>

- Gin
- Echo
- Fiber
- Chi
- Gorilla

</details>

<details>
<summary>🟠 <strong>Rust Frameworks</strong></summary>

- Actix
- Rocket
- Warp
- Axum
- Tide

</details>

<details>
<summary>🟣 <strong>PHP Frameworks</strong></summary>

- Laravel
- Symfony
- CodeIgniter
- Yii
- CakePHP

</details>

<details>
<summary>⚫ <strong>Java Frameworks</strong></summary>

- Spring Boot
- Quarkus
- Micronaut
- Dropwizard
- Play Framework

</details>

---

## 🔧 API Reference

### POST `/api/analyze`

Analyze a GitHub repository and generate a Dockerfile.

#### Request

```typescript
{
  repoUrl: string; // GitHub repository URL
}
```

#### Response (Success)

```typescript
{
  success: true,
  dockerfile: string,  // Generated Dockerfile content
  analysis: {
    language: string,    // Detected language
    framework: string,   // Detected framework
    repoName: string,    // Repository name
    description: string  // Repository description
  }
}
```

#### Response (Error)

```typescript
{
  error: string; // Error message
}
```

#### Example

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"repoUrl": "https://github.com/vercel/next.js"}'
```

---

## 🤝 Contributing

We welcome contributions for **Hacktoberfest 2024**! 🎉

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Ideas

- 🎨 **UI/UX Improvements** - Make it even more beautiful
- 🌐 **Framework Support** - Add support for more frameworks
- 📝 **Documentation** - Improve guides and tutorials
- 🧪 **Testing** - Add unit and integration tests
- 🐛 **Bug Fixes** - Fix reported issues
- ✨ **Features** - Docker Compose, .dockerignore generation
- 🌍 **i18n** - Internationalization support
- ♿ **Accessibility** - Improve a11y compliance

### Development Guidelines

- Write clean, readable code
- Follow TypeScript best practices
- Add comments for complex logic
- Update documentation for new features
- Test your changes thoroughly

---

## 🐛 Troubleshooting

### Common Issues

<details>
<summary><strong>❌ "OpenRouter API key not configured"</strong></summary>

**Solution:**

1. Create `.env` file in project root
2. Add: `OPENROUTER_API_KEY="sk-or-v1-xxxxx"`
3. Restart development server: `npm run dev`

</details>

<details>
<summary><strong>❌ "GitHub API rate limit exceeded"</strong></summary>

**Solution:**
Add GitHub token to `.env`:

```env
GITHUB_TOKEN="ghp_xxxxx"
```

This increases limit from 60/hour to 5000/hour.

</details>

<details>
<summary><strong>❌ "Invalid GitHub repository URL"</strong></summary>

**Solution:**
Use correct format:

```
✅ https://github.com/username/repository
❌ github.com/username/repository
❌ https://github.com/username
```

</details>

<details>
<summary><strong>❌ Port 3000 already in use</strong></summary>

**Solution:**

```bash
# Use different port
PORT=3001 npm run dev

# Or kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

</details>

> 📖 For more troubleshooting, see [Setup Guide](SETUP_GUIDE.md#-troubleshooting)

---

## 📊 Roadmap

### 🚧 Coming Soon

- [ ] Docker Compose generation
- [ ] .dockerignore file generation
- [ ] Support for private repositories
- [ ] Repository history/favorites
- [ ] Dockerfile optimization suggestions
- [ ] Multi-container applications
- [ ] Custom base image selection
- [ ] Environment variable management
- [ ] Health check configuration
- [ ] Container scanning integration

### 💡 Future Ideas

- [ ] VS Code extension
- [ ] CLI tool
- [ ] GitHub Action
- [ ] Browser extension
- [ ] API rate limiting
- [ ] User authentication
- [ ] Dockerfile templates library
- [ ] Community-shared configurations

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 DockForge

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

[Full license text...]
```

---

## 🙏 Acknowledgments

<div align="center">

### Built with ❤️ for Hacktoberfest 2024

**Powered by:**

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-FF6B6B?style=for-the-badge&logo=openai&logoColor=white)](https://openrouter.ai/)

**Special Thanks To:**

- [Vercel](https://vercel.com/) - For design inspiration and Next.js
- [OpenRouter](https://openrouter.ai/) - For AI API access
- [GitHub](https://github.com/) - For the amazing platform
- [Hacktoberfest](https://hacktoberfest.com/) - For promoting open source
- **All Contributors** - For making this project better

</div>

---

## 📞 Support

<div align="center">

### Need help or have questions?

[![GitHub Issues](https://img.shields.io/badge/Issues-Open-success?style=for-the-badge&logo=github)](https://github.com/yourusername/dockforge/issues)
[![GitHub Discussions](https://img.shields.io/badge/Discussions-Join-blue?style=for-the-badge&logo=github)](https://github.com/yourusername/dockforge/discussions)
[![Email](https://img.shields.io/badge/Email-Contact-red?style=for-the-badge&logo=gmail)](mailto:your.email@example.com)

</div>

---

## ⭐ Star History

If you find DockForge helpful, please consider giving it a star! It helps others discover the project.

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/dockforge&type=Date)](https://star-history.com/#yourusername/dockforge&Date)

</div>

---

<div align="center">

### 🌟 Star this repository if you find it helpful!

**Made with 🐳 by developers, for developers**

[⬆ Back to Top](#-dockforge)

</div>
# Dockforge
