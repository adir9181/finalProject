const Input = ({ required = false, label, name, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {required && <span className="text-danger me-1">*</span>}
        {label}
      </label>
      <input {...rest} id={name} name={name} className="form-control" />
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default Input;
