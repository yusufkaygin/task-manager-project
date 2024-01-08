import React from "react";
import JobList from "../components/JobList";
import AddJob from "../components/AddJob";

function Main() {
  return (
    <div>
      <AddJob />
      <JobList />
    </div>
  );
}

export default Main;
