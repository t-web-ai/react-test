function SearchBox({ register, name }) {
  return (
    <>
      <div
        className="input-group border"
        style={{
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <button
          className="input-group-text bg-light text-secondary fw-bold"
          style={{
            border: "none",
            fontSize: "1.5rem",
          }}
        >
          <i className="bi bi-search"></i>
        </button>
        <input
          type="search"
          className="form-control border-0 text-body shadow-none fs-5"
          placeholder="Type to search..."
          style={{
            padding: "0.6rem 1rem",
            color: "#333",
          }}
          {...register(name)}
        />
      </div>
    </>
  );
}

export default SearchBox;
