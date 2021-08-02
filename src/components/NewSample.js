import React, { useState } from "react";
import "./newsample.css";
export const NewSample = () => {
  const locat = ["Bangalore", " Hydrebad", "Mumbai", "Kochi"];
  const [locations, setLocations] = useState(locat);
  return (
    <>
      <div className="container">
        <div className="wrapper">
          {/* <label htmlFor="locate">Set Locations</label> */}
          <input
            type="text"
            list="data"
            id="locate"
            placeholder="Select Location"
          />

          <datalist id="data">
            {locations.map((item, key) => {
              return <option key={key} value={item} />;
            })}
          </datalist>
        </div>
      </div>
    </>
  );
};
