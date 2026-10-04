import { Spinner } from "@/app/components/spinner";

const card = "bg-background/70 backdrop-blur-sm border border-border rounded-lg";

const STEPS = [
  { num: "01", label: "Analyzing repository structure",     active: true  },
  { num: "02", label: "Detecting framework & dependencies", active: false },
  { num: "03", label: "Generating optimized Dockerfile",    active: false },
  { num: "04", label: "Running verification checks",        active: false },
];

export const LoadingStatus = () => (
  <div className={`${card} p-6 animate-fade-in`}>
    <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
      <Spinner className="h-4 w-4" />
      Processing Repository
    </h3>

    <div className="space-y-2 font-mono text-sm">
      {STEPS.map(({ num, label, active }) => (
        <div
          key={num}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-md border ${
            active
              ? "border-border bg-surface text-foreground"
              : "border-transparent text-foreground-subtle"
          }`}
        >
          <span>{num}</span>
          <span className="flex-1">{label}</span>
          {active && (
            <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
          )}
        </div>
      ))}
    </div>
  </div>
);
