import Joi from "joi";
import { Link, Navigate } from "react-router-dom";
import usersService from "../services/usersService";
import Form from "./common/form";
import PageHeader from "./common/pageHeader";
import withRouter from "./common/withRouter";

class SignIn extends Form {
  state = {
    form: {
      email: "",
      password: "",
    },
  };

  schema = {
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required().min(6),
  };

  async doSubmit() {
    const { email, password } = this.state.form;

    try {
      await usersService.login(email, password);
      window.location = "/";
    } catch ({ response }) {
      if (response && response.status === 400) {
        this.state({ errors: { email: response.data } });
      }
    }
  }

  render() {
    if (usersService.getUser()) {
      return <Navigate to="/" />;
    }

    return (
      <>
        <PageHeader title="Sign In to Real App" />
        <div className="row">
          <div className="col-12">
            <p>login</p>
          </div>
        </div>

        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          {this.renderInput({
            name: "email",
            label: "Email",
            type: "email",
            required: true,
          })}
          {this.renderInput({
            name: "password",
            label: "Password",
            type: "password",
            required: true,
          })}

          <Link to="/forgot-password" className="text-black">Forgot Password?</Link>

          <div className="my-2">{this.renderButton("Sign In")}</div>
        </form>
      </>
    );
  }
}

export default withRouter(SignIn);
