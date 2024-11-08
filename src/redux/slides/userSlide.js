// Redux để quản lý trạng thái thông tin người dùng, bao gồm tên, email, điện thoại, địa chỉ, ảnh đại diện, token truy cập, thành phố, và quyền quản trị (isAdmin).
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
    //     Cập nhật thông tin người dùng khi có dữ liệu mới từ action.payload.
    // Các thuộc tính như id, name, email,... được lấy từ action.payload và cập nhật vào state.
    // Các giá trị mặc định (ví dụ name = "") giúp đảm bảo các thuộc tính luôn có giá trị (tránh undefined nếu thuộc tính không tồn tại trong payload).
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
        refreshToken = "",
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
      state.refreshToken = refreshToken;
      state.isAdmin = isAdmin;
    },
    // resetUser: Đặt lại thông tin người dùng về giá trị mặc định
    //     Đặt lại tất cả thông tin người dùng về giá trị mặc định.
    // Thường dùng khi người dùng đăng xuất hoặc cần reset trạng thái người dùng.
    resetUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.phone = "";
      state.address = "";
      state.avatar = "";
      state.access_token = "";
      state.city = "";
      state.refreshToken = "";
      state.isAdmin = false;
    },
  },
});

// Action creators are generated for each case reducer function
// Action creators: updateUser và resetUser được tự động tạo dựa trên tên các reducer, giúp dễ dàng gọi các action này trong các component.
// Reducer: userSlide.reducer là reducer chính của slice, sẽ được thêm vào Redux store để quản lý trạng thái người dùng.
export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
