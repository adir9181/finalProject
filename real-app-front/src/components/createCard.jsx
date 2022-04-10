import Joi from "joi";
import { toast } from "react-toastify";
import cardsService from "../services/cardsService";
import Form from "./common/form";
import PageHeader from "./common/pageHeader";
import withRouter from "./common/withRouter";

class CreateCard extends Form {
  state = {
    form: {
      bizName: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: "https://picsum.photos/500/300",
    },
  };

  schema = {
    bizName: Joi.string().min(2).max(255).required().label("Name"),
    bizDescription: Joi.string()
      .min(2)
      .max(1024)
      .required()
      .label("Description"),
    bizAddress: Joi.string().min(2).max(400).required().label("Address"),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label("Phone"),
    bizImage: Joi.string().min(11).max(1024).label("Image").allow(""),
  };

  async doSubmit() {
    const {
      form: { bizImage, ...body },
    } = this.state;

    if (bizImage) {
      body.bizImage = bizImage;
    }

    try {
      await cardsService.createCard(body);
      toast("A new card is opened");
      this.props.navigate("/my-cards");
    } catch ({ response }) {
      if (response && response === 400) {
        this.setState({ errors: { bizImage: response.data } });
      }
    }
  }

  render() {
    return (
      <>
        <PageHeader title="Create a new card for AwesomeShopIL " />
        <div className="row">
          <div className="col-12">
            <p>Create a new Card for AwesomeShopIL</p>
          </div>
        </div>

        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          {this.renderInput({ name: "bizName", label: "bizName" })}
          {this.renderInput({
            name: "bizDescription",
            label: "bizDescription",
          })}
          {this.renderInput({ name: "bizAddress", label: "bizAddress" })}
          {this.renderInput({ name: "bizPhone", label: "bizPhone" })}
          {this.renderInput({ name: "bizImage", label: "bizImage" })}

          <div className="my-2">{this.renderButton("Create Card")}</div>
        </form>
      </>
    );
  }
}

export default withRouter(CreateCard);
