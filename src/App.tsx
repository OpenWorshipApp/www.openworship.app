import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import MenuBar from "./components/MenuBar";
import HomePage from "./pages/HomePage";
import DownloadPage from "./pages/DownloadPage";
import AboutPage from "./pages/AboutPage";
import DocsPage from "./pages/DocsPage";
import ContactPage from "./pages/ContactPage";

function App({ route }: { route: string }) {
  const [currentPage, setCurrentPage] = useState(route === "download" ? "download" : "home");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    // Update URL without page reload
    window.history.pushState({}, '', page === "home" ? "/" : `/${page}`);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "download":
        return <DownloadPage onNavigate={handleNavigate} />;
      case "about":
        return <AboutPage onNavigate={handleNavigate} />;
      case "docs":
        return <DocsPage onNavigate={handleNavigate} />;
      case "contact":
        return <ContactPage onNavigate={handleNavigate} />;
      case "features":
        return <HomePage onNavigate={handleNavigate} />; // Features section is on homepage
      case "home":
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <MenuBar onNavigate={handleNavigate} currentPage={currentPage} />
      {renderCurrentPage()}
    </div>
  );
}

export default App;
