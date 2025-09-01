





import { useState, useEffect } from "react";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer
} from "../apis/customerApi";

export function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch customers from API
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const params = {
        search,       // ✅ backend expects "search"
        page,
        limit: pageSize // ✅ backend expects "limit"
      };

      const res = await getCustomers(params);

      setCustomers(res.data); // ✅ backend sends { data, meta }
      setTotalPages(res.meta.totalPages || 1);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search, page]);

  // CRUD Operations
  // const addCustomer = async (customer) => {
  //   await createCustomer(customer);
  //   fetchCustomers();
  // };


  const addCustomer = async (customer) => {
  const response = await createCustomer(customer); // call API
  fetchCustomers(); // refresh list
  return response; // ✅ return response so component can use it
};


  // const editCustomer = async (id, customer) => {
  //   await updateCustomer(id, customer);
  //   fetchCustomers();
  // };


  const editCustomer = async (id, customer) => {
  const response = await updateCustomer(id, customer);
  fetchCustomers();
  return response;
};


  const removeCustomer = async (id) => {
    await deleteCustomer(id);
    fetchCustomers();
  };

  return {
    customers,
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    addCustomer,
    editCustomer,
    removeCustomer,
    fetchCustomers
  };
}
