"use client";

import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50">
      <div className="mx-auto max-w-[1150px] px-4">
        <p className="font-medium text-foreground/80">
          Made by <span className="animated-gradient-text font-semibold">Aryan Bhalsing</span>
        </p>
        <div className="flex items-center justify-center gap-5 mt-4">
          <a
            href="https://github.com/iamaryanbhalsing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/iamaryanbhalsing/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com/iam._aryanbhalsing/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
        </div>

        <div className="mt-5 pt-5 border-t border-border/30">
          <a
            href="https://drive.google.com/drive/folders/1zGpqYDfLWRASqlsw4GMhmxxbDW5D_REA?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand/5 border border-brand/15 text-brand text-xs font-medium hover:bg-brand/10 hover:border-brand/25 transition-all"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            All EDS Resources on Google Drive
          </a>
        </div>

        <p className="mt-4 text-xs text-muted-foreground/50">
          &copy; {new Date().getFullYear()} Aryan Bhalsing &middot; All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
