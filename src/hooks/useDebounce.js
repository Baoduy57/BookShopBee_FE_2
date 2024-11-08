import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  const [valueDebounce, setValueDebounce] = useState("");
  useEffect(() => {
    const handle = setTimeout(() => {
      setValueDebounce(value);
    }, [delay]);
    return () => {
      clearTimeout(handle);
    };
  }, [value]);
  return valueDebounce;
};
// thường dùng để trì hoãn việc cập nhật giá trị value. Điều này rất hữu ích khi bạn cần giới hạn số lần thực hiện hành động do người dùng nhập liệu (ví dụ: tìm kiếm khi người dùng nhập văn bản) để tránh gọi API liên tục.
// useDebounce: Đây là một custom hook được thiết kế để trả về phiên bản "debounced" của giá trị value, tức là một phiên bản sẽ chỉ cập nhật sau khi người dùng ngừng nhập liệu một khoảng thời gian (xác định bởi delay).
// useEffect: Hook này theo dõi sự thay đổi của value. Mỗi khi value thay đổi, useEffect sẽ:
// Tạo setTimeout: Đặt một timeout với thời gian delay, sau đó cập nhật valueDebounce bằng giá trị của value khi timeout kết thúc.
// Dọn dẹp (cleanup): Trước khi mỗi lần useEffect chạy lại do value thay đổi, clearTimeout(handle) được gọi để hủy bỏ timeout trước đó, tránh tình trạng cập nhật valueDebounce không mong muốn.
