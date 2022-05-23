import { AuthProvider } from "./context/AuthContext";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar/NavBar";
import Login from "./pages/Login/Login";
import EventsPage from "./pages/EventsPage/EventsPage";
import ProtectedRoute from "./util/ProtectedRoute";
import Register from "./pages/Register/Register";
import CreateEvent from "./pages/CreateEvent";

function App() {
  const xd = () => {
    <h1>XD</h1>;
  };
  return (
    <>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>}/>
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <EventsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create_event"
            element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
