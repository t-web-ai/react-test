import "./LazyLoader.css";
function LazyLoader() {
  return (
    <div>
      {/* Banner */}
      <div className="skeleton skeleton-banner mb-4"></div>

      {/* Profile section  */}
      <div className="d-flex align-items-center mb-4">
        <div className="skeleton skeleton-avatar me-3"></div>
        <div className="flex-grow-1">
          <div className="skeleton skeleton-line w-50"></div>
          <div className="skeleton skeleton-line w-75"></div>
          <div className="skeleton skeleton-line w-25"></div>
        </div>
      </div>

      {/* Content section  */}
      <div className="skeleton skeleton-line w-100"></div>
      <div className="skeleton skeleton-line w-75"></div>
      <div className="skeleton skeleton-line w-50"></div>
      <div className="skeleton skeleton-line w-90"></div>
    </div>
  );
}

export default LazyLoader;
