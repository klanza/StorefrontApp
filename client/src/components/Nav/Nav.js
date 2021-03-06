import React from 'react';

const Nav = () => (
  <nav className="green lighten-1" role="navigation">
    <div className="nav-wrapper container">
      <a id="logo-container" href="/" className="brand-logo"><i className="large material-icons">directions_runshopping_cart</i>
</a>
      <ul className="right hide-on-med-and-down">
        <li>
          <a href="/SignUp">Sign Up?</a>
        </li>
        <li>
        <a href="/SignIn">Sign In!</a>
        </li>
      </ul>

      <ul id="nav-mobile" className="sidenav">
      <li>
          <a href="/SignUp">Sign Up?</a>
        </li>
        <li>
        <a href="/SignIn">Sign In!</a>
        </li>
      </ul>
      <a href="#" data-target="nav-mobile" className="sidenav-trigger">
        <i className="material-icons">menu</i>
      </a>
    </div>
  </nav>
);

export default Nav;
