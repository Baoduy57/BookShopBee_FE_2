import axios from "axios";
export const axiosJWT = axios.create();

export const getAllProduct = async (search, limit) => {
  let res = {};
  if (search?.length > 0) {
    res = await axios.get(
      `${process.env.REACT_APP_API_TEST}/product/GetAll-Product?filter=name&filter=${search}&limit=${limit}`
    );
  } else {
    res = await axios.get(
      `${process.env.REACT_APP_API_TEST}/product/GetAll-Product?limit=${limit}`
    );
  }

  return res.data;
};

export const createProduct = async (data) => {
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  if (!access_token) {
    console.error("No access token found");
    return;
  }

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_TEST}/product/Create-Product`,
      data
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching user details:", error.response || error);
    // Có thể xử lý thêm ở đây
  }
};

export const getDetailsProduct = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_TEST}/product/Details-Product/${id}`
  );
  return res.data;
};

export const updateProduct = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_TEST}/product/Update-Product/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteProduct = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_TEST}/product/Delete-Product/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteManyProduct = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_TEST}/product/Delete-Many`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
