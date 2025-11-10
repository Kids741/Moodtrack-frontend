import { Outlet } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";


export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-sky-50">
      {/* Navigation always visible */}
      <NavigationBar />

      {/* Main content (pages from routes) */}
      <main className="flex-grow">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
               
      {/* Footer always visible */}
      <Footer />
    </div>
  );
}
