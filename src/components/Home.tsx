import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <div className="button__container">
        <Link to={"/orders"}>
          <button className="button__link">Orders</button>
        </Link>
      </div>
    </>
  );
}
