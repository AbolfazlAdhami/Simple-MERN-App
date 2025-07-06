import { Routes, Route } from "react-router-dom";
import { AuthPage, EditePlace, MainPage, NewPlace, PlaceDetails, Places } from "./pages";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
  const { isLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn);
  return (
    <main className="bg-stone-950 text-white w-screen min-h-screen">
      {/* <Routes>
        <Route path="/">
          <Route />
        </Route>
        <Route path="/auth" />
      </Routes> */}
    </main>
  );
}

export default App;
