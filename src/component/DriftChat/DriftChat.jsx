import { useEffect } from "react";

const initiateDrift = (email) => {
  if (window.drift) {
    window.drift.identify(email, {
      email: email,
    });
  }
};

const reloadDrift = (email) => {
  if (window.drift) {
    // Đóng cửa sổ chat hiện tại
    window.drift.reset();

    // Khởi tạo lại Drift với email mới
    initiateDrift(email);
  }
};

const DriftChat = ({ email }) => {
  useEffect(() => {
    if (email) {
      reloadDrift(email);
    }
  }, [email]);

  return null; // Không cần trả về phần tử nào vì Drift tự thêm cửa sổ chat vào trang
};

export default DriftChat;
