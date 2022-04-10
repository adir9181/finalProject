import { Link } from "react-router-dom";

const Card = ({
  card: { _id, bizName, bizDescription, bizAddress, bizPhone, bizImage, user_id },
  isUserBiz, toggleWishlist, inWishlist, userId
}) => {
  return (
    <div className="col-6 col-md-3 col-lg-4 mt-3">
      <div className="card">
        <img src={bizImage} alt={bizName} />
        <div className="card-body">
          <h5 className="card-title">{bizName}</h5>
          <p className="card-text">{bizDescription}</p>
          <p className="card-text border-top pt-2">
            <b>Tel: </b> {bizPhone}
            <br />
            <b>Address: </b> {bizAddress}
          </p>
          {isUserBiz ? (
            (user_id === userId) && (<>
              <Link to={`/my-cards/edit/${_id}`}>Edit</Link>

              <Link className="text-danger ms-3" to={`/my-cards/delete/${_id}`}>
                DELETE
              </Link>
            </>)
          ) : (<button onClick={() => toggleWishlist(_id, inWishlist)} type="button" className={inWishlist ? "btn btn-secondary" : "btn btn-primary"}>
            {inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          </button>)}
        </div>
      </div>
    </div>
  );
};

export default Card;
