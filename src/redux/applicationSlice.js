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
    addAppliedJobs(state, action) {
      state.allAppliedJobs.push(...action.payload);
    },
    setAllApplicants: (state, action) => {
      state.applicants = action.payload;
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
  addAppliedJobs,
} = applicationSlice.actions;
export default applicationSlice.reducer;
