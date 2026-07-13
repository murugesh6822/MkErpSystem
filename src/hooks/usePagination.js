import { useMemo, useState } from 'react';

export const usePagination = (items, pageSize = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const pagedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);

  const resetPage = () => setCurrentPage(1);

  return { currentPage, setCurrentPage, totalPages, pagedItems, resetPage };
};
