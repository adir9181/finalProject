import { useEffect, useState } from "react";
import PageHeader from "./common/pageHeader";
import Card from "./card";
import cardsService from "../services/cardsService";

const Home = ({ user, searchTitle }) => {
  const [cards, setCards] = useState(null);
  const [wish, setWish] = useState([]);

  useEffect(() => {
    if (!user) return;
    cardsService
      .getAllCards()
      .then(({ data }) => {
        if (data.length > 0) {
          setCards(data);
        }
      })
      .catch((e) => console.log(e, e?.response));

    cardsService
      .getMyWishlist()
      .then(({ data }) => {
        if (data.length > 0) {
          const ids = data.map((wish) => wish.card_id?._id);
          setWish([...ids]);
        }
      })
      .catch((e) => console.log(e, e?.response));
  }, [user]);

  // for search query
  useEffect(() => {
    if (!user) return;
    cardsService
      .getAllCards(searchTitle?.trim())
      .then(({ data }) => {
        if (data.length > 0) {
          setCards(data);
        }
      })
      .catch((e) => console.log(e, e?.response));
  }, [searchTitle]);

  // toggle wishlist
  const toggleWishlist = (cardId, inwishlist) => {
    switch (inwishlist.toString()) {
      case "false":
        cardsService
          .addToWishlist(user._id, cardId)
          .then(({ data }) => {
            setWish([...wish, cardId]);
          })
          .catch((e) => console.log(e, e?.response));
        break;
      case "true":
        cardsService
          .removeFromWishlist(user._id, cardId)
          .then(({ data }) => {
            const newWish = wish.filter((ws) => ws !== cardId);
            setWish([...newWish]);
          })
          .catch((e) => console.log(e, e?.response));
        break;

      default:
        break;
    }
  };

  return (
    <div className="">
      <PageHeader
        title={
          <>
            <i className="bi bi-basket2"> </i>
            AwesomeShopIL
          </>
        }
      />
      <div className="row">
        <div className="col-12">
          <p id="fontsizeTextHome">
            {" "}
            Welcome to AwesomeShopIL the best online store
          </p>
          {user && (
            <div className="row">
              {cards && cards.length ? (
                cards.map((card) => (
                  <Card
                    userId={user._id}
                    inWishlist={wish.includes(card._id)}
                    toggleWishlist={toggleWishlist}
                    isUserBiz={user?.biz}
                    key={card._id}
                    card={card}
                  />
                ))
              ) : (
                <p>No cards yet...</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
