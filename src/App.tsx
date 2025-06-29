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
    <div className="container w-100 h-100 d-flex justify-content-center align-items-center">
      {route === "download" ? <DownloadComp /> : <Home />}
    </div>
  );
}

export default App;
