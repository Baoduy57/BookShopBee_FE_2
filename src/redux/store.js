import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slides/productSlide";
import userReducer from "./slides/userSlide";
import orderReducer from "./slides/orderSlide";

// Store: Store này lưu trữ toàn bộ state của ứng dụng và giúp quản lý sự thay đổi của state thông qua các action và reducer.
export const store = configureStore({
  reducer: {
    // productReducer: Quản lý logic liên quan đến thông tin san pham.
    product: productReducer,
    // userReducer: Quản lý logic liên quan đến thông tin người dùng.
    user: userReducer,
    order: orderReducer,
  },
});
