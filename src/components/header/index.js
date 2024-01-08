import React from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFan } from "@fortawesome/free-solid-svg-icons";

export default function index() {
  return (
    <div className="header">
      <FontAwesomeIcon icon={faFan} size="xl" />
      <div className="mx-2">Rise Technology</div>
    </div>
  );
}
