import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./layouts/Dashboard/Dashboard";
import PrivateRouter from "./Routes/PrivateRouter";
import Teams from "./pages/Teams/Teams";
import Players from "./pages/Players/Players";
import EditProfile from "./pages/EditProfile/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/' element={<PrivateRouter component={Dashboard} />}>
          <Route path='teams' element={<Teams />}></Route>
          <Route path='players' element={<Players />}></Route>
          <Route path='edit-profile' element={<EditProfile />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
