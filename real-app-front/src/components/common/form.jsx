import Joi from "joi";
import React, { Component } from "react";
import Input from "./input";

class Form extends Component {
  state = {};

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validateForm();
    this.setState({ errors });

    if (errors) {
      return;
    }

    this?.doSubmit();
  };

  validateInput(name, value) {
    const data = { [name]: value };
    const schema = Joi.object({ [name]: this.schema[name] });

    const { error } = schema.validate(data);

    return error ? error.details[0].message : null;
  }

  validateForm() {
    const {
      schema,
      state: { form },
    } = this;

    const { error } = Joi.object({ ...schema }).validate(form, {
      abortEarly: false,
    });

    if (!error) {
      return null;
    }

    const errors = {};
    for (const detail of error.details) {
      errors[detail.path[0]] = detail.message;
    }

    return errors;
  }

  handleChange = ({ target: { value, name } }) => {
    const { form, errors } = this.state;

    this.setState({
      form: {
        ...form,
        [name]: value,
      },
      errors: {
        ...errors,
        [name]: this.validateInput(name, value),
      },
    });
  };

  renderInput({ name, label, type = "text", required }) {
    const { form, errors } = this.state;

    return (
      <Input
        name={name}
        label={label}
        type={type}
        required={required}
        value={form?.[name] || ""}
        onChange={this.handleChange}
        error={errors?.[name]}
      />
    );
  }

  renderButton(label) {
    return (
      <button disabled={this.validateForm()} className="btn btn-primary">
        {label}
      </button>
    );
  }
}

export default Form;
