import React from "react";
import { Container } from "lucide-react";

const Header = () => {
  return (
    <>
      <header className="w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        {" "}
        <div className="w-full max-w-[1800px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          {" "}
          <div className="flex items-center gap-3">
            {" "}
            <div className="w-7 h-7 rounded-md  flex items-center justify-center">
              {" "}
              <Container className="text-white" />{" "}
            </div>{" "}
            <h1 className="text-base font-semibold tracking-tight">
              {" "}
              DockForge{" "}
            </h1>{" "}
          
          </div>{" "}
          <div className="flex items-center gap-3">
            {" "}
           
            <span className="text-xs text-foreground-muted font-mono hidden sm:inline">
              {" "}
              Hacktoberfest 2026{" "}
            </span>{" "}
            <span className="px-2.5 py-1 rounded-full border border-green-500/30 text-xs font-medium text-green-400 bg-green-600/10">
              Open Source
            </span>
          </div>{" "}
        </div>{" "}
      </header>{" "}
    </>
  );
};

export default Header;
