import { FC } from "react";
import ReactPaginate from "react-paginate";
import { IconChevronRight, IconChevronLeft } from "../ui/icons";
import PaginationProps from "./PaginationProps";
import styles from "./Pagination.module.css";

const Pagination: FC<PaginationProps> = ({
  handlePageClick,
  pageCount,
  currentPage,
}) => {
  const { paginationContainer, pageCountNumberActive, pageCountNumber } =
    styles;

  return (
    <ReactPaginate
      initialPage={currentPage && currentPage - 1}
      breakLabel='...'
      breakLinkClassName={pageCountNumber}
      nextLabel={<IconChevronRight />}
      nextClassName={pageCountNumber}
      onPageChange={handlePageClick}
      pageRangeDisplayed={4}
      pageCount={pageCount ? pageCount : 0}
      previousLabel={<IconChevronLeft />}
      previousClassName={pageCountNumber}
      renderOnZeroPageCount={null}
      containerClassName={paginationContainer}
      activeLinkClassName={pageCountNumberActive}
      pageLinkClassName={pageCountNumber}
    />
  );
};

export default Pagination;
