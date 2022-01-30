import {
  CompetitionList,
  TeamList,
  CalendarLeague,
  TeamCalendar,
} from "./Components";
import Header from "./Header/Header";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CompetitionList />} />
          <Route path="/teams/:id" element={<TeamList />} />
          <Route path="/calendar/:id" element={<CalendarLeague />} />
          <Route path="/team/:id/calendar" element={<TeamCalendar />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

const Layout = () => {
  return (
    <div className="App">
      <Header />
      <div className="body">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
