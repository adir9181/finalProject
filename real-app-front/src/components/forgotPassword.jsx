import Joi from "joi";
import { Link, Navigate } from "react-router-dom";
import usersService from "../services/usersService";
import Form from "./common/form";
import PageHeader from "./common/pageHeader";
import { toast } from "react-toastify";
import withRouter from "./common/withRouter";

// reset passsword class
class ForgotPassword extends Form {
  state = {
    form: {},
    resetPassword: false,
    token: "",
    password: "",
    confirmPassword: "",
  };

  schema = {
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
  };

  async doSubmit() {
    const { email } = this.state.form;

    try {
      usersService
        .forgotPassword(email)
        .then(({ data }) => {
          console.log(data);
          toast("Success. Check your email");
        })
        .catch((e) => console.log(e, e?.response));
    } catch ({ response }) {
      if (response && response.status === 400) {
        this.state({ errors: { email: response.data } });
      }
    }
  }

  componentDidMount() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    const token = params.token;
    if (token) {
      this.setState({ resetPassword: true, token });
    }
  }

  handlerResetForm = (e) => {
    e.preventDefault();
    usersService
      .resetPassword(
        this.state.password,
        this.state.confirmPassword,
        this.state.token
      )
      .then(({ data }) => {
        toast("Password Updated", {
          onClose: () => (window.location = "/signin"),
        });
      })
      .catch((e) => console.log(e, e?.response));
  };

  render() {
    if (usersService.getUser()) {
      return <Navigate to="/" />;
    }

    return (
      <>
        <PageHeader
          title={
            this.state.resetPassword ? "Reset Password" : "Forgot Password"
          }
        />
        <div className="row">
          <div className="col-12">
            <p></p>
          </div>
        </div>

        {this.state.resetPassword ? (
          <form onSubmit={this.handlerResetForm} noValidate autoComplete="off">
            <input
              onChange={(e) => this.setState({ password: e.target.value })}
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              aria-describedby="basic-addon1"
            />
            <input
              onChange={(e) =>
                this.setState({ confirmPassword: e.target.value })
              }
              type="password"
              className="form-control mb-3"
              placeholder="Confirm Password"
              aria-describedby="basic-addon1"
            />
            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
          </form>
        ) : (
          <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
            {this.renderInput({
              name: "email",
              label: "Email",
              type: "email",
              required: true,
            })}
            <div className="my-2">{this.renderButton("Send email")}</div>
          </form>
        )}
      </>
    );
  }
}

export default withRouter(ForgotPassword);
