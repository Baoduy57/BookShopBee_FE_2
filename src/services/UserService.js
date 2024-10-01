import axios from "axios";
export const axiosJWT = axios.create();

//call api
export const loginUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_TEST}/user/Sign-In`,
    data
  );
  return res.data;
};

export const signupUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_TEST}/user/Sign-Up`,
    data
  );
  return res.data;
};

export const getDetailsUser = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_TEST}/user/Get-Details/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const refreshToken = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_TEST}/user/Refresh-Token`,
    { withCredentials: true }
  );
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_TEST}/user/Log-Out`
  );
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_TEST}/user/Update-User/${id}`,
    data
  );
  return res.data;
};
