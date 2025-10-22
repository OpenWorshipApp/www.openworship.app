import { rootUrl, useAppStateAsync } from "./helpers";

const url = `${rootUrl}/shared`;

function RenderImageComp({ filePath }: { filePath: string }) {
  return (
    <div style={{ margin: "5px" }}>
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
      <video
        src={`${url}/${filePath}`}
        controls
        style={{ maxWidth: "400px" }}
      />
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
};
export default function SharedComp() {
  const [assetInfo] = useAppStateAsync<AssetInfo>(() => {
    return getShareInfo();
  });
  if (!assetInfo) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>Shared</h2>
      <p>Feel free to use these assets in your projects.</p>
      <div>
        <h3 id="images">Images</h3>
        <div className="d-flex flex-wrap">
          {assetInfo.images.map((filePath) => (
            <RenderImageComp key={filePath} filePath={filePath} />
          ))}
        </div>
        <h3 id="videos">Videos</h3>
        <div className="d-flex flex-wrap">
          {assetInfo.videos.map((filepath) => (
            <RenderVideoComp key={filepath} filePath={filepath} />
          ))}
        </div>
      </div>
    </div>
  );
}
