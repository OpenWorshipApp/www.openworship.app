import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import RouteComp from "./RouteComp";
import { GoBackHomeComp } from "./HomeComp";
import { useRoute } from "./helpers";

export default function AppComp() {
  const route = useRoute();
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
        {route !== "" ? (
          <div className="p-2">
            <GoBackHomeComp />
          </div>
        ) : null}
        <div className="p-2">
          <a
            href="https://github.com/OpenWorshipApp/open-worship-app-dt"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fork me on Github <i className="bi bi-github"></i>
          </a>
        </div>
        <div className="p-2">
          <a
            href="https://www.youtube.com/@owf2025"
            target="_blank"
            rel="noopener noreferrer"
          >
            Youtube{" "}
            <i
              className="bi bi-youtube"
              style={{
                color: "red",
              }}
            ></i>
          </a>
        </div>
      </div>
      <RouteComp />
    </div>
  );
}
