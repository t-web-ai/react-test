function InputBox({ label, type, name, error, register, placeholder }) {
  return (
    <div className="mb-3">
      <label className="form-label fs-5 fw-bold" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        {...register(name)}
        type={type}
        className="form-control rounded fs-5"
        placeholder={placeholder}
      />
      {error && <div className="text-danger fw-bold mt-1">{error.message}</div>}
    </div>
  );
}

export default InputBox;
