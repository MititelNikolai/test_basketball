import { FC, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCurrentPlayer,
  getNumberOfPlayers,
  selectPlayers,
} from "../../core/redux/slices/player/playerSlice";
import { getPlayers } from "../../core/redux/slices/player/playerAction";
import { selectTeams } from "../../core/redux/slices/team/teamSlice";
import emptyPlayers from "../../assets/img/emptyPlayers.png";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { transformPlayersData } from "../../utils/teamIdToName";
import PlayersActions from "./PlayersActions";
import { Card, Pagination, EmptyCardMessage } from "../../components";
import { ItemsSelector } from "../../components/ui";
import { DisplayData } from "./Players.interfaces";
import { SelectOptions } from "./components/PlayerMultiSelect/PlayerMultiSelect.interfaces";
import styles from "./Players.module.css";

const Players: FC = () => {
  const location = useLocation();
  const dispatchPlayers = useTypedDispatch();
  const dispatch = useDispatch();
  const players = useSelector(selectPlayers);
  const teams = useSelector(selectTeams);

  const [playersOnDisplay, setPlayersOnDisplay] = useState<
    Array<DisplayData> | undefined
  >(undefined);

  const countPlayers = useSelector(getNumberOfPlayers);
  const [searchName, setSearchName] = useState<string | undefined>(undefined);
  const [searchTeam, setSearchTeam] = useState<Array<SelectOptions>>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number | undefined>(6);
  const [currentPage, setCurrentPage] = useState(1);

  const options = [
    { value: 6, label: "6" },
    { value: 12, label: "12" },
    { value: 24, label: "24" },
  ];

  const pageCount =
    countPlayers && itemsPerPage && Math.ceil(countPlayers / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1);
  };

  const handleFilter = (search: string) => {
    setSearchName(search);
  };

  useEffect(() => {
    if (
      location.pathname === "/players" &&
      !searchName &&
      searchTeam.length === 0
    ) {
      dispatch(resetCurrentPlayer());
      dispatchPlayers(
        getPlayers({
          pageSize: itemsPerPage || 6,
          page: pageCount === 1 ? 1 : currentPage,
        })
      );
    }
  }, [
    dispatch,
    dispatchPlayers,
    location.pathname,
    currentPage,
    itemsPerPage,
    pageCount,
    searchTeam.length,
    searchName,
  ]);

  useEffect(() => {
    if (searchName && !searchTeam) {
      dispatchPlayers(
        getPlayers({ name: searchName, pageSize: itemsPerPage || 6 })
      );
    }
    if (searchTeam && !searchName) {
      const teamIds = searchTeam.map((team) => Number(team.value));
      dispatchPlayers(
        getPlayers({
          teamIds,
          pageSize: itemsPerPage || 6,
        })
      );
    }
    if (searchName && searchTeam) {
      const teamIds = searchTeam.map((team) => Number(team.value));
      dispatchPlayers(
        getPlayers({
          name: searchName,
          teamIds,
          pageSize: itemsPerPage || 6,
        })
      );
    }
  }, [searchName, searchTeam, itemsPerPage, dispatchPlayers]);

  useEffect(() => {
    setPlayersOnDisplay(transformPlayersData(players, teams));
  }, [players, teams]);
  const { playersContainer, cardsContainer, playersNavigation } = styles;

  return (
    <>
      {location.pathname === "/players" ? (
        <section className={playersContainer}>
          <PlayersActions
            inSearch={!!searchName}
            resetAction={() => {
              setSearchName(undefined);
              setSearchTeam([]);
            }}
            filterName={(search) => {
              handleFilter(search);
            }}
            searchTeam={searchTeam}
            filterTeams={(selected) => {
              setSearchTeam(selected);
            }}
          />

          {playersOnDisplay &&
          Array.isArray(playersOnDisplay) &&
          playersOnDisplay.length !== 0 ? (
            <>
              <section className={cardsContainer}>
                {playersOnDisplay.map((players) => {
                  return <Card type='player' {...players} key={players.id} />;
                })}
              </section>
              <div className={playersNavigation}>
                <Pagination
                  currentPage={currentPage}
                  handlePageClick={(e) => {
                    handlePageClick(e);
                  }}
                  pageCount={pageCount}
                />
                <ItemsSelector
                  placeholder={String(options[0].label)}
                  options={options}
                  handleChange={(option) => {
                    setItemsPerPage(Number(option?.value) ?? undefined);
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <EmptyCardMessage
                imageLink={emptyPlayers}
                title='Empty here'
                subTitle={
                  !searchName ? "Add new players to continue" : undefined
                }
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

export default Players;
