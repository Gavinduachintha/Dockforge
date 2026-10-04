import React from "react";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-background/80 backdrop-blur-md mt-auto">
      <div className="w-full max-w-[1800px] mx-auto px-6 lg:px-12 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground-muted">
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/Gavinduachintha/Dockforge"
              className="hover:text-foreground transition-colors duration-150"
            >
              GitHub
            </a>
          </div>
          <span className="font-mono text-xs text-foreground-subtle flex items-center gap-1">
            Built with <Heart className="size-3 fill-current text-red-500" />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
