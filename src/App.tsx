import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./layouts/Dashboard/Dashboard";
import PrivateRouter from "./Routes/PrivateRouter";
import Teams from "./pages/Teams/Teams";
import Players from "./pages/Players/Players";
import EditProfile from "./pages/EditProfile/EditProfile";
import NotFound from "./pages/NotFound/NotFound";
import AddTeam from "./pages/AddTeam/AddTeam";
import SingleTeam from "./pages/SingleTeam/SingleTeam";
import EditTeam from "./pages/EditTeam/EditTeam";
import TeamsActionsLayout from "./layouts/Teams/TeamsActionsLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/' element={<PrivateRouter component={Dashboard} />}>
          <Route path='teams' element={<Teams />}>
            <Route element={<TeamsActionsLayout />}>
              <Route path='add-team' element={<AddTeam />} />
              <Route path=':teamId' element={<SingleTeam />} />
              <Route path=':teamId/edit' element={<EditTeam />} />
            </Route>
          </Route>

          <Route path='players' element={<Players />}></Route>
          <Route path='edit-profile' element={<EditProfile />}></Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
