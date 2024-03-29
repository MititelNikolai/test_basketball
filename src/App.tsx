import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./core/redux/slices/auth/authSlice";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import DashboardLayout from "./layouts/Dashboard/DashboardLayout";
import Teams from "./pages/Teams/Teams";
import Players from "./pages/Players/Players";
import EditProfile from "./pages/EditProfile/EditProfile";
import NotFound from "./pages/NotFound/NotFound";
import AddTeam from "./pages/AddTeam/AddTeam";
import SingleTeam from "./pages/SingleTeam/SingleTeam";
import EditTeam from "./pages/EditTeam/EditTeam";
import TeamsActionsLayout from "./layouts/Teams/TeamsActionsLayout";
import PlayersActionsLayout from "./layouts/Players/PlayersActionsLayout";
import AddPlayer from "./pages/AddPlayer/AddPlayer";
import SinglePlayer from "./pages/SinglePlayers/SinglePlayer";
import EditPlayer from "./pages/EditPlayer/EditPlayer";
import "./App.css";

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='' element={<Navigate to='/teams' replace />} />
        <Route
          path='/'
          element={
            isAuthenticated ? <DashboardLayout /> : <Navigate to='/login' />
          }
        >
          <Route path='teams' element={<Teams />}>
            <Route element={<TeamsActionsLayout />}>
              <Route path='add-team' element={<AddTeam />} />
              <Route path=':teamId' element={<SingleTeam />} />
              <Route path=':teamId/edit' element={<EditTeam />} />
            </Route>
          </Route>

          <Route path='players' element={<Players />}>
            <Route element={<PlayersActionsLayout />}>
              <Route path='add-player' element={<AddPlayer />} />
              <Route path=':playerId' element={<SinglePlayer />} />
              <Route path=':playerId/edit' element={<EditPlayer />} />
            </Route>
          </Route>
          <Route path='edit-profile' element={<EditProfile />}></Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
