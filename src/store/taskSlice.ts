import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./configureStore";

export interface taskListState {
  list: Task[];
  isFiltred: boolean;
  filtredList: Task[];
  notification: string;
}

const initialState: taskListState = {
  list: [],
  filtredList: [],
  isFiltred: false,
  notification: "",
};

export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task["header"]>) => {
      state.list.push({
        id: crypto.randomUUID(),
        header: action.payload,
        done: false,
      });
    },
    toggleFilter: (state) => {
      state.isFiltred = !state.isFiltred;
      if (state.isFiltred) {
        state.filtredList = state.list.filter((task) => !task.done);
      } else {
        state.filtredList = [];
      }
    },
    completeTask: (state, action: PayloadAction<Task["id"]>) => {
      const task = state.list.find((x) => x.id === action.payload);

      if (task) {
        task.done = true;
      }
    },
    toggleTask: (state, action: PayloadAction<Task["id"]>) => {
      const task = state.list.find((x) => x.id === action.payload);

      if (task) {
        task.done = !task.done;

        if (task.done) {
          state.notification = `Задача "${task.header}" завершена`;
        }
      }
    },
    deleteTask: (state, action: PayloadAction<Task["id"]>) => {
      state.list = state.list.filter((x) => x.id !== action.payload);
    },
    setNotification: (state, action: PayloadAction<Task["header"]>) => {
      state.notification = `Задача "${action.payload}" завершена`;
    },
    clearNotification: (state) => {
      state.notification = "";
    },
  },
});

export const {
  addTask,
  completeTask,
  deleteTask,
  toggleTask,
  clearNotification,
  toggleFilter,
} = taskListSlice.actions;

export default taskListSlice.reducer;
export const tasksSelector = (state: RootState) =>
  state.taskList.isFiltred ? state.taskList.filtredList : state.taskList.list;

export const fullCount = (state: RootState) =>
  state.taskList.isFiltred
    ? state.taskList.filtredList.length
    : state.taskList.list.length;

export const completeCount = (state: RootState) =>
  state.taskList.isFiltred
    ? state.taskList.filtredList.filter((x) => x.done).length
    : state.taskList.list.filter((x) => x.done).length;

export const uncompleteCount = (state: RootState) =>
  state.taskList.isFiltred
    ? state.taskList.filtredList.filter((x) => !x.done).length
    : state.taskList.list.filter((x) => !x.done).length;

export const getNotification = (state: RootState) =>
  state.taskList.notification;
