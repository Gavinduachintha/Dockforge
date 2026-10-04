import React from "react";

const Hero = () => {
  return (
    <>
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
    </>
  );
};

export default Hero;
