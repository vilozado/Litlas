import { useState } from "react";
import Map from "../Map/Map";
import Nav from "../Nav/Nav";
import SidebarList from "../SidebarList/SidebarList";
import { useBookContext } from "../../context/useBookContext";
import ErrorBoundary from "../ErrorBoundary";

export default function Dashboard() {
  const [showSidebar, setShowsideBar] = useState(false);
  const { loadingApp } = useBookContext();
  return (
    <>
      <Nav onMyListClick={() => setShowsideBar((toggle) => !toggle)} />
      {loadingApp ? (
        <h1>Loading...</h1>
      ) : (
        <div className="app-content">
          <ErrorBoundary fallback={<p>The map failed to load. Please refresh the page.</p>}>
            <Map />
          </ErrorBoundary>
          {showSidebar && <SidebarList />}
        </div>
      )}
    </>
  );
}
