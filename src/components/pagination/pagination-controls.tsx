// components/pagination-controls.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PaginationControls({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  // create a array for contain page numbers
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 flex-wrap mt-8">
      {currentPage > 1 && (
        <Link href={`/blogs?page=${currentPage - 1}`}>
          <Button className="cursor-pointer" variant="secondary">
            Previous
          </Button>
        </Link>
      )}

      {pages.map((page) => (
        <Link key={page} href={`/blogs?page=${page}`}>
          <Button
            variant={page === currentPage ? "default" : "secondary"}
            className={
              page === currentPage
                ? "bg-black border-1 hover:bg-white hover:text-black transition-all duration-300  text-white font-bold cursor-pointer"
                : "cursor-pointer"
            }
          >
            {page}
          </Button>
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link href={`/blogs?page=${currentPage + 1}`}>
          <Button className="cursor-pointer" variant="secondary">
            Next
          </Button>
        </Link>
      )}
    </div>
  );
}
