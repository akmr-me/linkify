import publicConfig from "@/lib/publicConfig";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 mt-16">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <p>© {new Date().getFullYear()} Linkify. All rights reserved.</p>
          </div>

          <div className="flex items-center">
            <span>
              A project by
              <Link
                href={publicConfig.portfolioURL}
                target="_blank"
                className="ml-1 text-primary hover:text-primary/80 transition-colors font-medium"
              >
                {publicConfig.creatorName}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
