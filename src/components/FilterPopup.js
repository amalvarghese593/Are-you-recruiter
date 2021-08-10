import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuery } from "./redux/actions";
import "./filterpopup.css";

export const FilterPopup = (props) => {
  const [filters, setFilters] = useState([]);
  const [isClear, setIsClear] = useState(false);
  const dispatch = useDispatch();

  const clearHandler = () => {
    setFilters([]);
    setIsClear(false);
  };
  const singleClearHandler = (e) => {
    const itemValue = e.currentTarget.id;
    setFilters(filters.filter((i) => i !== itemValue));
    dispatch(deleteQuery(itemValue.toLowecase()));
  };
  useEffect(() => {
    if (props.newValue !== "") {
      setIsClear(true);
    }
  }, [props.newValue]);

  useEffect(() => {
    if (props.newValue !== "") {
      if (!filters.find((item) => item === props.newValue)) {
        setFilters([...filters, props.newValue]);
      }
    }
  }, [props.newValue]);

  useEffect(() => {
    if (filters.length === 0) {
      setIsClear(false);
    }
  }, [filters.length]);

  return (
    <div className="filter-box">
      {filters.map((item) => {
        return (
          <div className="filter-card" id={item} onClick={singleClearHandler}>
            <div>{item}</div>

            <span className="x-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </span>
          </div>
        );
      })}
      {isClear ? (
        <div className="filter-clear-card" onClick={clearHandler}>
          <div>Clear All</div>
          <span className="x-icon2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </span>
        </div>
      ) : null}
    </div>
  );
};
