# 🐳 DockForge Setup Guide

<div align="center">

![DockForge Banner](https://img.shields.io/badge/DockForge-v1.0.0-black?style=for-the-badge&logo=docker)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![AI Powered](https://img.shields.io/badge/AI-Powered-FF8AE2?style=for-the-badge&logo=openai)

**AI-Powered Dockerfile Generator for Modern Applications**

[Features](#-features) • [Quick Start](#-quick-start) • [API Keys](#-step-2-get-api-keys) • [Usage](#-usage-guide) • [Troubleshooting](#-troubleshooting)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Step-by-Step Setup](#-step-by-step-setup)
  - [Step 1: Clone & Install](#-step-1-clone--install)
  - [Step 2: Get API Keys](#-step-2-get-api-keys)
  - [Step 3: Configure Environment](#-step-3-configure-environment)
  - [Step 4: Run the Application](#-step-4-run-the-application)
- [Usage Guide](#-usage-guide)
- [Supported Technologies](#-supported-technologies)
- [Architecture](#-architecture)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🤖 AI-Powered Generation
Uses advanced LLaMA 3.1 AI model to analyze your repository and generate production-ready Dockerfiles

</td>
<td width="50%">

### 🔍 Smart Detection
Automatically detects languages, frameworks, and dependencies from your repository

</td>
</tr>
<tr>
<td width="50%">

### 🎯 Multi-Language Support
Supports Node.js, Python, Ruby, Go, Rust, PHP, Java, and more

</td>
<td width="50%">

### ⚡ Lightning Fast
Real-time analysis and generation in seconds

</td>
</tr>
</table>

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Version | Check Command |
|------------|---------|---------------|
| **Node.js** | 18.0+ | `node --version` |
| **npm** | 9.0+ | `npm --version` |
| **Git** | Any | `git --version` |

---

## 🚀 Quick Start

Get DockForge running in **5 minutes**:

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/dockforge.git
cd dockforge

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# 4. Start the development server
npm run dev
```

🎉 Open [http://localhost:3000](http://localhost:3000) and you're ready to go!

---

## 📖 Step-by-Step Setup

### 📥 Step 1: Clone & Install

#### 1.1 Clone the Repository

```bash
git clone https://github.com/yourusername/dockforge.git
cd dockforge
```

<details>
<summary>💡 Alternative: Download ZIP</summary>

1. Visit the repository on GitHub
2. Click the green **Code** button
3. Select **Download ZIP**
4. Extract the ZIP file
5. Open terminal in the extracted folder

</details>

#### 1.2 Install Dependencies

```bash
npm install
```

**What this does:**
- Installs Next.js 15
- Installs React 19
- Installs Tailwind CSS 4
- Installs TypeScript dependencies

⏱️ **Expected time:** 1-2 minutes

<details>
<summary>📦 View all dependencies</summary>

```json
{
  "dependencies": {
    "next": "16.3.8",
    "react": "19.2.8",
    "react-dom": "19.2.8"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.3.8",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

</details>

---

### 🔑 Step 2: Get API Keys

You need **two API keys** for DockForge to work properly:

<table>
<tr>
<th width="50%">🟢 Required</th>
<th width="50%">🔵 Optional (Recommended)</th>
</tr>
<tr>
<td>

**OpenRouter API Key**

For AI-powered Dockerfile generation

</td>
<td>

**GitHub Personal Access Token**

For higher API rate limits

</td>
</tr>
</table>

---

#### 2.1 Get OpenRouter API Key (Required)

<div style="background: #f6f8fa; padding: 20px; border-radius: 8px; border-left: 4px solid #000;">

**🔥 This is required for the application to work!**

</div>

**Step-by-Step:**

1. **Visit OpenRouter**
   
   🔗 Go to [https://openrouter.ai](https://openrouter.ai)

2. **Sign Up / Log In**
   
   Click **Sign Up** or **Log In** in the top right corner

3. **Navigate to API Keys**
   
   - Click on your profile icon
   - Select **API Keys** or **Settings**
   - Go to the **Keys** section

4. **Create New Key**
   
   ```
   Click "+ Create New Key"
   Give it a name: "DockForge"
   Click "Create"
   ```

5. **Copy Your Key**
   
   ```
   Your key will look like:
   sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   
   ⚠️ **Important:** Copy this key immediately! You won't be able to see it again.

6. **Add Credits (Free Tier Available)**
   
   - OpenRouter offers **free credits** for new users
   - We use **LLaMA 3.1 8B Instruct (free tier)**
   - No credit card required for free tier!

<details>
<summary>💰 Pricing Information</summary>

**LLaMA 3.1 8B Instruct (Free Tier):**
- ✅ Free to use
- ✅ No credit card required
- ✅ Sufficient for testing and personal use

**If you need higher limits:**
- Paid tiers start at $0.50 for 1M tokens
- Pay only for what you use

</details>

---

#### 2.2 Get GitHub Personal Access Token (Optional but Recommended)

<div style="background: #fff8e6; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">

**⚡ Why you need this:**

Without a token: **60 requests per hour**
With a token: **5,000 requests per hour**

</div>

**Step-by-Step:**

1. **Visit GitHub Settings**
   
   🔗 Go to [https://github.com/settings/tokens](https://github.com/settings/tokens)

2. **Generate New Token**
   
   - Click **Generate new token** → **Generate new token (classic)**
   - Or click **Tokens (classic)** → **Generate new token**

3. **Configure Token**
   
   ```
   Note: DockForge API Access
   Expiration: 90 days (or longer)
   
   Select scopes:
   ✅ public_repo (Read access to public repositories)
   ```
   
   💡 **You only need read access to public repositories**

4. **Generate and Copy**
   
   - Click **Generate token** at the bottom
   - Copy your token immediately
   
   ```
   Your token will look like:
   ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   
   ⚠️ **Important:** Save this token securely! GitHub won't show it again.

<details>
<summary>🔒 Token Security Tips</summary>

- ✅ Never commit tokens to Git
- ✅ Store in `.env` file (already in `.gitignore`)
- ✅ Use tokens with minimal required permissions
- ✅ Set expiration dates
- ✅ Regenerate tokens periodically

</details>

---

### ⚙️ Step 3: Configure Environment

#### 3.1 Create Environment File

```bash
# Copy the example file
cp .env.example .env
```

**Or manually create `.env` in the project root:**

```bash
# On Windows (PowerShell)
New-Item -Path .env -ItemType File

# On macOS/Linux
touch .env
```

---

#### 3.2 Add Your API Keys

Open `.env` file in your text editor and add your keys:

```env
# ============================================
#  DockForge Environment Configuration
# ============================================

# 🔑 OpenRouter API Key (REQUIRED)
# Get yours at: https://openrouter.ai/keys
OPENROUTER_API_KEY="sk-or-v1-your-actual-key-here"

# 🔑 GitHub Personal Access Token (OPTIONAL)
# Get yours at: https://github.com/settings/tokens
# Increases rate limit from 60/hour to 5000/hour
GITHUB_TOKEN="ghp_your-actual-token-here"
```

**Replace:**
- `sk-or-v1-your-actual-key-here` with your **actual OpenRouter key**
- `ghp_your-actual-token-here` with your **actual GitHub token** (optional)

---

#### 3.3 Verify Configuration

**✅ Checklist:**

- [ ] `.env` file exists in project root
- [ ] `OPENROUTER_API_KEY` is set with valid key
- [ ] No spaces around the `=` sign
- [ ] Keys are wrapped in quotes
- [ ] File is saved

**Example of correct configuration:**

```env
# ✅ CORRECT
OPENROUTER_API_KEY="Your open router key"

# ❌ WRONG - No quotes
OPENROUTER_API_KEY=sk-or-v1-xxxxx

# ❌ WRONG - Spaces around =
OPENROUTER_API_KEY = "sk-or-v1-xxxxx"

# ❌ WRONG - Missing key
OPENROUTER_API_KEY=""
```

---

### 🎯 Step 4: Run the Application

#### 4.1 Start Development Server

```bash
npm run dev
```

You should see:

```bash
  ▲ Next.js 16.3.8
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Ready in 2.3s
```

---

#### 4.2 Open in Browser

🌐 Visit **[http://localhost:3000](http://localhost:3000)**

You should see the DockForge interface with:
- Clean white background
- DockForge logo and header
- Repository URL input field
- "Analyze & Generate Dockerfile" button

<div align="center">

![Success](https://img.shields.io/badge/Status-Running-success?style=for-the-badge)

**🎉 Congratulations! DockForge is now running!**

</div>

---

## 🎮 Usage Guide

### Basic Usage

<table>
<tr>
<td width="5%">1️⃣</td>
<td>

**Enter Repository URL**

Paste any public GitHub repository URL:
```
https://github.com/vercel/next.js
```

</td>
</tr>
<tr>
<td>2️⃣</td>
<td>

**Click Analyze**

Click the **"Analyze & Generate Dockerfile"** button

</td>
</tr>
<tr>
<td>3️⃣</td>
<td>

**Wait for Analysis**

Watch as DockForge:
- Analyzes repository structure
- Detects framework & dependencies
- Generates optimized Dockerfile
- Runs verification checks

</td>
</tr>
<tr>
<td>4️⃣</td>
<td>

**Copy Dockerfile**

Click **Copy** button to copy the generated Dockerfile

</td>
</tr>
<tr>
<td>5️⃣</td>
<td>

**Use in Your Project**

Paste the Dockerfile into your project and build:
```bash
docker build -t your-app .
docker run -p 3000:3000 your-app
```

</td>
</tr>
</table>

---

### Example Repositories to Try

Test DockForge with these popular repositories:

| Framework | Repository URL |
|-----------|---------------|
| **Next.js** | `https://github.com/vercel/next.js` |
| **React** | `https://github.com/facebook/react` |
| **Vue.js** | `https://github.com/vuejs/vue` |
| **Express** | `https://github.com/expressjs/express` |
| **Django** | `https://github.com/django/django` |
| **Flask** | `https://github.com/pallets/flask` |
| **FastAPI** | `https://github.com/tiangolo/fastapi` |
| **Rails** | `https://github.com/rails/rails` |
| **Laravel** | `https://github.com/laravel/laravel` |
| **Spring Boot** | `https://github.com/spring-projects/spring-boot` |

---

## 🛠️ Supported Technologies

### Languages & Frameworks

<table>
<tr>
<td width="33%">

#### 🟢 Node.js
- ✅ Next.js
- ✅ React
- ✅ Vue.js
- ✅ Nuxt.js
- ✅ Express
- ✅ NestJS
- ✅ Gatsby
- ✅ Svelte

</td>
<td width="33%">

#### 🔵 Python
- ✅ Django
- ✅ Flask
- ✅ FastAPI
- ✅ Tornado
- ✅ Pyramid
- ✅ Streamlit
- ✅ Dash
- ✅ Jupyter

</td>
<td width="33%">

#### 🔴 Ruby
- ✅ Ruby on Rails
- ✅ Sinatra
- ✅ Hanami
- ✅ Padrino
- ✅ Roda
- ✅ Cuba
- ✅ Grape
- ✅ Rack

</td>
</tr>
<tr>
<td>

#### 🟡 Go
- ✅ Gin
- ✅ Echo
- ✅ Fiber
- ✅ Chi
- ✅ Gorilla
- ✅ Buffalo
- ✅ Revel
- ✅ Beego

</td>
<td>

#### 🟠 Rust
- ✅ Actix
- ✅ Rocket
- ✅ Warp
- ✅ Tide
- ✅ Axum
- ✅ Poem
- ✅ Salvo
- ✅ Thruster

</td>
<td>

#### 🟣 PHP
- ✅ Laravel
- ✅ Symfony
- ✅ CodeIgniter
- ✅ Yii
- ✅ Phalcon
- ✅ CakePHP
- ✅ Slim
- ✅ Lumen

</td>
</tr>
<tr>
<td colspan="3">

#### ⚫ Java
- ✅ Spring Boot
- ✅ Spring MVC
- ✅ Quarkus
- ✅ Micronaut
- ✅ Dropwizard
- ✅ Play Framework
- ✅ Vert.x
- ✅ Spark

</td>
</tr>
</table>

---

## 🏗️ Architecture

### How DockForge Works

```
┌─────────────┐
│   Browser   │
│  (Frontend) │
└──────┬──────┘
       │ Enter GitHub URL
       ↓
┌──────────────────────────────┐
│     Next.js Frontend         │
│  • Input validation          │
│  • UI rendering              │
│  • Error handling            │
└──────┬───────────────────────┘
       │ POST /api/analyze
       ↓
┌──────────────────────────────┐
│    API Route Handler         │
│  • URL parsing               │
│  • Request orchestration     │
└──────┬───────────────────────┘
       │
       ├──→ ┌─────────────────┐
       │    │   GitHub API    │
       │    │  • Repo info    │
       │    │  • Files check  │
       │    │  • Dependencies │
       │    └─────────────────┘
       │
       ├──→ ┌─────────────────┐
       │    │   Analysis      │
       │    │  • Language     │
       │    │  • Framework    │
       │    │  • Config files │
       │    └─────────────────┘
       │
       └──→ ┌─────────────────┐
            │  OpenRouter AI  │
            │  • LLaMA 3.1    │
            │  • Generate     │
            │  • Optimize     │
            └────────┬────────┘
                     │
                     ↓
            ┌─────────────────┐
            │   Dockerfile    │
            │  • Optimized    │
            │  • Production   │
            │  • Best practices│
            └─────────────────┘
```

---

### Technology Stack

```
Frontend
  ├── Next.js 15 (App Router)
  ├── React 19
  ├── TypeScript 5
  └── Tailwind CSS 4

Backend (API Routes)
  ├── Next.js API Routes
  ├── Node.js Runtime
  └── TypeScript

External APIs
  ├── OpenRouter API (LLaMA 3.1)
  └── GitHub REST API

Development Tools
  ├── ESLint
  ├── PostCSS
  └── npm
```

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### Issue 1: "OpenRouter API key not configured"

**❌ Error:**
```
OpenRouter API key not configured
```

**✅ Solution:**

1. Check if `.env` file exists in project root
2. Verify `OPENROUTER_API_KEY` is set:
   ```env
   OPENROUTER_API_KEY="sk-or-v1-xxxxx"
   ```
3. Restart the development server:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

---

#### Issue 2: "GitHub API rate limit exceeded"

**❌ Error:**
```
GitHub API error: rate limit exceeded
```

**✅ Solution:**

**Option A:** Add GitHub Token (Recommended)
```env
GITHUB_TOKEN="ghp_xxxxx"
```

**Option B:** Wait for rate limit reset (resets every hour)

**Option C:** Use fewer requests (without token: 60/hour)

---

#### Issue 3: "Invalid GitHub repository URL"

**❌ Error:**
```
Invalid GitHub repository URL
```

**✅ Solution:**

Make sure URL follows this format:
```
✅ CORRECT:
https://github.com/username/repository
https://github.com/vercel/next.js

❌ WRONG:
github.com/username/repository (missing https://)
https://github.com/username (missing repository)
https://gitlab.com/... (not GitHub)
```

---

#### Issue 4: "Failed to analyze repository"

**❌ Error:**
```
Failed to analyze repository
```

**✅ Solution:**

1. **Check repository exists and is public**
   - Private repositories are not supported yet
   
2. **Verify network connection**
   ```bash
   ping github.com
   ```

3. **Check API status**
   - GitHub: https://www.githubstatus.com
   - OpenRouter: https://status.openrouter.ai

4. **View detailed errors**
   - Open browser console (F12)
   - Check **Console** tab for detailed error messages

---

#### Issue 5: Port 3000 already in use

**❌ Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**✅ Solution:**

**Option A:** Use different port
```bash
PORT=3001 npm run dev
```

**Option B:** Kill process on port 3000

**Windows:**
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

---

#### Issue 6: Module not found

**❌ Error:**
```
Module not found: Can't resolve 'xxx'
```

**✅ Solution:**

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or on Windows
rmdir /s node_modules
del package-lock.json
npm install
```

---

### Environment Variables Checklist

Use this checklist to verify your configuration:

- [ ] `.env` file exists in project **root directory**
- [ ] File is named exactly `.env` (not `.env.txt` or `.env.local`)
- [ ] `OPENROUTER_API_KEY` is set with valid key
- [ ] Keys are wrapped in **double quotes** `"..."`
- [ ] No **spaces** around `=` sign
- [ ] No **trailing spaces** at end of lines
- [ ] Keys start with correct prefix:
  - OpenRouter: `sk-or-v1-`
  - GitHub: `ghp_` or `github_pat_`
- [ ] Development server was **restarted** after adding `.env`

---

### Getting Help

If you're still experiencing issues:

1. **Check Console Logs**
   ```bash
   # View detailed server logs
   npm run dev
   # Keep terminal open to see error messages
   ```

2. **Check Browser Console**
   - Press `F12` to open DevTools
   - Go to **Console** tab
   - Look for error messages in red

3. **Verify API Keys**
   ```bash
   # Test OpenRouter key (from project root)
   curl https://openrouter.ai/api/v1/models \
     -H "Authorization: Bearer YOUR_KEY_HERE"
   ```

4. **Create an Issue**
   - Go to GitHub Issues
   - Click **New Issue**
   - Include:
     - Error message
     - Steps to reproduce
     - Your environment (OS, Node version)
     - Screenshot if applicable

5. **Check Documentation**
   - [OpenRouter Docs](https://openrouter.ai/docs)
   - [GitHub API Docs](https://docs.github.com/en/rest)
   - [Next.js Docs](https://nextjs.org/docs)

---

## 🤝 Contributing

We welcome contributions for **Hacktoberfest 2024**!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Contribution Ideas

- 🎨 UI/UX improvements
- 🌐 Support for more languages/frameworks
- 📝 Better documentation
- 🧪 Add tests
- 🐛 Bug fixes
- ✨ New features (Docker Compose, .dockerignore, etc.)
- 🌍 Internationalization (i18n)
- ♿ Accessibility improvements

---

## 📄 License

MIT License - feel free to use this project for any purpose!

---

## 🎉 Acknowledgments

<div align="center">

Built with ❤️ for **Hacktoberfest 2024**

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-FF6B6B?style=for-the-badge&logo=openai&logoColor=white)](https://openrouter.ai/)

**Special Thanks:**
- [Vercel](https://vercel.com/) for design inspiration
- [OpenRouter](https://openrouter.ai/) for AI API access
- [GitHub](https://github.com/) for repository API
- [Hacktoberfest](https://hacktoberfest.com/) for the amazing initiative

</div>

---

<div align="center">

### 🌟 Star this repository if you find it helpful!

**Need help?** [Open an issue](https://github.com/yourusername/dockforge/issues) • **Have questions?** [Start a discussion](https://github.com/yourusername/dockforge/discussions)

**Made with 🐳 by the DockForge Team**

</div>
