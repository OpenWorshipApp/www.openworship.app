/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { trueSystemInfo, useAppStateAsync } from "./helpers";

const isDev = window.location.hostname === "localhost";
const rootUrl = isDev
  ? "https://www.openworship.app"
  : new URL(window.location.href).origin;
async function getDownloadInfo(infoPath: string) {
  const url = rootUrl + infoPath;
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

function getIcon({
  isWindows,
  isMac,
  isLinux,
}: {
  isWindows: boolean;
  isMac: boolean;
  isLinux: boolean;
}) {
  if (isWindows) {
    return <i className="bi bi-windows" />;
  }
  if (isMac) {
    return <i className="bi bi-apple" />;
  }
  if (isLinux) {
    return <i className="bi bi-tux" />;
  }
  return null;
}

function getInfo(targetDownloadInfo: any) {
  if (targetDownloadInfo.isMac) {
    return (
      <>
        {targetDownloadInfo.isUniversal
          ? " Universal"
          : targetDownloadInfo.isArm64
          ? " Apple Silicon"
          : " Intel"}
      </>
    );
  }
  if (targetDownloadInfo.isWindows) {
    return !targetDownloadInfo.is64System ? " 32bit" : null;
  }
  if (targetDownloadInfo.isLinux) {
    return (
      <>
        {targetDownloadInfo.isUbuntu ? (
          <i className="bi bi-ubuntu" />
        ) : targetDownloadInfo.isFedora ? (
          " Fedora"
        ) : null}
      </>
    );
  }
}

function RenderDownloadLinks({ items }: { items: any[] }) {
  return (
    <div className="d-flex flex-wrap">
      {items.map((item: any) => {
        return (
          <div key={item.fileFullName} className="m-1">
            <a
              href={`${rootUrl}/${item.publicPath}`}
              className="btn btn-sm btn-info"
            >
              {item.fileFullName}
            </a>
          </div>
        );
      })}
    </div>
  );
}

function RenderDownloadItem({ targetKey }: { targetKey: string }) {
  const [targetDownloadInfo, setTargetDownloadInfo] = useAppStateAsync(
    () => getDownloadInfo(toTargetDownloadInfoPath(targetKey)),
    [targetKey]
  );
  if (targetDownloadInfo === undefined) {
    return <div>Loading {targetKey}...</div>;
  }
  if (targetDownloadInfo === null) {
    return (
      <div className="m-1 p-1">
        Failed to load {targetKey}.
        <button
          className="btn btn-info"
          onClick={() => {
            setTargetDownloadInfo(undefined);
            getDownloadInfo(toTargetDownloadInfoPath(targetKey)).then(
              (newInfo) => {
                setTargetDownloadInfo(newInfo);
              }
            );
          }}
        >
          Retry
        </button>
      </div>
    );
  }
  return (
    <div
      className="m-1 p-1"
      key={targetKey}
      style={{
        border: "1px solid gray",
        borderRadius: "8px",
      }}
    >
      <div>
        (<strong>{targetDownloadInfo.version}</strong>)
        {getIcon(targetDownloadInfo)}
        {getInfo(targetDownloadInfo)}
        {(targetDownloadInfo.installer ?? []).length ? (
          <div>
            {targetDownloadInfo.isWindows ? "Installer:" : "Binary File:"}
            <RenderDownloadLinks items={targetDownloadInfo.installer} />
          </div>
        ) : null}
        {(targetDownloadInfo.portable ?? []).length ? (
          <div>
            Portable zip:
            <RenderDownloadLinks items={targetDownloadInfo.portable} />
          </div>
        ) : null}
      </div>
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
  const otherData = Object.entries(info).filter(([key]) => {
    return !data.find(([k]) => k === key);
  });
  return (
    <div>
      <h2>Recommend Downloads</h2>
      <div className="d-flex">
        {data.map(([key]) => {
          return <RenderDownloadItem key={key} targetKey={key} />;
        })}
      </div>
      {otherData.length > 0 && (
        <div>
          <hr />
          <h3>Other Downloads</h3>
          <div className="d-flex flex-wrap">
            {otherData.map(([key]) => {
              return <RenderDownloadItem key={key} targetKey={key} />;
            })}
          </div>
        </div>
      )}
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
      <div className="d-flex">
        <a href="/">
          <h2>Go to Home</h2>
        </a>
      </div>
      <div>
        <RenderInfoComp info={info} setInfo={setInfo} />
      </div>
    </div>
  );
}
