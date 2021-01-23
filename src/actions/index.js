import axios from "axios";
import JOB_DATA from "./IndeedJobData.json";
import { FETCH_JOBS, LIKE_JOB } from "./types";

// const GITHUB_BASE_URL = "https://jobs.github.com/positions.json?";

export const fetchJobs = (lat, long, cb) => async (dispatch) => {
  try {
    // const { data } = await axios.get(
    //   `${GITHUB_BASE_URL}lat=${lat}&long=${long}`
    // );
    // console.log({data});
    const data = JOB_DATA;
    dispatch({ type: FETCH_JOBS, payload: data });
    cb();
  } catch (error) {
    console.log(error.message);
  }
};

export const likeJob = (job) => {
  return {
    type: LIKE_JOB, payload: job
  };
};
