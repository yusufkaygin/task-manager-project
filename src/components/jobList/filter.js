import React, { useState, useContext, useEffect } from "react";
import Select from "react-select";
import { JobsContext } from "../../context/JobsContext";

export default function Filter() {
  const { setFilterData } = useContext(JobsContext);

  const [searchQuery, setSearchQuery] = useState(() => new String());
  const [option, setOption] = useState(() => new String(""));

  // TODO burda filtre her degistiginde degilde 50ms boyunca degisiklik olmazsa contexteki fonksiyonu tetiklemesini sagladik

  useEffect(() => {
    const timeOutValue = 50;
    let timeOut = setTimeout(
      () => setFilterData({ searchQuery, option }),
      timeOutValue
    );

    return () => clearTimeout(timeOut); // TODO eger effect bitmeden tekrar tetiklenirse eski islemi siler
  }, [searchQuery, option]);

  //  -------------------------------------------------------------------

  return (
    <div className="filter py-2">
      <div className="col-8 col-xl-7">
        <input
          type="search"
          className="form-control"
          placeholder="Search"
          onChange={({ target }) => setSearchQuery(target.value)}
        />
      </div>

      <div className="col-4 col-xl-5">
        <Select
          placeholder="Priority (all)"
          onChange={(data) => setOption(data.value)}
          options={[
            { value: "", label: "All" },
            { value: "Urgent", label: "Urgent" },
            { value: "Regular", label: "Regular" },
            { value: "Trivial", label: "Trivial" },
          ]}
        />
      </div>
    </div>
  );
}
