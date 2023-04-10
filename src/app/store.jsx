import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import courseReducer from "./features/course/courseSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const userPersistConfig = {
  key: "user-persist",
  storage,
};
const coursePersistConfig = {
  key: "course-persist",
  storage,
};

const userPersistedReducer = persistReducer(userPersistConfig, userReducer);
const coursePersistedReducer = persistReducer(coursePersistConfig, courseReducer);


const rootReducer = combineReducers({
  user: userPersistedReducer,
  course:coursePersistedReducer
 
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
