// Redux dùng để quản lý trạng thái của đơn hàng, bao gồm các thông tin về sản phẩm, địa chỉ giao hàng, phương thức thanh toán và trạng thái thanh toán/giao hàng.
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  orderItemsSelected: [],
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
  isSuccessOrder: false,
};

export const orderSlide = createSlice({
  // name: "order": Tên của slide, dùng để nhận diện slide này khi kết hợp với các slide khác trong Redux store.
  name: "order",
  // initialState: Trạng thái ban đầu của slice, được lấy từ biến initialState.
  initialState,
  // reducers: Đây là nơi định nghĩa các hàm reducer để thay đổi state của slice. Mỗi reducer là một hàm nhận state hiện tại và một action. Khi action được gọi, reducer sẽ cập nhật state dựa trên logic định nghĩa trong đó.
  reducers: {
    // Thêm một sản phẩm vào đơn hàng.
    // Nếu sản phẩm đã tồn tại và số lượng còn trong kho cho phép, thì tăng amount của sản phẩm đó.
    // Nếu sản phẩm chưa tồn tại trong orderItems, thêm mới vào danh sách.
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === orderItem.product
      );
      if (itemOrder) {
        if (itemOrder.amount <= itemOrder.countInStock) {
          itemOrder.amount += orderItem?.amount;
          state.isSuccessOrder = true;
        }
      } else {
        state.orderItems.push(orderItem);
      }
    },
    // Đặt lại trạng thái isSuccessOrder về false. Thường dùng khi cần reset trạng thái sau khi thêm đơn hàng thành công.
    resetOrder: (state) => {
      state.isSuccessOrder = false;
    },
    // Tăng số lượng (amount) của sản phẩm trong orderItems và orderItemsSelected.
    increaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === idProduct
      );
      const itemOrderSelected = state?.orderItemsSelected?.find(
        (item) => item?.product === idProduct
      );
      itemOrder.amount++;
      if (itemOrderSelected) {
        itemOrderSelected.amount++;
      }
    },
    // Giảm số lượng (amount) của sản phẩm trong orderItems và orderItemsSelected.
    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === idProduct
      );
      const itemOrderSelected = state?.orderItemsSelected?.find(
        (item) => item?.product === idProduct
      );
      itemOrder.amount--;
      if (itemOrderSelected) {
        itemOrderSelected.amount--;
      }
    },
    // Xóa một sản phẩm khỏi orderItems và orderItemsSelected dựa trên idProduct được cung cấp.
    removeOrderProduct: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.filter(
        (item) => item?.product !== idProduct
      );
      const itemOrderSelected = state?.orderItemsSelected?.filter(
        (item) => item?.product !== idProduct
      );
      state.orderItems = itemOrder;
      state.orderItemsSelected = itemOrderSelected;
    },
    // Xóa toàn bộ các sản phẩm có trong danh sách listChecked khỏi orderItems và orderItemsSelected.
    removeAllOrderProduct: (state, action) => {
      const { listChecked } = action.payload;
      const itemOrders = state?.orderItems?.filter(
        (item) => !listChecked.includes(item.product)
      );
      const itemOrdersSelected = state?.orderItemsSelected?.filter(
        (item) => !listChecked.includes(item.product)
      );
      state.orderItems = itemOrders;
      state.orderItemsSelected = itemOrdersSelected;
    },
    // Chọn một số sản phẩm để đưa vào orderItemsSelected dựa trên listChecked.
    selectedOrder: (state, action) => {
      const { listChecked } = action.payload;
      const orderSelected = [];
      state.orderItems.forEach((order) => {
        if (listChecked.includes(order.product)) {
          orderSelected.push(order);
        }
      });
      state.orderItemsSelected = orderSelected;
    },
  },
});

// Action creators are generated for each case reducer function
// Các action creator (addOrderProduct, increaseAmount, decreaseAmount,...) được tự động tạo dựa trên tên các reducer, giúp dễ dàng gọi các action trong các thành phần React.
// orderSlide.reducer là reducer chính của slice, sẽ được tích hợp vào Redux store để quản lý toàn bộ trạng thái liên quan đến đơn hàng.
export const {
  addOrderProduct,
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
  removeAllOrderProduct,
  selectedOrder,
  resetOrder,
} = orderSlide.actions;

export default orderSlide.reducer;
