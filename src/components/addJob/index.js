import React, { useState, useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { JobsContext } from "../../context/JobsContext";
import Select from "react-select";
import "./style.css";

export default function Index() {
  const { create } = useContext(JobsContext);

  const [title, setTitle] = useState(() => new String());
  const [priority, setPriority] = useState(() => new String(""));

  const addJob = () => {
    create({ title: title.trim(), priority });
    setTitle("");
    setPriority("");
  };

  return (
    <div className="card p-3 add-job">
      <div className="title">Create New Job</div>
      <div className="content">
        <div className="col-12 col-xl-7">
          <input
            value={title}
            className="form-control"
            placeholder="Job Name"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="select-btn col-12 col-xl-5 py-2 py-xl-0">
          <div className="col-8">
            <Select
              placeholder="Priority (all)"
              value={{ value: "", label: priority }}
              onChange={({ value }) => setPriority(value)}
              options={[
                { value: "Urgent", label: "Urgent" },
                { value: "Regular", label: "Regular" },
                { value: "Trivial", label: "Trivial" },
              ]}
            />
          </div>
          <div className="col-4">
            <button className="btn btn-primary w-100" onClick={addJob}>
              <FontAwesomeIcon icon={faPlus} size="lg" title="create" />
              <span>Create</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
