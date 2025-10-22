/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, use, useEffect, useMemo, useState } from "react";
import {
  checkIsVersionOutdated,
  useAppStateAsync,
  getTrueSystemInfo,
  rootUrl,
  checkingVersion,
} from "./helpers";
import MacInstructionComp from "./MacInstructionComp";

const AppleInstructionVisibleContext = createContext({
  isVisible: false,
  toggle: (_isVisible: boolean) => {},
});

function useAppleInstructionVisible() {
  return use(AppleInstructionVisibleContext);
}

async function getDownloadInfo(infoPath: string) {
  const cacheBuster = new Date().getTime();
  const url = `${rootUrl}${infoPath}?_=${cacheBuster}`;
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
    return <i className="bi bi-windows" title="Windows" />;
  }
  if (isMac) {
    return <i className="bi bi-apple" title="Mac" />;
  }
  if (isLinux) {
    return <i className="bi bi-tux" title="Linux" />;
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
    return !targetDownloadInfo.is64System
      ? " 32bit"
      : targetDownloadInfo.isArm64
      ? " Arm64"
      : " 64bit";
  }
  if (targetDownloadInfo.isLinux) {
    return (
      <>
        {targetDownloadInfo.isUbuntu ? (
          <i className="bi bi-ubuntu" title="Ubuntu" />
        ) : targetDownloadInfo.isFedora ? (
          <img
            title="Fedora"
            width={16}
            height={16}
            src="/fedora-logo.png"
            alt="Fedora"
            style={{
              marginTop: "4px",
              filter: "grayscale(100%)",
            }}
          />
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
            <div>
              Checksum (sha512):{" "}
              <div className="d-flex align-items-center">
                <div style={{ maxWidth: "250px", overflow: "auto" }}>
                  {item.checksum}
                </div>
                <div>
                  <i
                    className="bi bi-copy m-2"
                    style={{ cursor: "pointer" }}
                    onClick={(event) => {
                      navigator.clipboard.writeText(item.checksum);
                      event.currentTarget.style.color = "green";
                      setTimeout(() => {
                        event.currentTarget.style.color = "";
                      }, 5000);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RenderInstructionToggle({
  targetDownloadInfo,
}: {
  targetDownloadInfo: any;
}) {
  const {
    isVisible: isInstructionVisible,
    toggle: setAppleInstructionsVisible,
  } = useAppleInstructionVisible();
  if (!targetDownloadInfo.isMac) {
    return null;
  }
  return (
    <div
      className="float-end"
      style={{
        backgroundColor: "grey",
        padding: "2px",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      onClick={() => {
        setAppleInstructionsVisible(!isInstructionVisible);
      }}
    >
      <i
        className={
          "bi bi-" + (isInstructionVisible ? "lightbulb-fill" : "lightbulb")
        }
        style={{ color: isInstructionVisible ? "green" : "yellow" }}
      />
    </div>
  );
}

function RenderDownloadItem({
  targetKey,
  setMatchVersion,
}: {
  targetKey: string;
  setMatchVersion?: (data: any) => void;
}) {
  const [targetDownloadInfo, setTargetDownloadInfo] =
    useAppStateAsync(async () => {
      const data = await getDownloadInfo(toTargetDownloadInfoPath(targetKey));
      setMatchVersion?.(data);
      return data;
    }, [targetKey, setMatchVersion]);
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
                if (setMatchVersion) {
                  setMatchVersion(newInfo);
                }
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
        boxShadow: "0 0 5px rgba(0,0,0,0.1)",
      }}
    >
      <div>
        <div className="d-flex">
          <div className="flex-grow-1">
            (<strong>{targetDownloadInfo.version}</strong>)
            {getIcon(targetDownloadInfo)}
            {getInfo(targetDownloadInfo)}
          </div>
          <RenderInstructionToggle targetDownloadInfo={targetDownloadInfo} />
        </div>
        {(targetDownloadInfo.installer ?? []).length ? (
          <div>
            Installer:
            <RenderDownloadLinks items={targetDownloadInfo.installer} />
          </div>
        ) : null}
        {(targetDownloadInfo.portable ?? []).length ? (
          <div>
            Portable zip:
            <RenderDownloadLinks items={targetDownloadInfo.portable} />
          </div>
        ) : null}
        <hr />
        <div className="d-flex">
          Commit ID:{" "}
          <small style={{ maxWidth: "200px", overflow: "auto" }}>
            {targetDownloadInfo.commitID}
          </small>
        </div>
      </div>
    </div>
  );
}

function RenderVersionChecking({ data }: { data: any }) {
  const isOutdated = useMemo(() => {
    if (checkingVersion === "" || data === null) {
      return false;
    }
    try {
      return checkIsVersionOutdated(checkingVersion, data.version);
    } catch (error) {
      console.error(error);
    }
    return false;
  }, [data]);
  if (checkingVersion === "" || data === null) {
    return null;
  }
  return (
    <span className="ms-2">
      {isOutdated ? (
        <span className="text-danger">
          ({checkingVersion}) Your Version is Outdated
        </span>
      ) : (
        <span className="text-success">
          ({checkingVersion}) Your Version is Up-to-date
        </span>
      )}
    </span>
  );
}

const downloadInfoPath = "/download/info.json";
function RenderInfoComp({
  info,
  setInfo,
  trueSystemInfo,
}: {
  info: any;
  setInfo: (info: any) => void;
  trueSystemInfo: any;
}) {
  const [matchVersion, setMatchVersion] = useState<any>(null);
  if (info === undefined || trueSystemInfo === undefined) {
    return <div>Loading...</div>;
  }
  if (trueSystemInfo === null) {
    return <div>Failed to load system info.</div>;
  }
  if (info === null) {
    return (
      <div className="w-100 p-2">
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
  const recommendedData = Object.entries(info).filter(([_, value]) => {
    for (const [k, v] of Object.entries(trueSystemInfo)) {
      if ((value as any)[k] !== v) {
        return false;
      }
    }
    return true;
  });
  const otherData = Object.entries(info).filter(([key]) => {
    return !recommendedData.find(([k]) => k === key);
  });
  return (
    <div className="w-100 p-2">
      <div>
        <div>
          <h3 className="d-flex">
            <div>Recommend Downloads </div>
            <div>
              <RenderVersionChecking data={matchVersion} />
            </div>
          </h3>
        </div>
        <div>
          <div className="d-flex flex-wrap">
            {recommendedData.map(([key]) => {
              return (
                <RenderDownloadItem
                  key={key}
                  targetKey={key}
                  setMatchVersion={setMatchVersion}
                />
              );
            })}
          </div>
        </div>
      </div>
      {otherData.length > 0 && (
        <>
          <hr />
          <div>
            <div>
              <h3>Other Downloads</h3>
            </div>
            <div className="d-flex flex-wrap">
              {otherData.map(([key]) => {
                return <RenderDownloadItem key={key} targetKey={key} />;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function DownloadComp() {
  const [trueSystemInfo] = useAppStateAsync(getTrueSystemInfo, []);
  const [isAppleInstructionsVisible, setAppleInstructionsVisible] =
    useState(false);
  const [info, setInfo] = useAppStateAsync(
    getDownloadInfo.bind(null, downloadInfoPath),
    []
  );
  useEffect(() => {
    setAppleInstructionsVisible(!!trueSystemInfo?.isMac);
  }, [trueSystemInfo]);
  return (
    <AppleInstructionVisibleContext
      value={{
        isVisible: isAppleInstructionsVisible,
        toggle: setAppleInstructionsVisible,
      }}
    >
      {isAppleInstructionsVisible ? <MacInstructionComp /> : null}
      <div className="d-flex">
        <RenderInfoComp
          info={info}
          setInfo={setInfo}
          trueSystemInfo={trueSystemInfo}
        />
      </div>
    </AppleInstructionVisibleContext>
  );
}
