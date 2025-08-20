// src/App.jsx
import { Outlet } from "react-router-dom";
import Therapists from "./pages/Therapists";

import NavigationBar from "./components/NavigationBar.jsx"
function App() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}

export default App;
