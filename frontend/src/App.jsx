import { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthPage, EditePlace, Home, MainPage, NewPlace, PlaceDetails, Places } from "./pages";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const loginHandler = async () => {};
  const logoutHandler = async () => {};

  const value = useMemo(() => ({ isLoggedIn: isLogged, login: loginHandler, logout: logoutHandler }), [isLogged]);
  return (
    <AuthContext.Provider value={value}>
      <MainPage>
        {isLogged ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:userId/places" element={<Places />} />
            <Route path="/places/:placeId" element={<PlaceDetails />} />
            <Route path="/places/new" element={<NewPlace />} />
            <Route path="/places/edite/:placeId" element={<EditePlace />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:userId/places" element={<Places />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        )}
      </MainPage>
    </AuthContext.Provider>
  );
}

export default App;
