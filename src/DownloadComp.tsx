/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { trueSystemInfo, useAppStateAsync } from "./helpers";

// const rootUrl = new URL(window.location.href).origin;
const rootUrl = "https://www.openworship.app";
async function getDownloadInfo(infoPath: string) {
  const url = rootUrl + infoPath;
  console.log(url);
  const res = await fetch(url);
  try {
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch download info:", error);
  }
  return null;
}

function toTargetDownloadInfoPath(targetKey: string) {
  return `/download/${targetKey}/info.json`;
}
function RenderTargetDownloadItem({ targetKey }: { targetKey: string }) {
  const [targetDownloadInfo, setTargetDownloadInfo] = useAppStateAsync(
    () => getDownloadInfo(toTargetDownloadInfoPath(targetKey)),
    [targetKey]
  );
  return (
    <div>
      <pre>{JSON.stringify(targetDownloadInfo ?? "{}", null, 2)}</pre>
    </div>
  );
}

function RenderDownloadItem({
  targetKey,
  value,
}: {
  targetKey: string;
  value: any;
}) {
  return (
    <div
      key={targetKey}
      style={{
        border: "1px solid gray",
        borderRadius: "8px",
        padding: "8px",
        margin: "8px",
      }}
    >
      <h3>{targetKey}</h3>
      <ul>
        {Object.entries(value).map(([k, v]) => (
          <li key={k}>
            <strong>{k}:</strong>{" "}
            {typeof v === "string" && v.startsWith("http") ? (
              <a href={v} target="_blank" rel="noopener noreferrer">
                {v}
              </a>
            ) : (
              String(v)
            )}
          </li>
        ))}
      </ul>
      <RenderTargetDownloadItem targetKey={targetKey} />
    </div>
  );
}

const downloadInfoPath = "/download/info.json";
function RenderInfoComp({
  info,
  setInfo,
}: {
  info: any;
  setInfo: (info: any) => void;
}) {
  if (info === undefined) {
    return <div>Loading...</div>;
  }
  if (info === null) {
    return (
      <div>
        Failed to load info.{" "}
        <button
          className="btn btn-info"
          onClick={() => {
            setInfo(undefined);
            getDownloadInfo(downloadInfoPath).then((newInfo) => {
              setInfo(newInfo);
            });
          }}
        >
          Retry
        </button>
      </div>
    );
  }
  const data = Object.entries(info).filter(([_, value]) => {
    for (const [k, v] of Object.entries(trueSystemInfo)) {
      if ((value as any)[k] !== v) {
        return false;
      }
    }
    return true;
  });
  return (
    <div>
      <h2>Download Information</h2>
      <div style={{ maxHeight: "400px", overflow: "auto" }}>
        {data.map(([key, value]) => {
          return <RenderDownloadItem key={key} value={value} targetKey={key} />;
        })}
      </div>
    </div>
  );
}

export default function DownloadComp() {
  const [info, setInfo] = useAppStateAsync(
    getDownloadInfo.bind(null, downloadInfoPath),
    []
  );
  return (
    <div>
      <a href="/">
        <h2>Go to Home</h2>
      </a>
      <div>
        <RenderInfoComp info={info} setInfo={setInfo} />
      </div>
    </div>
  );
}
