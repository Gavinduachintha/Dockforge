"use client";
import { useState } from "react";
const KEYWORDS = [
  "FROM",
  "WORKDIR",
  "COPY",
  "RUN",
  "EXPOSE",
  "CMD",
  "ENV",
  "ARG",
  "ENTRYPOINT",
  "ADD",
  "LABEL",
];
const Spinner = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    className={`animate-spin ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    {" "}
    <circle
      className="opacity-20"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />{" "}
    <path
      className="opacity-90"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />{" "}
  </svg>
);
const card =
  "bg-background/70 backdrop-blur-sm border border-border rounded-lg";
export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dockerfile, setDockerfile] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setDockerfile("");
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze repository");
      }
      setDockerfile(data.dockerfile);
    } catch (err: any) {
      setError(
        err.message ||
          "Failed to analyze repository. Please check the URL and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(dockerfile);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };
  const formatDockerfile = (content: string) => {
    return content.split("\n").map((line, idx) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("#")) {
        return (
          <span key={idx} className="dockerfile-line dockerfile-comment">
            {" "}
            {line}{" "}
          </span>
        );
      }
      for (const keyword of KEYWORDS) {
        if (trimmedLine.startsWith(keyword)) {
          const parts = line.split(keyword);
          return (
            <span key={idx} className="dockerfile-line">
              {" "}
              {parts[0]} <span className="dockerfile-keyword">{keyword}</span>{" "}
              {parts[1]}{" "}
            </span>
          );
        }
      }
      return (
        <span key={idx} className="dockerfile-line">
          {" "}
          {line}{" "}
        </span>
      );
    });
  };
  return (
    <div className="min-h-dvh w-full flex flex-col bg-transparent text-foreground">
      {" "}
      {/* Header */}{" "}
      <header className="w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        {" "}
        <div className="w-full max-w-[1800px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          {" "}
          <div className="flex items-center gap-3">
            {" "}
            <div className="w-7 h-7 rounded-md bg-foreground flex items-center justify-center">
              {" "}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                {" "}
                <path d="M12 3L23 21H1L12 3Z" fill="white" />{" "}
              </svg>{" "}
            </div>{" "}
            <span className="text-border-strong select-none">/</span>{" "}
            <h1 className="text-base font-semibold tracking-tight">
              {" "}
              DockForge{" "}
            </h1>{" "}
            <span className="text-xs text-foreground-subtle font-mono">
              {" "}
              v1.0.0{" "}
            </span>{" "}
          </div>{" "}
          <div className="flex items-center gap-3">
            {" "}
            <span className="text-xs text-foreground-muted font-mono hidden sm:inline">
              {" "}
              Hacktoberfest 2026{" "}
            </span>{" "}
            <span className="px-2.5 py-1 rounded-full border border-border text-xs font-medium text-foreground">
              {" "}
              Open Source{" "}
            </span>{" "}
          </div>{" "}
        </div>{" "}
      </header>{" "}
      {/* Main */}{" "}
      <main className="flex-1 w-full">
        {" "}
        <div className="w-full max-w-[1800px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
          {" "}
          {/* Hero */}{" "}
          <div className="mb-12">
            {" "}
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter mb-4">
              {" "}
              AI-Powered Dockerfile Generator{" "}
            </h2>{" "}
            <p className="text-foreground-muted text-lg lg:text-xl max-w-2xl mb-6">
              {" "}
              Analyze your repository and generate optimized Docker
              configurations.{" "}
            </p>{" "}
            <div className="flex flex-wrap items-center gap-6 text-sm text-foreground-subtle font-mono">
              {" "}
              {["Repository Analysis", "AI Planning", "Docker Generation"].map(
                (label) => (
                  <div key={label} className="flex items-center gap-2">
                    {" "}
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground" />{" "}
                    <span>{label}</span>{" "}
                  </div>
                ),
              )}{" "}
            </div>{" "}
          </div>{" "}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {" "}
            {/* Left column */}{" "}
            <div className="space-y-6 lg:sticky lg:top-24">
              {" "}
              {/* Input form */}{" "}
              <div className={`${card} p-6`}>
                {" "}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {" "}
                  <div>
                    {" "}
                    <label
                      htmlFor="repo-url"
                      className="block text-sm font-medium mb-2"
                    >
                      {" "}
                      GitHub Repository URL{" "}
                    </label>{" "}
                    <input
                      type="url"
                      id="repo-url"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      placeholder="https://github.com/username/repository"
                      required
                      className="w-full h-11 px-3 bg-background border border-border rounded-md text-foreground placeholder-foreground-subtle focus:outline-none focus:border-foreground focus:ring-4 focus:ring-black/5 transition-all duration-150 font-mono text-sm"
                    />{" "}
                  </div>{" "}
                  {/* Hacktoberfest-style primary button */}{" "}
                  <button
                    type="submit"
                    disabled={isLoading || !repoUrl}
                    className="hf-button w-full gap-2 text-sm"
                  >
                    {" "}
                    {isLoading ? (
                      <>
                        {" "}
                        <Spinner /> <span>Analyzing repository...</span>{" "}
                      </>
                    ) : (
                      <span>Analyze & Generate Dockerfile</span>
                    )}{" "}
                  </button>{" "}
                </form>{" "}
                {/* Error */}{" "}
                {error && (
                  <div className="mt-4 p-4 bg-surface border border-accent-error/40 rounded-md animate-fade-in">
                    {" "}
                    <p className="text-accent-error text-sm font-medium">
                      {" "}
                      Analysis Failed{" "}
                    </p>{" "}
                    <p className="text-foreground-muted text-sm mt-1">
                      {" "}
                      {error}{" "}
                    </p>{" "}
                  </div>
                )}{" "}
              </div>{" "}
              {/* Loading status */}{" "}
              {isLoading && (
                <div className={`${card} p-6 animate-fade-in`}>
                  {" "}
                  <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                    {" "}
                    <Spinner className="h-4 w-4" /> Processing Repository{" "}
                  </h3>{" "}
                  <div className="space-y-2 font-mono text-sm">
                    {" "}
                    {[
                      ["01", "Analyzing repository structure", true],
                      ["02", "Detecting framework & dependencies", false],
                      ["03", "Generating optimized Dockerfile", false],
                      ["04", "Running verification checks", false],
                    ].map(([num, label, active]) => (
                      <div
                        key={num as string}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-md border ${active ? "border-border bg-surface text-foreground" : "border-transparent text-foreground-subtle"}`}
                      >
                        {" "}
                        <span>{num}</span>{" "}
                        <span className="flex-1">{label}</span>{" "}
                        {active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
                        )}{" "}
                      </div>
                    ))}{" "}
                  </div>{" "}
                </div>
              )}{" "}
            </div>{" "}
            {/* Right column */}{" "}
            <div>
              {" "}
              {dockerfile ? (
                <div className="space-y-6 animate-fade-in">
                  {" "}
                  {/* Dockerfile */}{" "}
                  <div className={`${card} overflow-hidden`}>
                    {" "}
                    <div className="flex items-center justify-between px-5 h-12 border-b border-border bg-surface">
                      {" "}
                      <div className="flex items-center gap-2">
                        {" "}
                        <span className="text-sm font-medium">
                          {" "}
                          Dockerfile{" "}
                        </span>{" "}
                        <span className="px-2 py-0.5 rounded-full text-xs font-mono text-foreground-muted border border-border bg-background">
                          {" "}
                          dockerfile{" "}
                        </span>{" "}
                      </div>{" "}
                      {/* Hacktoberfest-style small button */}{" "}
                      <button
                        onClick={copyToClipboard}
                        className="hf-button hf-button-sm text-xs"
                      >
                        {" "}
                        {copied ? "Copied" : "Copy"}{" "}
                      </button>{" "}
                    </div>{" "}
                    <pre className="bg-background p-6 overflow-x-auto text-sm leading-relaxed">
                      {" "}
                      <code className="text-foreground">
                        {" "}
                        {formatDockerfile(dockerfile)}{" "}
                      </code>{" "}
                    </pre>{" "}
                  </div>{" "}
                  {/* Success */}{" "}
                  <div className={`${card} p-6`}>
                    {" "}
                    <h3 className="text-sm font-semibold mb-4">
                      {" "}
                      Generation Complete{" "}
                    </h3>{" "}
                    <div className="space-y-2 font-mono text-sm">
                      {" "}
                      {[
                        "Dockerfile generated successfully",
                        "Configuration verified",
                        "Ready to build",
                      ].map((msg) => (
                        <div
                          key={msg}
                          className="flex items-center gap-3 px-3 py-2.5 bg-surface rounded-md border border-border"
                        >
                          {" "}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {" "}
                            <path d="M20 6L9 17l-5-5" />{" "}
                          </svg>{" "}
                          <span>{msg}</span>{" "}
                        </div>
                      ))}{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* Next steps */}{" "}
                  <div className={`${card} p-6`}>
                    {" "}
                    <h3 className="text-sm font-semibold mb-4">
                      {" "}
                      Next Steps{" "}
                    </h3>{" "}
                    <div className="space-y-3">
                      {" "}
                      {[
                        ["Build the image", "1", "docker build -t your-app ."],
                        [
                          "Run the container",
                          "2",
                          "docker run -p 3000:3000 your-app",
                        ],
                      ].map(([title, step, cmd]) => (
                        <div key={step}>
                          {" "}
                          <p className="text-xs text-foreground-muted font-medium mb-1.5">
                            {" "}
                            {step}. {title}{" "}
                          </p>{" "}
                          <code className="text-sm font-mono block bg-surface px-3 py-2.5 rounded-md border border-border">
                            {" "}
                            <span className="text-foreground-subtle select-none">
                              {" "}
                              ${" "}
                            </span>{" "}
                            {cmd}{" "}
                          </code>{" "}
                        </div>
                      ))}{" "}
                    </div>{" "}
                  </div>{" "}
                </div>
              ) : (
                <div className="hidden lg:flex h-80 items-center justify-center border border-dashed border-border-strong rounded-lg text-foreground-subtle font-mono text-sm">
                  {" "}
                  Your Dockerfile will appear here{" "}
                </div>
              )}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </main>{" "}
      {/* Footer */}{" "}
      <footer className="w-full border-t border-border bg-background/80 backdrop-blur-md mt-auto">
        {" "}
        <div className="w-full max-w-[1800px] mx-auto px-6 lg:px-12 py-6">
          {" "}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground-muted">
            {" "}
            <div className="flex items-center gap-5">
              {" "}
              <a
                href="https://github.com/Gavinduachintha/Dockforge"
                className="hover:text-foreground transition-colors duration-150"
              >
                {" "}
                GitHub{" "}
              </a>{" "}
            </div>{" "}
            <span className="font-mono text-xs text-foreground-subtle">
              {" "}
              Built with AI{" "}
            </span>{" "}
          </div>{" "}
        </div>{" "}
      </footer>{" "}
    </div>
  );
}
