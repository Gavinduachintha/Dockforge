"use client";

import { useState } from "react";
import Header from "@/app/components/header";
import Hero from "@/app/components/hero";
import Footer from "@/app/components/footer";
import { RepoForm } from "@/app/components/repo-form";
import { LoadingStatus } from "@/app/components/loading-status";
import { DockerfileOutput } from "@/app/components/dockerfile-output";

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
      if (!response.ok)
        throw new Error(data.error || "Failed to analyze repository");
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
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-dvh w-full flex flex-col bg-transparent text-foreground">
      <Header />

      <main className="flex-1 w-full">
        <div className="w-full max-w-[1800px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <Hero />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left — input */}
            <div className="space-y-6 lg:sticky lg:top-24">
              <RepoForm
                repoUrl={repoUrl}
                isLoading={isLoading}
                error={error}
                onChange={setRepoUrl}
                onSubmit={handleSubmit}
              />
              {isLoading && <LoadingStatus />}
            </div>

            {/* Right — output */}
            <div>
              {dockerfile ? (
                <DockerfileOutput
                  dockerfile={dockerfile}
                  copied={copied}
                  onCopy={copyToClipboard}
                />
              ) : (
                <div className="hidden lg:flex h-80 items-center justify-center border border-dashed border-border-strong rounded-lg text-foreground-subtle font-mono text-sm">
                  Your Dockerfile will appear here
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
