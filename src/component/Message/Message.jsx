import { message } from "antd";

const success = (mes = "Thành công!") => {
  message.success(mes);
};

const error = (mes = "Thất bại, vui lòng thử lại.") => {
  message.error(mes);
};

const warning = (mes = "Warning") => {
  message.warning(mes);
};

export { success, error, warning };
