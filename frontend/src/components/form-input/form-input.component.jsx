import { FormInputLabel, Input, Group } from "./form-input.styles";
import "./form-input.style.scss";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="position-relative group-form">
      <input className="form-input" {...otherProps} />
      {label && (
        <label className="form-input-label"
          shrink={Boolean(
            otherProps.value &&
              typeof otherProps.value === "string" &&
              otherProps.value.length
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
