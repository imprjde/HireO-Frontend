import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    jobsFetched: false,
    filteredJobs: [],
    searchedJobs: [],
    savedJobs: [],
    jobEditData: {},
    showFilter: false,
    filterObject: {},
    query: null,
    isFetchingSavedJobs: false,
    isFetchingAdminJobs: false,
    isSearching: false,
    isLoading: true,
    singleJobById: null,
    searchText: "",
    apply: false,
    adminJobs: null,
    searchAdminJobs: "",
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setJobsFetched: (state, action) => {
      state.jobsFetched = action.payload;
    },
    resetJobs: (state) => {
      state.allJobs = [];
      state.jobsFetched = false;
    },
    addJobs: (state, action) => {
      state.allJobs = [...state.allJobs, ...action.payload];
    },
    setFilteredJobs: (state, action) => {
      state.filteredJobs = action.payload;
    },
    setSingleJobById: (state, action) => {
      state.singleJobById = action.payload;
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },
    setApply: (state, action) => {
      state.apply = action.payload;
    },

    setAdminJobs: (state, action) => {
      state.adminJobs = action.payload;
    },
    setIsFetchingAdminJobs: (state, action) => {
      state.isFetchingAdminJobs = action.payload;
    },
    setSearchAdminJobs: (state, action) => {
      state.searchAdminJobs = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setSearchedJobs: (state, action) => {
      state.searchedJobs = action.payload;
    },
    setSavedJobs: (state, action) => {
      state.savedJobs = action.payload;
    },
    setIsFetchingSavedJobs: (state, action) => {
      state.isFetchingSavedJobs = action.payload;
    },
    setRemoveJobLocally: (state, action) => {
      let receivedId = action.payload;
      state.savedJobs = state.savedJobs.filter((job) => job._id !== receivedId);
    },
    setSaveJobLocally: (state, action) => {
      state.savedJobs = [...state.savedJobs, action.payload];
    },
    setAdminJobsLocally: (state, action) => {
      let receivedId = action.payload;
      state.adminJobs = state.adminJobs.filter((job) => job._id !== receivedId);
    },
    setJobEditData: (state, action) => {
      state.jobEditData = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setClearSavedJobs: (state, action) => {
      state.savedJobs = action.payload;
    },
    setFilterObject: (state, action) => {
      //Check if this is userd anywhere or not   or lese remove this
      const { key, value } = action.payload;
      state.filterObject = { ...state.filterObject, [key]: value };
    },
    setShowFilter: (state, action) => {
      state.showFilter = action.payload;
    },
  },
});

export const {
  setAllJobs,
  addJobs,
  setJobsFetched,
  resetJobs,
  isLoading,
  setIsLoading,
  setFilteredJobs,
  setSingleJobById,
  setSearchText,
  setApply,
  setIsFetchingAdminJobs,
  setSearchedJobs,
  setAdminJobs,
  setSearchAdminJobs,
  setSavedJobs,
  setIsFetchingSavedJobs,
  setRemoveJobLocally,
  setSaveJobLocally,
  setIsSearching,
  setAdminJobsLocally,
  setJobEditData,
  setQuery,
  setClearSavedJobs,
  setFilterObject,
  setShowFilter,
} = jobSlice.actions;

export default jobSlice.reducer;
