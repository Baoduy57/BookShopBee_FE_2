import { useEffect } from "react";

const initiateDrift = (email) => {
  if (window.drift) {
    try {
      window.drift.identify(email, {
        email: email,
      });
    } catch (error) {
      console.error("Error initializing Drift:", error);
    }
  } else {
    console.warn("Drift is not initialized.");
  }
};

const reloadDrift = (email) => {
  if (window.drift) {
    try {
      // Đóng cửa sổ chat hiện tại
      window.drift.reset();

      // Khởi tạo lại Drift với email mới
      initiateDrift(email);
    } catch (error) {
      console.error("Error reloading Drift:", error);
    }
  } else {
    console.warn("Drift is not initialized.");
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
