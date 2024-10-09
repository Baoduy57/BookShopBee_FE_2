import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

export const productSlide = createSlice({
  // name: "product": Tên của slide, dùng để nhận diện slide này khi kết hợp với các slide khác trong Redux store.
  name: "product",
  // initialState: Trạng thái ban đầu của slice, được lấy từ biến initialState.
  initialState,
  // reducers: Đây là nơi định nghĩa các hàm reducer để thay đổi state của slice. Mỗi reducer là một hàm nhận state hiện tại và một action. Khi action được gọi, reducer sẽ cập nhật state dựa trên logic định nghĩa trong đó.
  reducers: {
    searchProduct: (state, action) => {
      state.search = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { searchProduct } = productSlide.actions;

export default productSlide.reducer;
