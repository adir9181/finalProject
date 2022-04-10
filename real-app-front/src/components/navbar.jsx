import { useState, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import debounce from "lodash.debounce";

const Navbar = ({ user, searchCards }) => {
  const [value, setValue] = useState("");
  const debouncedSave = useCallback(
    debounce((nextValue) => searchCards(nextValue), 1000),
    [] // will be created only once initially
  );

  const handleChange = (event) => {
    const { value: nextValue } = event.target;
    setValue(nextValue);
    // Even though handleChange is created on each render and executed
    // it references the same debouncedSave that was created initially
    debouncedSave(nextValue);
  };

  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark bg-primary shadow-sm"
      aria-label="Third navbar example"
    >
      <div className="container">
        <Link to="/" className="navbar-brand">
          <i className="bi bi-basket2"> </i>
          AwesomeShopIL
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample03"
          aria-controls="navbarsExample03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample03">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
            {user?.biz && (
              <li className="nav-item">
                <NavLink to="/my-cards" className="nav-link">
                  My Cards
                </NavLink>
              </li>
            )}
            {user && !user?.biz && (
              <li className="nav-item">
                <NavLink to="/wishlist" className="nav-link">
                  Wishlist
                </NavLink>
              </li>
            )}
          </ul>

          <ul className="navbar-nav mb-sm-0">
            <li className="nav-item">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="bi bi-search"> </i>
                </span>
                <input
                  id="SearchStyle"
                  value={value}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  placeholder="Search Cards"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
            {user ? (
              <li className="nav-item">
                <NavLink to="/logout" className="nav-link">
                  Sign Out
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/signin" className="nav-link">
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/signup" className="nav-link">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
