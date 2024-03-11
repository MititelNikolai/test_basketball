interface PaginationProps {
  handlePageClick: (event: { selected: number }) => void;
  pageCount?: number | null;
  currentPage?: number;
}

export default PaginationProps;
