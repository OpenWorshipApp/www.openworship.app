import { createRef } from "react";
import { rootUrl, useAppStateAsync } from "./helpers";

const url = `${rootUrl}/shared`;

function CopyToClipboardComp({ text }: { text: string }) {
  const ref = createRef<HTMLButtonElement>();
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(
      () => {
        const targetElement = ref.current;
        if (!targetElement) return;
        const target = targetElement.querySelector("span");
        if (!target) return;
        const originalText = target.textContent;
        target.textContent = "Copied!";
        setTimeout(() => {
          target.textContent = originalText;
        }, 2000);
      },
      (err) => {
        console.error("Failed to copy: ", err);
        alert("Failed to copy to clipboard.");
      },
    );
  };
  return (
    <button
      className="btn btn-sm btn-outline-info mx-1"
      onClick={handleCopy}
      ref={ref}
    >
      <span className="d-none d-md-inline">Copy URL</span>
      <i className="bi bi-copy ms-1" />
    </button>
  );
}

function ExternalViewComp({ filePath }: { filePath: string }) {
  return (
    <div className="mx-1">
      <a
        href={`${url}/${filePath}`}
        download
        target="_blank"
        rel="noopener noreferrer"
      >
        view/download &#8599;
      </a>
      <CopyToClipboardComp text={`${url}/${filePath}`} />
    </div>
  );
}

function RenderImageComp({ filePath }: { filePath: string }) {
  return (
    <div style={{ margin: "5px" }}>
      <h4 className="d-flex">
        {filePath.split("/").pop()}
        <ExternalViewComp filePath={filePath} />
      </h4>
      <img
        src={`${url}/${filePath}`}
        style={{ maxWidth: "400px" }}
        alt="Shared Asset"
      />
    </div>
  );
}

function RenderVideoComp({ filePath }: { filePath: string }) {
  return (
    <div style={{ margin: "5px" }}>
      <h4 className="d-flex">
        {filePath.split("/").pop()}
        <ExternalViewComp filePath={filePath} />
      </h4>
      <video
        src={`${url}/${filePath}`}
        controls
        style={{ maxWidth: "400px" }}
      />
    </div>
  );
}

function RenderAudioComp({ filePath }: { filePath: string }) {
  return (
    <div style={{ margin: "5px" }}>
      <h4 className="d-flex">
        {filePath.split("/").pop()}
        <ExternalViewComp filePath={filePath} />
      </h4>
      <audio
        src={`${url}/${filePath}`}
        controls
        style={{ maxWidth: "400px" }}
      />
    </div>
  );
}

function RenderSlideComp({ filePath }: { filePath: string }) {
  return (
    <div style={{ margin: "5px" }}>
      <h4 className="d-flex">
        {filePath.split("/").pop()}
        <ExternalViewComp filePath={filePath} />
      </h4>
    </div>
  );
}

async function getShareInfo() {
  const cacheBuster = new Date().getTime();
  const res = await fetch(`${url}/assets.json?_=${cacheBuster}`);
  try {
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch download info:", error);
  }
  return null;
}

type AssetInfo = {
  images: string[];
  videos: string[];
  audios: string[];
  slides: string[];
};
export default function SharedComp() {
  const [assetInfo] = useAppStateAsync<AssetInfo>(() => {
    return getShareInfo();
  });
  if (!assetInfo) {
    return <div>Loading...</div>;
  }
  return (
    <div className="pb-5">
      <h2>Shared</h2>
      <strong style={{ color: "green" }}>
        All assets on this page are in the public domain and can be used freely.
      </strong>
      <div>
        <hr />
        <h3 id="images">Images</h3>
        <div className="d-flex flex-wrap">
          {assetInfo.images?.map((filePath) => (
            <RenderImageComp key={filePath} filePath={filePath} />
          ))}
        </div>
        <hr />
        <h3 id="videos">Videos</h3>
        <div className="d-flex flex-wrap">
          {assetInfo.videos?.map((filepath) => (
            <RenderVideoComp key={filepath} filePath={filepath} />
          ))}
        </div>
        <hr />
        <h3 id="audio">Audio</h3>
        <div className="d-flex flex-wrap">
          {assetInfo.audios?.map((filepath) => (
            <RenderAudioComp key={filepath} filePath={filepath} />
          ))}
        </div>
        <hr />
        <h3 id="slides">Slides</h3>
        <div className="d-flex flex-wrap">
          {assetInfo.slides?.map((filepath) => (
            <RenderSlideComp key={filepath} filePath={filepath} />
          ))}
        </div>
      </div>
    </div>
  );
}
