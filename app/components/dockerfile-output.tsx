"use client";

import { formatDockerfile } from "@/app/lib/dockerfile-utils";

const card = "bg-background/70 backdrop-blur-sm border border-border rounded-lg";

const SUCCESS_ITEMS = [
  "Dockerfile generated successfully",
  "Configuration verified",
  "Ready to build",
];

const NEXT_STEPS = [
  { step: "1", title: "Build the image",    cmd: "docker build -t your-app ."        },
  { step: "2", title: "Run the container",  cmd: "docker run -p 3000:3000 your-app"  },
];

const CheckIcon = () => (
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
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

interface DockerfileOutputProps {
  dockerfile: string;
  copied: boolean;
  onCopy: () => void;
}

export const DockerfileOutput = ({ dockerfile, copied, onCopy }: DockerfileOutputProps) => (
  <div className="space-y-6 animate-fade-in">
    {/* Dockerfile viewer */}
    <div className={`${card} overflow-hidden`}>
      <div className="flex items-center justify-between px-5 h-12 border-b border-border bg-surface">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Dockerfile</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-mono text-foreground-muted border border-border bg-background">
            dockerfile
          </span>
        </div>
        <button onClick={onCopy} className="hf-button hf-button-sm text-xs">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="bg-background p-6 overflow-x-auto text-sm leading-relaxed">
        <code className="text-foreground">{formatDockerfile(dockerfile)}</code>
      </pre>
    </div>

    {/* Success checklist */}
    <div className={`${card} p-6`}>
      <h3 className="text-sm font-semibold mb-4">Generation Complete</h3>
      <div className="space-y-2 font-mono text-sm">
        {SUCCESS_ITEMS.map((msg) => (
          <div
            key={msg}
            className="flex items-center gap-3 px-3 py-2.5 bg-surface rounded-md border border-border"
          >
            <CheckIcon />
            <span>{msg}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Next steps */}
    <div className={`${card} p-6`}>
      <h3 className="text-sm font-semibold mb-4">Next Steps</h3>
      <div className="space-y-3">
        {NEXT_STEPS.map(({ step, title, cmd }) => (
          <div key={step}>
            <p className="text-xs text-foreground-muted font-medium mb-1.5">
              {step}. {title}
            </p>
            <code className="text-sm font-mono block bg-surface px-3 py-2.5 rounded-md border border-border">
              <span className="text-foreground-subtle select-none">$ </span>
              {cmd}
            </code>
          </div>
        ))}
      </div>
    </div>
  </div>
);
