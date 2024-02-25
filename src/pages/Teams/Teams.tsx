import { FC, useEffect, useState } from "react";
import TeamsActions from "./TeamsActions";
import Card from "../../components/Card/Card";
import emptyTeams from "../../assets/img/EmptyTeams.png";
import styles from "./Teams.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../core/redux/slices/team/teamActions";
import {
  getNumberOfTeams,
  selectTeams,
} from "../../core/redux/slices/team/teamSlice";
import { Outlet, useLocation } from "react-router-dom";

import Pagination from "../../components/Pagination/Pagination";
import ItemsSelector from "../../ui/ItemsSelector/ItemsSelector";
import EmptyCardMessage from "../../components/EmptyCardMessage/EmptyCardMessage";
const Teams: FC = () => {
  const { teamsContainer, cardsContainer, teamNavigation } = styles;

  const dispatch = useDispatch();
  const teams = useSelector(selectTeams);
  const countTeams = useSelector(getNumberOfTeams);
  const [searchName, setSearchName] = useState<string | undefined>(undefined);
  const [itemsPerPage, setItemsPerPage] = useState<number | undefined>(6);
  const [currentPage, setCurrentPage] = useState(1);
  const options = [
    { value: 6, label: "6" },
    { value: 12, label: "12" },
    { value: 24, label: "24" },
  ];
  const pageCount =
    countTeams && itemsPerPage && Math.ceil(countTeams / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1);
  };

  const location = useLocation();
  const handleFilter = (search: string) => {
    setSearchName(search);
  };

  useEffect(() => {
    location.pathname === "/teams" &&
      !searchName &&
      dispatch(
        getTeams({
          pageSize: itemsPerPage || 6,
          page: pageCount === 1 ? 1 : currentPage,
        }) as any
      );
    if (searchName) {
      dispatch(
        getTeams({ name: searchName, pageSize: itemsPerPage || 6 }) as any
      );
    }

    return () => {
      /* setSearchName(undefined); */
    };
  }, [
    dispatch,
    location.pathname,
    currentPage,
    searchName,
    itemsPerPage,
    pageCount,
  ]);

  return (
    <>
      {location.pathname === "/teams" ? (
        <section className={teamsContainer}>
          <TeamsActions
            inSearch={!!searchName}
            resetAction={() => setSearchName(undefined)}
            filter={(search) => {
              handleFilter(search);
            }}
          />
          {teams && Array.isArray(teams) && teams.length !== 0 ? (
            <>
              <section className={cardsContainer}>
                {teams.map((teams) => {
                  return <Card type='team' {...teams} key={teams.id} />;
                })}
              </section>
              <div className={teamNavigation}>
                <Pagination
                  handlePageClick={(e) => {
                    handlePageClick(e);
                  }}
                  pageCount={pageCount}
                />
                <ItemsSelector
                  placeholder={String(options[0].label)}
                  options={options}
                  handleChange={(option) => setItemsPerPage(option?.value)}
                />
              </div>
            </>
          ) : (
            <>
              <EmptyCardMessage
                imageLink={emptyTeams}
                title='Empty here'
                subTitle={!searchName ? "Add new teams to continue" : undefined}
              />
            </>
          )}
        </section>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Teams;
