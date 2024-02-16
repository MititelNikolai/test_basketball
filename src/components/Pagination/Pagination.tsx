import { FC } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";
import IconChevronRight from "../../ui/icons/IconChevronRight";
import IconChevronLeft from "../../ui/icons/IconChevronLeft";
interface PaginationProps {
  handlePageClick: (event: { selected: number }) => void;
  pageCount: number | null | undefined;
}

const Pagination: FC<PaginationProps> = ({ handlePageClick, pageCount }) => {
  const { paginationContainer, pageCountNumberActive, pageCountNumber } =
    styles;

  return (
    <ReactPaginate
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
