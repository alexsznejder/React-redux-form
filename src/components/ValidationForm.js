import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import "./ValidationForm.css";
import submit from "./submit";

const renderField = ({
  input,
  label,
  type,
  step,
  min,
  max,
  children,
  meta: { touched, error }
}) => (
  <div className="fieldContainer">
    <label>{label}</label>
    <div className="inputContainer">
      {type === "select" ? (
        <select {...input}>{children}</select>
      ) : (
        <input {...input} type={type} step={step} min={min} max={max} />
      )}
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

let ValidationForm = props => {
  const { handleSubmit, submitting, typeValue, reset, pristine } = props;
  // const [time, setTime] = useState("00:00:00");

  const typeInputs = () => {
    if (typeValue === "pizza") {
      return (
        <>
          <Field
            name="no_of_slices"
            type="number"
            label="Number of Slices"
            min={0}
            max={16}
            component={renderField}
          />
          <Field
            name="diameter"
            type="number"
            label="Diameter"
            step={0.5}
            min={0}
            component={renderField}
          />
        </>
      );
    } else if (typeValue === "soup") {
      return (
        <Field
          name="spiciness_scale"
          type="number"
          label="Spiciness Scale"
          min={1}
          max={10}
          component={renderField}
        />
      );
    } else if (typeValue === "sandwich") {
      return (
        <Field
          name="slices_of_bread"
          type="number"
          label="Slices of Bread"
          min={0}
          max={2}
          component={renderField}
        />
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <Field name="name" type="text" label="Name" component={renderField} />
      <Field
        name="preparation_time"
        type="time"
        label="Preparation Time"
        step={5}
        component={renderField}
      />
      <Field name="type" type="select" label="Type" component={renderField}>
        <option></option>
        <option value="pizza">pizza</option>
        <option value="soup">soup</option>
        <option value="sandwich">sandwich</option>
      </Field>
      {typeInputs()}
      <div className="buttonContainer">
        <button className="saveButton" type="submit" disabled={submitting}>
          Save
        </button>
        <button
          className="resetButton"
          type="button"
          disabled={pristine || submitting}
          onClick={reset}
        >
          Clear Form
        </button>
      </div>
    </form>
  );
};

ValidationForm = reduxForm({
  form: "validationForm"
})(ValidationForm);

const selector = formValueSelector("validationForm");
ValidationForm = connect(state => {
  const typeValue = selector(state, "type");
  return {
    typeValue
  };
})(ValidationForm);

export default ValidationForm;
