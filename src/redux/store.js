import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slides/counterSlice";
import userReducer from "./slides/userSlide";

// Store: Store này lưu trữ toàn bộ state của ứng dụng và giúp quản lý sự thay đổi của state thông qua các action và reducer.
export const store = configureStore({
  reducer: {
    // counterReducer: Quản lý logic liên quan đến bộ đếm.
    counter: counterReducer,
    // userReducer: Quản lý logic liên quan đến thông tin người dùng.
    user: userReducer,
  },
});
