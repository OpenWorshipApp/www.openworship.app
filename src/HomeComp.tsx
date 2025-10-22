export function GoBackHomeComp() {
  return (
    <a href="/">
      <i className="bi bi-house-door-fill" />
      Go to Home
    </a>
  );
}

export default function HomeComp() {
  return (
    <div>
      <div>
        <h2>Welcome to Open Worship app beta testing home page</h2>
      </div>
      <a href="/download">
        <h2>
          <i className="bi bi-box-arrow-in-down" />
          Download
        </h2>
      </a>
      <a href="/shared">
        <h2>
          <i className="bi bi-folder"></i>
          Shared
        </h2>
      </a>
      <a href="/help">
        <h2>
          <i className="bi bi-question-circle"></i>
          Help
        </h2>
      </a>
    </div>
  );
}
