import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faEnvelope,
  faXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { JobsContext } from "../../context/JobsContext";
import Select from "react-select";

export default function List() {
  const { jobs, remove, edit, filterData } = useContext(JobsContext);

  const [editId, setEditId] = useState(() => new String());
  const [title, setTitle] = useState(() => new String());
  const [priority, setPriority] = useState(() => new String());

  const priorityStatus = (value) => {
    if (value === "Trivial")
      return <span className="badge bg-primary">Trivial</span>;

    if (value === "Regular")
      return <span className="badge bg-warning text-dark">Regular</span>;

    if (value === "Urgent")
      return <span className="badge bg-danger">Urgent</span>;
  };

  const editMode = (job) => {
    setEditId(job.id);
    setTitle(job.title);
    setPriority(job.priority);
  };

  // ---------------------- duzenlenebilir data ui --------------------
  const editableUi = () => {
    return (
      <>
        <td>
          <input
            className="form-control"
            placeholder="Job Name"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </td>
        <td>
          <Select
            defaultValue={{ value: priority, label: priority }}
            onChange={({ value }) => setPriority(value)}
            options={[
              { value: "Urgent", label: "Urgent" },
              { value: "Regular", label: "Regular" },
              { value: "Trivial", label: "Trivial" },
            ]}
          />
        </td>
        <td>
          <div className="action-btns">
            <button
              className="btn btn-outline-success"
              onClick={() => {
                edit({ editId, title, priority });
                setEditId("");
              }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button
              className="btn btn-outline-dark"
              onClick={() => setEditId("")}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </td>
      </>
    );
  };
  // ---------------------- duzenlenemez data ui ----------------------
  const notEditable = (job) => (
    <>
      <td>{job.title}</td>
      <td>{priorityStatus(job.priority)}</td>
      <td>
        <div className="action-btns">
          <button
            className="btn btn-outline-primary"
            onClick={() => editMode(job)}
          >
            <FontAwesomeIcon icon={faEdit} size="xs" />
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => remove(job.id)}
          >
            <FontAwesomeIcon icon={faTrash} size="xs" />
          </button>
        </div>
      </td>
    </>
  );

  // -------------------------------------------------------------------

  const { searchQuery, option } = filterData;

  console.log(option);
  console.log(jobs);

  const newJobs = jobs.filter((job) => {
    console.log(job.priority);
    return (
      job.title.indexOf(searchQuery) !== -1 &&
      job.priority.indexOf(option) !== -1
    );
  });

  console.log(newJobs);

  return (
    <div className="table-responsive">
      <table className="table  table-bordered">
        <thead className="table-primary">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Priority</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {newJobs.map((job) => (
            <tr key={job.id}>
              {/* TODO editlenebilme ozelliginin ayrimi */}
              {editId === job.id && editableUi()}
              {editId !== job.id && notEditable(job)}
            </tr>
          ))}
        </tbody>
      </table>
      {newJobs.length === 0 && (
        <div className="alert alert-secondary text-center" role="alert">
          <FontAwesomeIcon icon={faEnvelope} size="xl" />
          <div className="my-2">Kayıt bulunamadı.</div>
        </div>
      )}
    </div>
  );
}
