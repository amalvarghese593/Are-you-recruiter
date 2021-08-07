import React, { useState, useEffect, useRef } from "react";
import "./page.css";
import "./lens.png";
import axios from "axios";
import { locations } from "./locations";
import { JobDetails } from "./JobDetails";
import { FilterPopup } from "./FilterPopup";

export const PageLatest = () => {
  const [industries, setIndustries] = useState([]);
  const [jobFunctions, setjobFunctions] = useState([]);
  const [skills, setskills] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [newIndustry, setNewIndustry] = useState("");
  const [newFunction, setNewFunction] = useState("");
  const [jobCount, setJobCount] = useState(0);
  const [newValue, setNewValue] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://webpipl-api.webpipl.com/api/v1/landingPage/getDropdownListOfRequirement"
      );
      const response2 = await axios.get(
        "https:webpipl-api.webpipl.com/api/v1/skills/"
      );

      setIndustries(response.data.industries);
      setjobFunctions(response.data.jobFunctions);
      setskills(response2.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  const usp = new URLSearchParams("job_function=&industry=&locations=");
  const [queryString, setQueryString] = useState(usp);
  const fetchResult = async () => {
    try {
      const response3 = await axios.get(
        `https://webpipl-api.webpipl.com/api/v1/landingPage/getJobs?${queryString.toString()}`
      );

      setJobs(response3.data.result);
      setJobCount(response3.data.result.length);
      console.log("here is response: ", response3);
      console.log("here is no.of jobs: ", jobCount);
    } catch (err) {
      console.log(err);
    }
  };
  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const searchHandler = (e) => {
    setQuery(input);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchResult();
  }, [queryString]);

  const locationHandler = (e) => {
    setNewValue(e.target.value);
    const locationLatest = e.target.value.toLowerCase();
    if (queryString.get("locations") === "") {
      setQueryString(() => {
        queryString.set("locations", locationLatest);
        return queryString;
      });
    } else {
      setQueryString(() => {
        const arr = queryString.getAll("locations");
        if (arr.indexOf(locationLatest) === -1) {
          arr.push(locationLatest);

          queryString.set("locations", arr.join(","));
        }
        return queryString;
      });
    }

    e.target.value = "";
  };
  const interestHandler = (e) => {
    setNewValue(e.target.value);
    e.target.value = "";
  };
  const industryHandler = (e) => {
    setNewValue(e.target.value);
    e.target.value = "";
  };
  const functionHandler = (e) => {
    setNewValue(e.target.value);
    e.target.value = "";
  };
  const selectLocationHandler = (e) => {
    // const e = document.getElementById("drop1");
    // const strUser = e.options[e.selectedIndex].value;
    // setNewLocation(strUser);
    const locationValue = e.target.value;
    setNewLocation(locationValue);
    console.log("amal here is the input value finally: ", newLocation);
    console.log("amal here is the input value finally: ", e.target.value);
    console.log(usp.set("locations", newLocation));
    e.target.value = "";
  };
  const selectInterestHandler = (e) => {
    // setQuery(e.target.value);
    const interestValue = e.target.value;
    setNewInterest(interestValue);
    e.target.value = "";
  };
  const selectJobHandler = (e) => {
    // setQuery(e.target.value);
    const jobFunctionValue = e.target.value;
    setNewInterest(jobFunctionValue);
    e.target.value = "";
  };
  const selectIndustryHandler = (e) => {
    // setIndustry(e.target.value);
    const industryValue = e.target.value;
    setNewInterest(industryValue);
    e.target.value = "";
  };
  const locationRef = useRef();
  const handleLocationNew = () => {
    // const select = document.getElementById("drop1");
    // const mySelectedValue = select.options[select.selectedIndex].value;
    // console.log("amal selected location is : ", mySelectedValue);
    // console.log("amal here is ref value: ", locationRef);
    // console.log(
    //   "amal here is innerhtml value: ",
    //   locationRef.current.innerHTML
    // );
  };
  return (
    <div className="recruiter-wrapper">
      <div className="recruiter-search-block">
        <div className="input-container">
          <input
            type="text"
            placeholder="Search Jobs"
            // onChange={handleChange}
            className="search-jobs-input"
            onChange={inputHandler}
            value={input}
          />
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555d50"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lens-icon"
              onClick={searchHandler}
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          {/* <label className="search-jobs-label">Search Jobs</label> */}
        </div>
      </div>
      <div className="filter-block">
        <div className="filter-items-container">
          <div className="filter-items flt-item1">
            <input
              type="text"
              list="drop1"
              id="location-id"
              // placeholder="Select Location"
              name="location-name"
              // onBlur={selectLocationHandler}
              onBlur={locationHandler}
              className="input-location"
            />
            <label className="location-label">Select Locations</label>

            <datalist id="drop1" className="dropdown drp1">
              {locations.map((item) => {
                return <option value={item} />;
              })}
            </datalist>
            <button /*onClick={handleLocationNew}*/>+</button>
          </div>
          <div className="filter-items flt-item2">
            {/* <label htmlFor="drop2">Interests</label> */}
            <input
              type="text"
              list="drop2"
              id="interests-id"
              placeholder="Select Interests"
              name="interests-name"
              // onBlur={selectInterestHandler}
              onBlur={interestHandler}
            />
            <datalist id="drop2" className="dropdown drp2">
              {skills.map((item) => {
                return <option value={item.skill_name} />;
              })}
            </datalist>
            <button>+</button>
          </div>
          <div className="filter-items flt-item3">
            {/* <label htmlFor="drop3">Industries</label> */}
            <div className="industry-dropdown-wrapper">
              <input
                type="text"
                list="drop3"
                id="industries-id"
                placeholder="Select Industries"
                name="industries-name"
                // onBlur={selectIndustryHandler}
                onBlur={industryHandler}
              />
              <datalist
                id="drop3"
                className="dropdown drp3"
                // onChange={selectIndustryHandler}
              >
                {industries.map((item) => {
                  return <option value={item} />;
                })}
              </datalist>
              <button>+</button>
            </div>
          </div>
          <div className="filter-items flt-item4">
            {/* <label htmlFor="drop4">Functions</label> */}
            <input
              type="text"
              list="drop4"
              id="functions-id"
              placeholder="Select Functions"
              // onBlur={selectJobHandler}
              onBlur={functionHandler}
            />
            <datalist
              id="drop4"
              className="dropdown drp4"
              // onChange={selectJobHandler}
            >
              {jobFunctions.map((item) => {
                return <option value={item} />;
              })}
            </datalist>
            <button>+</button>
          </div>
        </div>
      </div>
      {/* <div className="filter-popup-container">
        <FilterPopup newLocation={newLocation} />
      </div>     */}
      <FilterPopup
        // newLocation={newLocation}
        // newFunction={newFunction}
        // newIndustry={newIndustry}
        // newInterest={newInterest}
        newValue={newValue}
      />

      <div className="job-count-block">
        <h3>{jobCount}</h3>
        <h4>Jobs Found</h4>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#555d50"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 5v13M5 12l7 7 7-7" />
        </svg>
      </div>
      {/* <SampleInputSelect /> */}
      <div className="jobs-block">
        <JobDetails />
        <JobDetails />
      </div>

      <div className="signup-block">
        <div className="signup-container">
          <button>Sign Up</button>
          <p>to submit jobseeker profile for a vacancy</p>
        </div>
      </div>
    </div>
  );
};
