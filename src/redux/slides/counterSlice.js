import { createSlice } from "@reduxjs/toolkit";

// Đây là trạng thái ban đầu của slice counter. Ở đây, value có giá trị mặc định là 0.
const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  // name: "counter": Tên của slice, dùng để nhận diện slice này khi kết hợp với các slice khác trong Redux store.
  name: "counter",
  // initialState: Trạng thái ban đầu của slice, được lấy từ biến initialState.
  initialState,
  // reducers: Đây là nơi định nghĩa các hàm reducer để thay đổi state của slice. Mỗi reducer là một hàm nhận state hiện tại và một action. Khi action được gọi, reducer sẽ cập nhật state dựa trên logic định nghĩa trong đó.
  reducers: {
    // Hàm này tăng giá trị value trong state lên 1.
    increment: (state) => {
      state.value += 1;
    },
    // Hàm này giảm giá trị value trong state đi 1.
    decrement: (state) => {
      state.value -= 1;
    },
    // Hàm này nhận thêm một giá trị action.payload và tăng giá trị value theo giá trị đó.
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
