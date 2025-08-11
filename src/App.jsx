import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-sky-50">
      {/* This is where your current page will be rendered */}
      <Outlet />
    </div>
  );
}
