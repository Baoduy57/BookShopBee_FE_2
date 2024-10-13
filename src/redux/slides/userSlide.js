import { createSlice } from "@reduxjs/toolkit";

// initialState: Xác định trạng thái ban đầu của thông tin người dùng.
const initialState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
  access_token: "",
  city: "",
  isAdmin: false,
};

export const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    // updateUser: Cập nhật thông tin người dùng khi có dữ liệu mới
    updateUser: (state, action) => {
      const {
        _id = "",
        name = "",
        email = "",
        access_token = "",
        phone = "",
        address = "",
        avatar = "",
        city = "",
        isAdmin,
      } = action.payload;
      state.id = _id;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      state.access_token = access_token;
      state.city = city;
      state.isAdmin = isAdmin;
    },
    // resetUser: Đặt lại thông tin người dùng về giá trị mặc định
    resetUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.phone = "";
      state.address = "";
      state.avatar = "";
      state.access_token = "";
      state.city = "";
      state.isAdmin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
