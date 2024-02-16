import { FC, useEffect, useState } from "react";
import TeamsActions from "./TeamsActions";
import TeamCard from "../../components/TeamCard/TeamCard";
import Select from "react-select";
import styles from "./Teams.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../core/redux/slices/team/teamActions";
import {
  getNumberOfTeams,
  selectTeams,
} from "../../core/redux/slices/team/teamSlice";
import { Outlet, useLocation } from "react-router-dom";

import Pagination from "../../components/Pagination/Pagination";
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
        getTeams({ pageSize: itemsPerPage || 6, page: currentPage }) as any
      );
    if (searchName) {
      dispatch(
        getTeams({ name: searchName, pageSize: itemsPerPage || 6 }) as any
      );
    }

    return () => {
      /*   setSearch(undefined); */
    };
  }, [dispatch, location.pathname, currentPage, searchName, itemsPerPage]);

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
          <section className={cardsContainer}>
            {teams && Array.isArray(teams) && teams.length !== 0
              ? teams.map((teams) => {
                  return <TeamCard {...teams} key={teams.id} />;
                })
              : null}
          </section>
          <div className={teamNavigation}>
            <Pagination
              handlePageClick={(e) => {
                handlePageClick(e);
              }}
              pageCount={pageCount}
            />
            <Select
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderColor: "#D1D1D1",
                  borderRadius: "4px",
                }),
              }}
              menuPosition='fixed'
              options={options}
              onChange={(option) => setItemsPerPage(option?.value)}
            />
          </div>
        </section>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Teams;
