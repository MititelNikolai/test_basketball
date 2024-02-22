import { FC, useEffect, useState } from "react";
import styles from "./Players.module.css";
import PlayersActions from "./PlayersActions";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getNumberOfPlayers,
  selectPlayers,
} from "../../core/redux/slices/player/playerSlice";
import { getPlayers } from "../../core/redux/slices/player/playerAction";
import { selectTeams } from "../../core/redux/slices/team/teamSlice";
import { transformPlayersData } from "../../utils/teamIdToName";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";
import ItemsSelector from "../../ui/ItemsSelector/ItemsSelector";
import EmptyCardMessage from "../../components/EmptyCardMessage/EmptyCardMessage";
import emptyPlayers from "../../assets/img/emptyPlayers.png";
import { getTeams } from "../../core/redux/slices/team/teamActions";

const Players: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const players = useSelector(selectPlayers);
  const teams = useSelector(selectTeams);
  const [playersOnDisplay, setPlayersOnDisplay] = useState<any>(undefined);
  const countPlayers = useSelector(getNumberOfPlayers);
  const [searchName, setSearchName] = useState<string | undefined>(undefined);
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
    if (location.pathname === "/players" && !searchName) {
      dispatch(getTeams({}) as any);
      dispatch(
        getPlayers({
          pageSize: itemsPerPage || 6,
          page: pageCount === 1 ? 1 : currentPage,
        }) as any
      );
    }
    if (teams.length !== 0) {
      setPlayersOnDisplay(transformPlayersData(players, teams));
    }
    if (searchName) {
      dispatch(
        getPlayers({ name: searchName, pageSize: itemsPerPage || 6 }) as any
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
  const { playersContainer, cardsContainer, playersNavigation } = styles;
  return (
    <>
      {location.pathname === "/players" ? (
        <section className={playersContainer}>
          <PlayersActions
            inSearch={!!searchName}
            resetAction={() => setSearchName(undefined)}
            filter={(search) => {
              handleFilter(search);
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
                  handlePageClick={(e) => {
                    handlePageClick(e);
                  }}
                  pageCount={pageCount}
                />
                <ItemsSelector
                  options={options}
                  handleChange={(option) => setItemsPerPage(option?.value)}
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
