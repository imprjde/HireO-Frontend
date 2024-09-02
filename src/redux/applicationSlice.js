// import { createSlice } from "@reduxjs/toolkit";

// const applicationSlice = createSlice({
//   name: "application",
//   initialState: {
//     allAppliedJobs: [],
//     applicants: [],
//     isFetchingApplicants: false,
//     isFetchingAppliedJobs: false,
//   },
//   reducers: {
//     setAllAppliedJobs: (state, action) => {
//       state.allAppliedJobs = action.payload;
//     },
//     setAllApplicants: (state, action) => {
//       state.applicants = action.payload;
//       console.log("ABBA JABBA", state.applicants); ///Here I am getting all the applicants in the console
//     },
//     setIsFetchingAppliedJob: (state, action) => {
//       state.isFetchingAppliedJobs = action.payload;
//     },
//     setIsFetchingApplicants: (state, action) => {
//       state.isFetchingApplicants = action.payload;
//     },
//     setApplicantStatusLocally: (state, action) => {
//       console.log("Log", state.applicants); ////Here I am not getting any
//     },
//   },
// });
// export const {
//   setAllAppliedJobs,
//   setIsFetchingApplicants,
//   setAllApplicants,
//   setIsFetchingAppliedJob,
//   setApplicantStatusLocally,
// } = applicationSlice.actions;
// export default applicationSlice.reducer;

//////////// UPDATE APPLICATION STATUS LOCALLY //////////////////////////

import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    allAppliedJobs: [],
    applicants: [],
    applicantStatusLocally: null,
    isFetchingApplicants: false,
    isFetchingAppliedJobs: false,
    appliedJobsFetched: false,
  },
  reducers: {
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setAllApplicants: (state, action) => {
      state.applicants = action.payload;
      console.log("Console 1=", state.applicants);
    },
    setIsFetchingAppliedJob: (state, action) => {
      state.isFetchingAppliedJobs = action.payload;
    },
    setIsFetchingApplicants: (state, action) => {
      state.isFetchingApplicants = action.payload;
    },
    setApplicantStatusLocally: (state, action) => {
      const application = state.applicants.applications.find(
        (application) => application?._id === action?.payload?.applicantId
      );

      if (application) {
        application.status = action?.payload?.newStatus;
      }
    },
    setAppliedJobsFetched(state, action) {
      state.appliedJobsFetched = action.payload;
    },
  },
});
export const {
  setAllAppliedJobs,
  setIsFetchingApplicants,
  setAllApplicants,
  setIsFetchingAppliedJob,
  setApplicantStatusLocally,
  setAppliedJobsFetched,
} = applicationSlice.actions;
export default applicationSlice.reducer;
