import { Component } from "react";
import { toast } from "react-toastify";
import cardsService from "../services/cardsService";
import withRouter from "./common/withRouter";

class DeleteCard extends Component {
  state = {};

  async componentDidMount() {
    await cardsService.deleteCard(this.props.params.id);
    toast("Card was deleted");
    this.props.navigate("/my-cards");
  }
  render() {
    return null;
  }
}

export default withRouter(DeleteCard);
