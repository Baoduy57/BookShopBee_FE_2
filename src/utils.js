// Kiểm tra xem một chuỗi có phải là chuỗi JSON hợp lệ hay không. Hàm này cố gắng phân tích cú pháp chuỗi data bằng cách sử dụng JSON.parse().
export const isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (error) {
    return false;
  }
  return true;
};

// Chuyển đổi một file thành chuỗi Base64. Hàm nhận vào một file và sử dụng FileReader để đọc dữ liệu file dưới dạng URL base64.
export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Tạo một đối tượng cấu hình cho các mục trong danh sách hoặc menu. Hàm nhận các tham số như label (nhãn), key (khóa định danh), icon (biểu tượng), children (các mục con), và type (loại mục).
export const getItem = (label, key, icon, children, type) => {
  return {
    label,
    key,
    icon,
    children,
    type,
  };
};

export const renderOption = (arr) => {
  let results = [];
  if (arr) {
    results = arr?.map((opt) => {
      return {
        label: opt,
        value: opt,
      };
    });
  }
  results.push({
    label: "Add type",
    value: "add_type",
  });
  return results;
};

export const convertPrice = (price) => {
  try {
    const result = price?.toLocaleString().replaceAll(",", ".");
    return `${result} VND`;
  } catch (error) {
    return null;
  }
};
