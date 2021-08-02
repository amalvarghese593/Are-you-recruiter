import React from "react";
import { Link } from "react-router-dom";

export const JobDetails = (props) => {
  return (
    <div className="jobs-container">
      <div className="job-details">
        <h4>Company Name</h4>
        <Link style={{ textDecoration: "none" }}>
          <h5>Job Title</h5>
          {/* <h5>{item.job_title}</h5>; */}
        </Link>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
          architecto illum
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#555d50"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="10" r="3" />
          <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
        </svg>
        <span>
          <h5>Location</h5>
        </span>
      </div>
      <div className="recruiter-details">
        <p>Recruiter Information</p>
      </div>
    </div>
  );
};
