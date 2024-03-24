import { FC, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../core/redux/slices/team/teamActions";
import {
  resetCurrentTeam,
  getNumberOfTeams,
  selectTeams,
  selectTeamStatus,
  resetTeamError,
} from "../../core/redux/slices/team/teamSlice";
import emptyTeams from "../../assets/img/EmptyTeams.png";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import TeamsActions from "./TeamsActions";
import { Card, Pagination, EmptyCardMessage } from "../../components";
import { ItemsSelector } from "../../components/ui";
import { SelectOptions } from "../../components/ui/ItemsSelector/ItemsSelectorProps";
import styles from "./Teams.module.css";

const Teams: FC = () => {
  const { teamsContainer, cardsContainer, teamNavigation } = styles;
  const location = useLocation();

  const dispatchTeam = useTypedDispatch();
  const dispatch = useDispatch();

  const teams = useSelector(selectTeams);
  const countTeams = useSelector(getNumberOfTeams);
  const { addedTeamSuccess } = useSelector(selectTeamStatus);

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
    location.pathname === "/teams" && dispatch(resetCurrentTeam());
    if (searchName) {
      dispatchTeam(getTeams({ name: searchName, pageSize: itemsPerPage || 6 }));
    }

    return () => {
      dispatch(resetTeamError());
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
                {pageCount && pageCount > 1 ? (
                  <Pagination
                    currentPage={currentPage}
                    handlePageClick={(e) => {
                      handlePageClick(e);
                    }}
                    pageCount={pageCount}
                  />
                ) : (
                  <div></div>
                )}
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
