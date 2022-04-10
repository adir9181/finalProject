import React, { Component } from "react";
import cardsService from "../services/cardsService";
import PageHeader from "./common/pageHeader";
import { Link } from "react-router-dom";
import Card from "./card";

class MyCards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
    };
  }


  async componentDidMount() {
    const { data } = await cardsService.getMyCards();

    if (data.length) {
      this.setState({
        cards: data,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.searchTitle !== this.props.searchTitle) {
      cardsService.getMyCards(this.props.searchTitle?.trim())
      .then(({ data }) => {
        if (data.length > 0) {
          this.setState({cards: [...data]})
        }
      })
      .catch(e => console.log(e, e?.response))
    }
  }

  render() {
    const { cards } = this.state;

    return (
      <div className="container">
        <PageHeader title="My Cards Page" />
        <div className="row">
          <div className="col-12">
            <p>Your cards are in the list below...</p>
          </div>
        </div>

        <div className="row">
          <Link to="/create-card">Create a New Card</Link>
        </div>

        <div className="row">
          {cards.length ? (
            cards.map((card) => <Card userId={this.props.user._id} isUserBiz={true} key={card._id} card={card} />)
          ) : (
            <p>No cards yet...</p>
          )}
        </div>
      </div>
    );
  }
}

export default MyCards;
