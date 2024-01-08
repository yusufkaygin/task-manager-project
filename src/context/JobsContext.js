import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const JobsContext = createContext();

const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState(() => new Array());
  const [filterData, setFilterData] = useState(
    () =>
      new Object({
        option: "",
        searchQuery: "",
      })
  );

  // ------------------------------- create -------------------------------
  const create = (job) => {
    if (job.title.length === 0 || job.priority.length === 0)
      return Swal.fire({
        icon: "error",
        title: "Hata",
        text: "Hepsi doldurulmali.",
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

    job.id = uuidv4();
    const newJobs = [job, ...jobs]; // TODO Destructuring assignment
    setJobs(newJobs);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "İşlem başarılı!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // ------------------------------- remove -------------------------------
  const remove = (id) => {
    Swal.fire({
      title: "Silmek istediğinizden emin misiniz?",
      showCancelButton: true,
      confirmButtonText: "Evet, sil",
      cancelButtonText: "Hayır, vazgeç",
    }).then((result) => {
      if (result.isConfirmed) {
        const newJobs = jobs.filter((job) => job.id !== id);
        setJobs(newJobs);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "İşlem başarılı!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // ------------------------------- edit ---------------------------

  const edit = (job) => {
    let [targetJob] = jobs.filter((u) => u.id === job.editId);

    // TODO filter methodu ile overwrite yapiyoruz
    targetJob.title = job.title;
    targetJob.priority = job.priority;

    setJobs(jobs);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "İşlem başarılı!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <JobsContext.Provider
      value={{ jobs, create, remove, edit, setFilterData, filterData }}
    >
      {children}
    </JobsContext.Provider>
  );
};

export { JobsContext, JobsProvider };
