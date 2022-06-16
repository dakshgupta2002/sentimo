import React from "react";
import { Sidebar } from "./../../components";
import { Cards } from "./../../elements";

import "./Favorite.css";

export default function Favorite() {
  return (
    <div>
      <Sidebar />

      <div className="favorite-container">
        <Cards
          date={"23 Sep, 2022"}
          time={"22:00:03"}
          title="Ishwar"
          content={`The oldest classical.`}
        />
      </div>
    </div>
  );
}
