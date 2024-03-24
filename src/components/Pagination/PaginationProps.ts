export interface PaginationProps {
  handlePageClick: (event: { selected: number }) => void;
  pageCount?: number;
  currentPage?: number;
}
