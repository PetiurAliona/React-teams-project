import { createSlice } from "@reduxjs/toolkit";
import projectOperations, { updateProjectTitle } from "./projects-operations";

const initialState = {
  items: [],
  isLoading: false,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    projectLogOut: () => initialState,
  },
  extraReducers: {
    [projectOperations.getProjects.fulfilled](state, { payload }) {
      if (payload.message === "No projects found") return initialState;

      state.items = [...payload];
    },
    [projectOperations.postProject.fulfilled](state, action) {
      state.items.push(action.payload);
    },
    [projectOperations.deleteProject.fulfilled](state, { payload }) {
      state.items = [
        ...state.items.filter((item) => {
          const itemId = item._id ?? item.id;
          return itemId !== payload;
        }),
      ];
    },
    [projectOperations.addMember.fulfilled](state, { payload }) {
      const currentProject = state.items.filter((item) => {
        const itemId = item._id ?? item.id;
        return itemId === payload.id;
      });
      const idx = state.items.indexOf(currentProject[0]);
      state.items[idx].members = [...payload.data.newMembers];
    },
    // [authOperations.logOut.fulfilled](state) {
    //   state.projects = [];
    // },
    // [projectOperations.postMemberProjects.fulfilled](state, action) {
    //   state.members = [...state.members, ...action.payload];
    // },
    // [projectOperations.patchProject.fulfilled](state, action) {
    //   state = [...state, action.payload];
    // },
    // [projectOperations.deleteProject.fulfilled](state, action) {
    //   state = state.filter(({ _id }) => _id !== action.payload);
    // },
    [updateProjectTitle.fulfilled](state, { payload }) {
      state.items = state.items.map((project) => {
        if (project._id ?? project.id === payload.id) {
          project.title = payload.title.newTitle;
        }
        return project;
      });
    },
  },
});

export const { projectLogOut } = projectsSlice.actions;
export default projectsSlice.reducer;
