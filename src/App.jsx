import { Outlet } from "react-router-dom";
import NavigationBar from "./components/NavigationBar.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
