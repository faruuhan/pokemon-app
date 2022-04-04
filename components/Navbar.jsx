import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light py-4">
      <div className="container">
        <a className="navbar-brand fw-bolder" href="#">
          Poke's App
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link href="/">
              <a className="nav-link" aria-current="page" href="#">
                Home
              </a>
            </Link>
            <Link href="/mypokemons">
              <a className="nav-link" aria-current="page" href="#">
                My Pokemons
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
