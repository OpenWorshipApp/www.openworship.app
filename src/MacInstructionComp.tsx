import { getTrueSystemInfo, useAppStateAsync } from "./helpers";

function genSrc(isArm64: boolean) {
  const option = "#toolbar=0&navpanes=0&scrollbar=0";
  if (isArm64) {
    return "/instruction/arm/instruction.pdf" + option;
  }
  return "/instruction/intel/instruction.pdf" + option;
}

export default function MacInstructionComp() {
  const [trueSystemInfo] = useAppStateAsync(getTrueSystemInfo, []);
  if (!trueSystemInfo) {
    return null;
  }
  return (
    <div className="alert alert-danger small">
      <hr />
      <h4>
        For MacOS (<i className="bi bi-apple" />) you will need to follow these
        steps to run the downloaded <strong>Open Worship app</strong>. If you do
        not follow these steps, the app will not run properly, and you will not
        be able to use the app. <br />
        <strong>Do not skip any steps!</strong>
      </h4>
      <hr />
      <div className="d-flex">
        <div>
          <ol>
            <li>
              <p>
                Download <strong>Open Worship app</strong>
              </p>
            </li>
            <li>
              <p>
                Open the downloaded file and drag the{" "}
                <strong>Open Worship app</strong> to your Applications folder
              </p>
            </li>
            <li>
              <p>
                In your Applications folder, open the <strong>Utilities</strong>{" "}
                folder and run the <strong>Terminal</strong> app
              </p>
            </li>
            <li>
              <p>In the Terminal app, type the following:</p>
              <pre
                className="literal-block"
                style={{ border: "1px solid red", padding: "8px" }}
              >
                xattr -dr com.apple.quarantine "/Applications/Open Worship
                app.app"
              </pre>
              <p>
                If you are on an <strong>Apple Silicon Mac (M1/M2/...)</strong>,
                you may need to run this command too:
              </p>
              <pre
                className="literal-block"
                style={{ border: "1px solid red", padding: "8px" }}
              >
                xattr -cr "/Applications/Open Worship app.app"
              </pre>
            </li>
            <li>
              <p>
                Now <strong>Open Worship app</strong> should open correctly.
              </p>
            </li>
          </ol>
        </div>
        <div
          className="w-100"
          style={{
            marginLeft: "20px",
            border: "1px solid #ccc",
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src={genSrc(trueSystemInfo.isArm64)}
          />
        </div>
      </div>
    </div>
  );
}
