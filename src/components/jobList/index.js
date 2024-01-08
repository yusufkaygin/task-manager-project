import React from "react";
import "./style.css";
import Filter from "./Filter";
import List from "./List";

export default function index() {
  return (
    <div className="card p-3 my-3 filter-list-pg">
      <div className="title">Job List</div>
      <div className="content">
        <Filter />
        <List />
      </div>
    </div>
  );
}
