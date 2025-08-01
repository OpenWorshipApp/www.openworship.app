import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import DownloadComp from "./DownloadComp";

function Home() {
  return (
    <div>
      <div>
        <h2>Welcome to Open Worship app beta testing hope page</h2>
      </div>
      <a href="/download">
        <h2>Go to Download</h2>
      </a>
    </div>
  );
}

function App({ route }: { route: string }) {
  return (
    <div
      className="container w-100"
      style={{
        overflowX: "hidden",
        overflowY: "auto",
        margin: "0 auto",
      }}
    >
      <div className="d-flex justify-content-center">
        <a
          href="https://github.com/OpenWorshipApp/open-worship-app-dt"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fork me on GitHub <i className="bi bi-github"></i>
        </a>
      </div>
      {route === "download" ? <DownloadComp /> : <Home />}
    </div>
  );
}

export default App;
