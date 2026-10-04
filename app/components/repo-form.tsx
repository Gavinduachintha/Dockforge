"use client";

import { Spinner } from "@/app/components/spinner";

const card = "bg-background/70 backdrop-blur-sm border border-border rounded-lg";

interface RepoFormProps {
  repoUrl: string;
  isLoading: boolean;
  error: string;
  onChange: (url: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const RepoForm = ({
  repoUrl,
  isLoading,
  error,
  onChange,
  onSubmit,
}: RepoFormProps) => (
  <div className={`${card} p-6`}>
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="repo-url" className="block text-sm font-medium mb-2">
          GitHub Repository URL
        </label>
        <input
          type="url"
          id="repo-url"
          value={repoUrl}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://github.com/username/repository"
          required
          className="w-full h-11 px-3 bg-background border border-border rounded-md text-foreground placeholder-foreground-subtle focus:outline-none focus:border-foreground focus:ring-4 focus:ring-black/5 transition-all duration-150 font-mono text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !repoUrl}
        className="hf-button w-full gap-2 text-sm"
      >
        {isLoading ? (
          <>
            <Spinner />
            <span>Analyzing repository...</span>
          </>
        ) : (
          <span>Analyze & Generate Dockerfile</span>
        )}
      </button>
    </form>

    {error && (
      <div className="mt-4 p-4 bg-surface border border-accent-error/40 rounded-md animate-fade-in">
        <p className="text-accent-error text-sm font-medium">Analysis Failed</p>
        <p className="text-foreground-muted text-sm mt-1">{error}</p>
      </div>
    )}
  </div>
);
