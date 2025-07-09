import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { getRelatedPages } from "@/utils/seo-helpers";

interface InternalLinksProps {
  currentPage: string;
  className?: string;
}

export function InternalLinks({ currentPage, className = "" }: InternalLinksProps) {
  const relatedPages = getRelatedPages(currentPage);

  if (relatedPages.length === 0) return null;

  return (
    <section className={`py-12 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Related Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {relatedPages.map((page) => (
            <Link
              key={page.url}
              href={page.url}
              className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-primary/20"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary transition-colors">
                  {page.title}
                </h3>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}