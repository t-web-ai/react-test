function Button({ label, action, condition }) {
  return (
    <button
      className="btn btn-primary fs-5"
      onClick={action}
      disabled={condition}
    >
      {label}
    </button>
  );
}

export default Button;
