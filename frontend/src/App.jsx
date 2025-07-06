import { Routes, Route } from "react-router-dom";
import { AuthPage, EditePlace, Home, MainPage, NewPlace, PlaceDetails, Places } from "./pages";
import { useContext } from "react";
import { authContext } from "./context/AuthContext";
function App() {
  const { isLoggedIn } = useContext(authContext);
  return (
    <main className="bg-stone-950 text-white w-screen min-h-screen">
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route element={<MainPage />}>
          <Route index element={<Home />} />
          {isLoggedIn && (
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
  );
}

export default App;
