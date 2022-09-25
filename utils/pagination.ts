export const createPagination = (currentPage: number, rowsPerPage = 10, dataCount: number) => {
  const totalPages = Math.ceil(dataCount / rowsPerPage)

  let beforePage = currentPage - 1;
  let afterPage = currentPage + 1;
  const pages = [];

  if (currentPage > 2) { //if page value is less than 2 then add 1 after the previous button
    pages.push(1);
    if (currentPage > 3) { //if page value is greater than 3 then add this (...) after the first li or page
      // ... show on pagination
      pages.push('');
    }
  }

  // how many pages or li show before the current li
  if (currentPage == totalPages) {
    beforePage = beforePage - 2;
  } else if (currentPage == totalPages - 1) {
    beforePage = beforePage - 1;
  }

  // how many pages or li show after the current li
  if (currentPage == 1) {
    afterPage = afterPage + 2;
  } else if (currentPage == 2) {
    afterPage = afterPage + 1;
  }

  for (var pLength = beforePage; pLength <= afterPage; pLength++) {
    if (pLength > totalPages) { //if pLength is greater than totalPage length then continue
      continue;
    }
    if (pLength == 0) { //if pLength is 0 than add +1 in pLength value
      pLength = pLength + 1;
    }
    pages.push(pLength)
  }

  if (currentPage < totalPages - 1) { //if page value is less than totalPage value by -1 then show the last li or page
    if (currentPage < totalPages - 2) { //if page value is less than totalPage value by -2 then add this (...) before the last li or page
      pages.push('')
    }
    pages.push(totalPages)
  }

  return pages;
}
