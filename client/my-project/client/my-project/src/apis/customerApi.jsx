import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/api";

const API_BASE_URL = "https://backendqwipoassign.onrender.com/api"

export const getCustomers = async (params = {}) => {
  const response = await axios.get(`${API_BASE_URL}/customers`, { params });
  return response.data.data.data;
};

export const getCustomerById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/customers/${id}`);
  return response.data.data;
};

export const createCustomer = async (customer) => {
  const response = await axios.post(`${API_BASE_URL}/customers`, customer);
  return response.data;
};

export const updateCustomer = async (id, customer) => {
  const response = await axios.put(`${API_BASE_URL}/customers/${id}`, customer);
  return response.data;
};

export const deleteCustomer = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/customers/${id}`);
  return response.data;
};

export const getAddresses = async (customerId) => {
  const response = await axios.get(`${API_BASE_URL}/customers/${customerId}/addresses`);
  return response.data.data;
};

export const createAddress = async (customerId, address) => {
  const response = await axios.post(`${API_BASE_URL}/customers/${customerId}/addresses`, address);
  return response.data;
};

export const updateAddress = async (addressId, address) => {
  const response = await axios.put(`${API_BASE_URL}/addresses/${addressId}`, address);
  return response.data;
};

export const deleteAddress = async (addressId) => {
  const response = await axios.delete(`${API_BASE_URL}/addresses/${addressId}`);
  return response.data;
};

export const updateMultipleAddresses = async (addresses) => {
  const response = await axios.put(`${API_BASE_URL}/addresses/multiple`, { addresses });
  return response.data;
};


export const addMultipleAddresses = async (addresses) => {
  const response = await axios.post(`${API_BASE_URL}/addresses/multiple`, { addresses });
  return response.data;
};
