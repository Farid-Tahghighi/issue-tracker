import { Issue } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IssuesState {
  issues: Issue[];
}

const initialState: IssuesState = {
  issues: [],
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    issueAdded: (state, action: PayloadAction<Issue>) => {
      state.issues.push(action.payload);
    },
    issueUpdated: (
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        description: string;
        status: Issue["status"];
      }>
    ) => {
      const { id, title, description, status } = action.payload;
      const issue = state.issues.find((issue) => issue.id === id);
      if (issue) {
        issue.title = title;
        issue.description = description;
        issue.status = status;
      }
    },
    issueDeleted: (state, action: PayloadAction<number>) => {
      state.issues = state.issues.filter(
        (issue) => issue.id !== action.payload
      );
    },
    assignIssue: (
      state,
      action: PayloadAction<{ id: number; assigneeId: string | null }>
    ) => {
      const { id, assigneeId } = action.payload;
      const issue = state.issues.find((issue) => issue.id === id);
      if (issue) {
        issue.assignedToUserId = assigneeId;
      }
    },
    issueStateChanged: (
      state,
      action: PayloadAction<{ id: number; status: Issue["status"] }>
    ) => {
      const { id, status } = action.payload;
      const issue = state.issues.find((issue) => issue.id === id);
      if (issue) {
        issue.status = status;
      }
    },
  },
});

// export const {
//   issueAdded,
//   issueUpdated,
//   issueDeleted,
//   assignIssue,
//   issueStateChanged,
// } = issuesSlice.actions;

export default issuesSlice.reducer;
