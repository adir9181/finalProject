import React, { Component } from "react";

import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";
import About from "./components/about";
import Footer from "./components/footer";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Signup from "./components/signup";

import "react-toastify/dist/ReactToastify.css";
import Signin from "./components/signin";
import usersService from "./services/usersService";
import LogOut from "./components/logout";
import BusinessSignup from "./components/signupAdmin";
import CreateCard from "./components/createCard";
import ProtectedRoute from "./components/common/protectedRoute";
import MyCards from "./components/myCards";
import DeleteCard from "./components/deleteCard";
import EditCard from "./components/editCard";
import ForgotPassword from "./components/forgotPassword";
import Wishlist from "./components/Wishlist";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.setState({
      user: usersService.getUser(),
    });
  }

  searchCards = (title) => {
    this.setState({ searchTitle: title });
  };

  render() {
    const { user } = this.state;

    return (
      <div className="app d-flex flex-column min-vh-100">
        <ToastContainer />
        <header>
          <Navbar searchCards={this.searchCards} user={user} />
        </header>
        <main className="container flex-fill">
          <Routes>
            <Route
              path="/"
              element={
                <Home searchTitle={this.state.searchTitle} user={user} />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/my-cards"
              element={
                <ProtectedRoute bizOnly>
                  <MyCards user={user} searchTitle={this.state.searchTitle} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist searchTitle={this.state.searchTitle} user={user} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-cards/edit/:id"
              element={
                <ProtectedRoute bizOnly>
                  <EditCard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-cards/delete/:id"
              element={
                <ProtectedRoute bizOnly>
                  <DeleteCard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-card"
              element={
                <ProtectedRoute bizOnly>
                  <CreateCard />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/signup-biz" element={<BusinessSignup />} />
            <Route path="/logout" element={<LogOut />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
