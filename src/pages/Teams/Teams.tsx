import { FC, useEffect, useState } from "react";
import TeamsActions from "./TeamsActions";
import Card from "../../components/Card/Card";
import emptyTeams from "../../assets/img/EmptyTeams.png";
import styles from "./Teams.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  AllTeamActions,
  getTeams,
} from "../../core/redux/slices/team/teamActions";
import {
  clearCurrentTeam,
  getNumberOfTeams,
  selectTeams,
} from "../../core/redux/slices/team/teamSlice";
import { Outlet, useLocation } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import ItemsSelector from "../../ui/ItemsSelector/ItemsSelector";
import EmptyCardMessage from "../../components/EmptyCardMessage/EmptyCardMessage";
import { RootState } from "../../core/redux/store";
import { SelectOptions } from "../../ui/ItemsSelector/ItemsSelector.types";
import { ThunkDispatch } from "@reduxjs/toolkit";

const Teams: FC = () => {
  const { teamsContainer, cardsContainer, teamNavigation } = styles;
  const dispatchTeam: ThunkDispatch<RootState, void, AllTeamActions> =
    useDispatch();
  const dispatch = useDispatch();
  const teams = useSelector(selectTeams);
  const countTeams = useSelector(getNumberOfTeams);
  const { addedTeamSuccess } = useSelector((state: RootState) => state.team);
  const [searchName, setSearchName] = useState<string | undefined>(undefined);
  const [itemsPerPage, setItemsPerPage] = useState<number | undefined>(6);
  const [currentPage, setCurrentPage] = useState(1);
  const options: Array<SelectOptions> = [
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
      dispatchTeam(
        getTeams({
          pageSize: itemsPerPage || 6,
          page: pageCount === 1 ? 1 : currentPage,
        })
      );
    location.pathname === "/teams" && dispatch(clearCurrentTeam());
    if (searchName) {
      dispatchTeam(getTeams({ name: searchName, pageSize: itemsPerPage || 6 }));
    }
    return () => {
      /* setSearchName(undefined); */
    };
  }, [
    dispatchTeam,
    dispatch,
    location.pathname,
    currentPage,
    searchName,
    itemsPerPage,
    pageCount,
    addedTeamSuccess,
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
                  handleChange={(option) =>
                    setItemsPerPage(Number(option?.value) ?? undefined)
                  }
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
