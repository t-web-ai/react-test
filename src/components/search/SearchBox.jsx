function SearchBox({ register, name }) {
  return (
    <>
      <div
        className="input-group"
        style={{
          border: "1px solid #ccc",
          borderRadius: "6px",
          overflow: "hidden",
          backgroundColor: "#fafafa",
        }}
      >
        <span
          className="input-group-text bg-light text-secondary fw-bold"
          style={{
            border: "none",
            fontSize: "1.2rem",
          }}
        >
          <i className="bi bi-search"></i>
        </span>
        <input
          type="search"
          className="form-control border-0 bg-transparent shadow-none "
          placeholder="Type to search..."
          style={{
            fontSize: "1.2rem",
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
