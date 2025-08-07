export default function MacInstructionComp() {
  return (
    <div className="alert alert-danger small">
      <h4>
        For MacOS (<i className="bi bi-apple" />) because we don't pay Apple for
        a developer account, you will need to follow these steps to run the
        downloaded <strong>Open Worship app</strong>. If you do not follow these
        steps, the app will not run properly, and you will not be able to use
        the app. <br />
        <strong>Do not skip any steps!</strong>
        <hr />
      </h4>
      <hr />
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
            xattr -dr com.apple.quarantine /Applications/Open Worship app.app
          </pre>
          <p>
            If you are on an Apple Silicon Mac, you may need to run this command
            too:
          </p>
          <pre
            className="literal-block"
            style={{ border: "1px solid red", padding: "8px" }}
          >
            xattr -cr /Applications/Open Worship app.app
          </pre>
        </li>
        <li>
          <p>
            Now <strong>Open Worship app</strong> should open correctly.
          </p>
        </li>
      </ol>
    </div>
  );
}
