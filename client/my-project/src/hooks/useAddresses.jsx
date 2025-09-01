import { useState, useEffect } from "react";
import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress
} from "../apis/customerApi"

export function useAddresses(customerId) {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch addresses for the given customer
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const data = await getAddresses(customerId);
      setAddresses(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (customerId) fetchAddresses();
  }, [customerId]);

  // CRUD Operations
  const addAddress = async (address) => {
    await createAddress(customerId, address);
    fetchAddresses();
  };

  const editAddress = async (addressId, address) => {
    await updateAddress(addressId, address);
    fetchAddresses();
  };

  const removeAddress = async (addressId) => {
    await deleteAddress(addressId);
    fetchAddresses();
  };

  return {
    addresses,
    loading,
    error,
    addAddress,
    editAddress,
    removeAddress,
    fetchAddresses
  };
}
