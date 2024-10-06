import axios from "axios";
export const axiosJWT = axios.create();

export const getAllProduct = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_TEST}/product/GetAll-Product`
  );
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_TEST}/product/Create-Product`,
    data
  );
  return res.data;
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
