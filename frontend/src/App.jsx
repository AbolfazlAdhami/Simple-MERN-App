import React, { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthPage, EditePlace, Home, MainPage, NewPlace, PlaceDetails, Places } from "./pages";
import { AuthContext } from "./context/AuthContext";
function App() {
  const [isLogged, setIsLogged] = useState(true);

  const loginHandler = async () => {};
  const logoutHandler = async () => {};
  const value = useMemo(() => ({ isLoggedIn: isLogged, login: loginHandler, logout: logoutHandler }), [isLogged]);
  return (
    <AuthContext.Provider value={value}>
      <main className="bg-stone-950 text-white w-screen min-h-screen">
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route element={<MainPage />}>
            <Route index element={<Home />} />
            {isLogged && (
              <Route path="/place">
                <Route index element={<Places />} />
                <Route path=":id" element={<PlaceDetails />} />
                <Route path="new" element={<NewPlace />} />
                <Route path="edite/:id" element={<EditePlace />} />
              </Route>
            )}
            <Route />
          </Route>
        </Routes>
      </main>
    </AuthContext.Provider>
  );
}

export default App;
