import React from "react";
import RowParPageDropdown from './rowParPageDropdown';

interface PageItemType {
  page: number | string;
  isActive: boolean;
  setPage(page: number): void
}

interface PaginationType {
  currentPage: number;
  pages: (string | number)[];
  totalItem: number;
  rowsPerPage: number;
  setPage(page: number): void
  setRowsPerPage(page: number): void
}

const PageItem = ({
  page,
  isActive,
  setPage
}: PageItemType) => {

  const handlePage = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!isActive && page) {
      setPage(page as number)
    }
  }

  const activeClass = isActive ? "z-10  border-indigo-500 bg-indigo-50 text-indigo-600" : "border-gray-300 bg-whitetext-gray-500 hover:bg-gray-50";
  return (
    <a
      href="#"
      className={`${activeClass} ${!page ? 'empty-page' : ''} inline-flex items-center border px-4 py-2 focus:z-20 text-sm font-medium`}
      onClick={handlePage}

    >
      {page || '...'}
    </a>
  )
}


const Pagination = ({
  setPage,
  currentPage,
  pages,
  totalItem,
  rowsPerPage,
  setRowsPerPage
}: PaginationType) => {

  const handlePreviousPage = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setPage(currentPage + 1);
  }

  const handleNextPage = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setPage(currentPage + 1);
  }

  const totalPage = pages[pages.length - 1];

  if (pages.length < 2) {
    return null;
  }

  const showTotalThisPage = (currentPage * rowsPerPage);

  return (
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between border-t pt-2 mt-4 mb-4">
      <div>
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{(showTotalThisPage - (rowsPerPage - 1))}</span> to <span className="font-medium">{showTotalThisPage}</span> of{' '}
          <span className="font-medium">{totalItem}</span> results
        </p>
      </div>

      <div>
        <RowParPageDropdown
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </div>

      <div>
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          {
            currentPage > 1 &&
            <a href="#" onClick={handlePreviousPage} className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
              <span className="sr-only">Previous</span>
              {/* <!-- Heroicon name: mini/chevron-left --> */}
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
              </svg>
            </a>
          }

          {
            pages.map((page: number | string, index: number) =>
              <PageItem
                key={index}
                page={page}
                isActive={page === currentPage}
                setPage={setPage}
              />
            )
          }

          {
            (totalPage && totalPage > currentPage) &&
            <a href="#" onClick={handleNextPage} className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </a>
          }
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
