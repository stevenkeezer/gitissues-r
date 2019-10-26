import React from "react";
import logo from "./img/logo.png";
import background from "./img/background.png";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function HomePage(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          {" "}
          <img className="logo" src={logo} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Our products
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link disabled"
                href="#"
                tabindex="-1"
                aria-disabled="true"
              >
                Features
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              onChange={event => props.handleChange(event.target.value)}
            ></input>
            <Button
              className="btn btn-outline-success my-2 my-sm-0 btn-search"
              onClick={() => props.search()}
            >
              Search
            </Button>
          </form>
        </div>
      </nav>

      <section className="background">
        <div className="content-title-homepage">
          <h2 className="title-homepage">Welcome to our awesome ALIENHUB</h2>
          <p className="content-homepage">
            {" "}
            Ut vehicula, diam ut dapibus sodales, diam augue posuere nisl,
            congue vulputate felis quam quis libero. Pellentesque hendrerit dui
            nec facilisis euismod. Curabitur posuere odio nulla, nec maximus
            erat suscipit id. Duis quis enim dignissim nunc commodo sollicitudin
            eu sed mauris.
          </p>
        </div>
        <div>
          <img className="background-home-img" src={background} />
        </div>
      </section>
      <footer className="page-footer font-small pt-4">
        <div className="container">
          <ul className="list-unstyled list-inline text-center py-2">
            <li className="list-inline-item">
              <h5 className="mb-1">Register for free</h5>
            </li>
            <li className="list-inline-item">
              <a href="#!" className="btn btn-outline-white btn-signup">
                Sign up!
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-copyright text-center py-3">
          © 2019 Copyright:
          <a href="https://mdbootstrap.com/education/bootstrap/">
            {" "}
            alienhub.com
          </a>
        </div>
      </footer>
    </div>
  );
}
