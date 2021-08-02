import React, { useState, useEffect, useRef } from "react";
import "./page.css";
import "./lens.png";
import axios from "axios";
import { locations } from "./locations";
import { JobDetails } from "./JobDetails";
import { SampleInputSelect } from "./SampleInputSelect";
import { NewSample } from "./NewSample";

export const PageLatest = () => {
  const [industries, setIndustries] = useState([]);
  const [jobFunctions, setjobFunctions] = useState([]);
  const [skills, setskills] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [jobCount, setJobCount] = useState(0);

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
      // setJobs(response3.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const usp = new URLSearchParams(
    "job_function=test&industry=Broadcast Media&locations=hyderabad"
  );
  console.log(usp.get("job_function"));

  const fetchResult = async () => {
    try {
      const response3 = await axios.get(
        `https://webpipl-api.webpipl.com/api/v1/landingPage/getJobs?job_function=${query}&industry=${industry}&locations=${newLocation}`
      );

      setJobs(response3.data.result);
      setJobCount(response3.data.result.length);
      console.log("here is response: ", response3);
      console.log("here is no.of jobs: ", jobCount);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchResult();
  }, [query, industry, newLocation]);

  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const searchHandler = (e) => {
    setQuery(input);
  };
  const selectLocationHandler = (event) => {
    const e = document.getElementById("drop1");
    const strUser = e.options[e.selectedIndex].value;
    // setNewLocation(strUser);
    console.log("amal onchange works: ", strUser);
  };
  const selectJobHandler = (e) => {
    setQuery(e.target.value);
  };
  const selectIndustryHandler = (e) => {
    setIndustry(e.target.value);
  };
  const locationRef = useRef();
  const handleLocationNew = () => {
    // const select = document.getElementById("drop1");
    // const mySelectedValue = select.options[select.selectedIndex].value;
    // console.log("amal selected location is : ", mySelectedValue);

    console.log("amal here is ref value: ", locationRef);
    console.log(
      "amal here is innerhtml value: ",
      locationRef.current.innerHTML
    );
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
            {/* <label htmlFor="drop1">Locations</label> */}

            <input
              type="text"
              list="drop1"
              id="location-id"
              placeholder="Select Location"
              name="location-name"
            />

            <datalist
              id="drop1"
              className="dropdown drp1"
              ref={locationRef}
              onChange={selectLocationHandler}
            >
              {locations.map((item) => {
                return <option value={item} />;
              })}
            </datalist>
            <button onClick={handleLocationNew}>+</button>
          </div>
          <div className="filter-items flt-item2">
            {/* <label htmlFor="drop2">Interests</label> */}
            <input
              type="text"
              list="drop2"
              id="interests-id"
              placeholder="Select Interests"
              name="interests-name"
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
              />
              <datalist
                id="drop3"
                className="dropdown drp3"
                onChange={selectIndustryHandler}
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
            />
            <datalist
              id="drop4"
              className="dropdown drp4"
              onChange={selectJobHandler}
            >
              {jobFunctions.map((item) => {
                return <option value={item} />;
              })}
            </datalist>
            <button>+</button>
          </div>
        </div>
      </div>
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
      {/* <NewSample /> */}
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
