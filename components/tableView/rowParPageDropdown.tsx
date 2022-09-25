import React from "react";

const options = [10, 20, 50, 100];

interface RowParPageDropdownType {
  rowsPerPage: number;
  setRowsPerPage(page: number): void;
}

interface OptionType {
  value: number;
  rowsPerPage: number;
  setRowsPerPage(page: number): void;
}

const Option = ({
  value,
  rowsPerPage,
  setRowsPerPage
}: OptionType) => {

  const handlePreviousPage = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (rowsPerPage != value) {
      setRowsPerPage(value);
    }
  }

  return (
    <a href="#" onClick={handlePreviousPage} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">{value}</a>
  )
}

const RowParPageDropdown = ({
  setRowsPerPage,
  rowsPerPage
}: RowParPageDropdownType) => {
  const [isOpenDropdown, setOpen] = React.useState<boolean>(false);

  const handleClick = () => {
    setOpen(!isOpenDropdown)
  }


  const handleSetRow = (pageLimit: number) => {
    setOpen(!isOpenDropdown)
    setRowsPerPage(pageLimit);
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button type="button" onClick={handleClick} className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true">
          Rows per page ({rowsPerPage})
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {
        isOpenDropdown &&
        <div className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
          <div className="py-1" role="none">
            {
              options.map(value =>
                <Option
                  setRowsPerPage={handleSetRow}
                  rowsPerPage={rowsPerPage}
                  value={value}
                  key={value}
                />
              )
            }
          </div>
        </div>
      }
    </div>
  )
}

export default RowParPageDropdown;
