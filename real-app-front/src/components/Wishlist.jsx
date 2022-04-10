import { useEffect, useState } from "react";
import PageHeader from "./common/pageHeader";
import Card from "./card";
import cardsService from "../services/cardsService";

const Wishlist = ({ user, searchTitle }) => {
    const [cards, setCards] = useState(null)
    const [wish, setWish] = useState([])

    useEffect(() => {
        if (!user) return;
        cardsService.getMyWishlist()
            .then(({ data }) => {
                if (data.length > 0) {
                    const cards = data.map(wish => wish.card_id)
                    const ids = data.map(wish => wish.card_id._id)
                    setCards(cards)
                    setWish(ids)
                }
            })
            .catch(e => console.log(e, e?.response))

    }, [user])

    // for search query
    useEffect(() => {
        if (!user) return;
        cardsService.getMyWishlist(searchTitle?.trim())
            .then(({ data }) => {
                if (data.length > 0) {
                    const cards = [], ids = []
                    data.forEach(wish => {
                        if(wish.card_id) {
                            cards.push(wish.card_id)
                        }
                    })
                    data.forEach(wish => {
                        if(wish.card_id) {
                            ids.push(wish.card_id._id)
                        }
                    })
                    setCards(cards)
                    setWish(ids)
                }
            })
            .catch(e => console.log(e, e?.response))
    }, [searchTitle])

    // toggle wishlist
    const toggleWishlist = (cardId, inwishlist) => {
        switch (inwishlist.toString()) {
            case "false":
                cardsService.addToWishlist(user._id, cardId)
                    .then(({ data }) => {
                        setWish([...wish, cardId])
                    })
                    .catch(e => console.log(e, e?.response))
                break;
            case "true":
                cardsService.removeFromWishlist(user._id, cardId)
                    .then(({ data }) => {
                        const newWish = wish.filter(ws => ws !== cardId)
                        setWish([...newWish])
                    })
                    .catch(e => console.log(e, e?.response))
                break;

            default:
                break;
        }
    }

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
                        Your AwesomeShopIL WishList
                    </p>
                    {user && (
                        <div className="row">
                            {cards && cards.length ? (
                                cards.map((card) => <Card inWishlist={wish.includes(card._id)} 
                                    toggleWishlist={toggleWishlist} isUserBiz={user?.biz} 
                                    key={card._id} card={card} />)
                            ) : (
                                <p>No cards in wishlist</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
