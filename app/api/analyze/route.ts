import { NextRequest, NextResponse } from "next/server";

interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  default_branch: string;
}

interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  scripts?: Record<string, string>;
}

// Helper function to extract owner and repo from GitHub URL
function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const regex =
    /github\.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_.-]+)(?:\.git)?(?:\/)?$/;
  const match = url.match(regex);

  if (match) {
    return { owner: match[1], repo: match[2] };
  }

  return null;
}

// Fetch repository information from GitHub
async function fetchRepoInfo(owner: string, repo: string): Promise<GitHubRepo> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "DockForge",
  };

  // Add GitHub token if available for higher rate limits
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers,
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  return response.json();
}

// Fetch file contents from GitHub
async function fetchFileContent(
  owner: string,
  repo: string,
  path: string,
  branch: string,
): Promise<string | null> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "DockForge",
    };

    // Add GitHub token if available
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
      { headers },
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data.content) {
      // Decode base64 content
      return Buffer.from(data.content, "base64").toString("utf-8");
    }

    return null;
  } catch (error) {
    return null;
  }
}

// Analyze repository structure
async function analyzeRepository(owner: string, repo: string, branch: string) {
  const analysis: any = {
    hasPackageJson: false,
    hasRequirementsTxt: false,
    hasGemfile: false,
    hasGoMod: false,
    hasCargoToml: false,
    hasComposerJson: false,
    hasPomXml: false,
    language: null,
    framework: null,
    packageJson: null,
  };

  // Check for package.json (Node.js)
  const packageJsonContent = await fetchFileContent(
    owner,
    repo,
    "package.json",
    branch,
  );
  if (packageJsonContent) {
    analysis.hasPackageJson = true;
    analysis.language = "Node.js";
    try {
      analysis.packageJson = JSON.parse(packageJsonContent);

      // Detect framework
      const deps = {
        ...analysis.packageJson.dependencies,
        ...analysis.packageJson.devDependencies,
      };

      if (deps.next) analysis.framework = "Next.js";
      else if (deps.react) analysis.framework = "React";
      else if (deps.vue) analysis.framework = "Vue.js";
      else if (deps.express) analysis.framework = "Express";
      else if (deps["@nestjs/core"]) analysis.framework = "NestJS";
      else if (deps.nuxt) analysis.framework = "Nuxt.js";
    } catch (e) {
      // Invalid JSON
    }
  }

  // Check for requirements.txt (Python)
  const requirementsTxt = await fetchFileContent(
    owner,
    repo,
    "requirements.txt",
    branch,
  );
  if (requirementsTxt) {
    analysis.hasRequirementsTxt = true;
    if (!analysis.language) analysis.language = "Python";

    // Detect Python frameworks
    if (requirementsTxt.includes("django")) analysis.framework = "Django";
    else if (requirementsTxt.includes("flask")) analysis.framework = "Flask";
    else if (requirementsTxt.includes("fastapi"))
      analysis.framework = "FastAPI";
  }

  // Check for Gemfile (Ruby)
  const gemfile = await fetchFileContent(owner, repo, "Gemfile", branch);
  if (gemfile) {
    analysis.hasGemfile = true;
    if (!analysis.language) analysis.language = "Ruby";
    if (gemfile.includes("rails")) analysis.framework = "Ruby on Rails";
  }

  // Check for go.mod (Go)
  const goMod = await fetchFileContent(owner, repo, "go.mod", branch);
  if (goMod) {
    analysis.hasGoMod = true;
    if (!analysis.language) analysis.language = "Go";
  }

  // Check for Cargo.toml (Rust)
  const cargoToml = await fetchFileContent(owner, repo, "Cargo.toml", branch);
  if (cargoToml) {
    analysis.hasCargoToml = true;
    if (!analysis.language) analysis.language = "Rust";
  }

  // Check for composer.json (PHP)
  const composerJson = await fetchFileContent(
    owner,
    repo,
    "composer.json",
    branch,
  );
  if (composerJson) {
    analysis.hasComposerJson = true;
    if (!analysis.language) analysis.language = "PHP";
    try {
      const composer = JSON.parse(composerJson);
      if (composer.require?.["laravel/framework"])
        analysis.framework = "Laravel";
      else if (composer.require?.["symfony/symfony"])
        analysis.framework = "Symfony";
    } catch (e) {
      // Invalid JSON
    }
  }

  // Check for pom.xml (Java)
  const pomXml = await fetchFileContent(owner, repo, "pom.xml", branch);
  if (pomXml) {
    analysis.hasPomXml = true;
    if (!analysis.language) analysis.language = "Java";
    if (pomXml.includes("spring-boot")) analysis.framework = "Spring Boot";
  }

  return analysis;
}

// Generate Dockerfile using OpenRouter
async function generateDockerfile(
  repoInfo: GitHubRepo,
  analysis: any,
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OpenRouter API key not configured");
  }

  const prompt = `You are a Docker expert. Generate an optimized Dockerfile for the following repository:

Repository: ${repoInfo.name}
Description: ${repoInfo.description || "No description"}
Primary Language: ${analysis.language || repoInfo.language || "Unknown"}
Framework: ${analysis.framework || "None detected"}

Repository Analysis:
- Has package.json: ${analysis.hasPackageJson}
- Has requirements.txt: ${analysis.hasRequirementsTxt}
- Has Gemfile: ${analysis.hasGemfile}
- Has go.mod: ${analysis.hasGoMod}
- Has Cargo.toml: ${analysis.hasCargoToml}
- Has composer.json: ${analysis.hasComposerJson}
- Has pom.xml: ${analysis.hasPomXml}

${analysis.packageJson ? `Package.json scripts: ${JSON.stringify(analysis.packageJson.scripts, null, 2)}` : ""}

Generate a production-ready, optimized Dockerfile following best practices:
1. Use appropriate base image
2. Multi-stage build if beneficial
3. Minimize image size
4. Security best practices
5. Proper layer caching
6. Include health checks if applicable
7. Set appropriate working directory
8. Expose necessary ports
9. Use non-root user when possible

Return ONLY the Dockerfile content without any explanations or markdown formatting.`;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://dockforge.app",
        "X-Title": "DockForge",
      },
      body: JSON.stringify({
        model: "qwen/qwen3.8-27b:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${error}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

export async function POST(request: NextRequest) {
  try {
    const { repoUrl } = await request.json();

    if (!repoUrl) {
      return NextResponse.json(
        { error: "Repository URL is required" },
        { status: 400 },
      );
    }

    // Parse GitHub URL
    const parsed = parseGitHubUrl(repoUrl);
    if (!parsed) {
      return NextResponse.json(
        { error: "Invalid GitHub repository URL" },
        { status: 400 },
      );
    }

    const { owner, repo } = parsed;

    // Fetch repository information
    const repoInfo = await fetchRepoInfo(owner, repo);

    // Analyze repository structure
    const analysis = await analyzeRepository(
      owner,
      repo,
      repoInfo.default_branch,
    );

    // Generate Dockerfile using AI
    const dockerfile = await generateDockerfile(repoInfo, analysis);

    return NextResponse.json({
      success: true,
      dockerfile,
      analysis: {
        language: analysis.language || repoInfo.language,
        framework: analysis.framework,
        repoName: repoInfo.name,
        description: repoInfo.description,
      },
    });
  } catch (error: any) {
    console.error("Error analyzing repository:", error);

    return NextResponse.json(
      {
        error: error.message || "Failed to analyze repository",
      },
      { status: 500 },
    );
  }
}
