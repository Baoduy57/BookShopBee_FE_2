import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  shippingAddress: {},
  paymentMethod: "",
  totalPrice: 0,
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  user: "",
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
};

export const orderSlide = createSlice({
  // name: "order": Tên của slide, dùng để nhận diện slide này khi kết hợp với các slide khác trong Redux store.
  name: "order",
  // initialState: Trạng thái ban đầu của slice, được lấy từ biến initialState.
  initialState,
  // reducers: Đây là nơi định nghĩa các hàm reducer để thay đổi state của slice. Mỗi reducer là một hàm nhận state hiện tại và một action. Khi action được gọi, reducer sẽ cập nhật state dựa trên logic định nghĩa trong đó.
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === orderItem.product
      );
      if (itemOrder) {
        itemOrder.amount += orderItem?.amount;
      } else {
        state.orderItems.push(orderItem);
      }
    },

    removeOrderProduct: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product !== idProduct
      );
      itemOrder.orderItems = itemOrder;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addOrderProduct } = orderSlide.actions;

export default orderSlide.reducer;
