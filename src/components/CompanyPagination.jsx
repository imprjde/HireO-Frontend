import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useGetCompanies from "@/hooks/useGetCompanies";

export default function CompanyPagination() {
  const { page, totalPages, handlePageChange } = useGetCompanies();

  const handlePageClick = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      handlePageChange(newPage);
    }
  };

  const renderPageNumbers = () => {
    const visiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, page + Math.floor(visiblePages / 2));

    if (endPage - startPage + 1 < visiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + visiblePages - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - visiblePages + 1);
      }
    }

    return (
      <>
        {startPage > 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                onClick={() => handlePageClick(1)}
                className="bg-stone-900 cursor-pointer text-white hover:bg-stone-900 hover:text-white"
              >
                1
              </PaginationLink>
            </PaginationItem>
            {startPage > 2 && (
              <PaginationItem>
                <PaginationEllipsis className="text-white" />
              </PaginationItem>
            )}
          </>
        )}

        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <PaginationItem key={startPage + index} className="cursor-pointer">
            <PaginationLink
              onClick={() => handlePageClick(startPage + index)}
              className={
                page === startPage + index
                  ? "bg-white text-black"
                  : "bg-stone-900 text-white hover:bg-stone-900 hover:text-white"
              }
            >
              {startPage + index}
            </PaginationLink>
          </PaginationItem>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis className="text-white" />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                onClick={() => handlePageClick(totalPages)}
                className="bg-stone-900 cursor-pointer text-white hover:bg-stone-900 hover:text-white"
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
      </>
    );
  };

  return (
    <div>
      <Pagination>
        <PaginationContent className="space-x-2">
          <PaginationItem>
            <PaginationPrevious
              className="text-white cursor-pointer hover:bg-black hover:text-sky-300"
              onClick={() => handlePageClick(page - 1)}
              disabled={page <= 1}
            >
              Previous
            </PaginationPrevious>
          </PaginationItem>

          {renderPageNumbers()}

          <PaginationItem>
            <PaginationNext
              className="text-white cursor-pointer hover:bg-black hover:text-sky-300"
              onClick={() => handlePageClick(page + 1)}
              disabled={page >= totalPages}
            >
              Next
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
