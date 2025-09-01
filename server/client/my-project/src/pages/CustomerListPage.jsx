import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerList from "../components/CustomerList";
import Layout from "../layouts/Layout";
import { getCustomerById } from "../apis/customerApi";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../pages/styles/customerListPage.css"; // Import the CSS file

// const API_BASE_URL = "http://localhost:5000/api";
const API_BASE_URL = "https://backendqwipoassign.onrender.com/api"


function CustomerListPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [sortBy, setSortBy] = useState("c.id");
  const [order, setOrder] = useState("ASC");

  const [addressFilter, setAddressFilter] = useState({ country: "", state: "", city: "", postal: "" });
  const [editingAddress, setEditingAddress] = useState(null); // For add/edit modal

  // --- Sorting ---
  const handleSort = (column) => {
    if (sortBy === column) setOrder(order === "ASC" ? "DESC" : "ASC");
    else {
      setSortBy(column);
      setOrder("ASC");
    }
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return <FaSort className="sort-icon" />;
    return order === "ASC" ? <FaSortUp className="sort-icon" /> : <FaSortDown className="sort-icon" />;
  };

  // --- Fetch customers ---
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {


        const response = await axios.get(`${API_BASE_URL}/customers`, {
          params: { page, limit: 50, search, sort_by: sortBy, order }
        });

        setCustomers(response.data.data.data);
        setTotalPages(response.data.data.meta.totalPages);

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [page, search, sortBy, order]);

  // --- Fetch customer details ---
  const handleSelectCustomer = async (customerId) => {
    setSelectedCustomer(customerId);
    setLoadingDetails(true);
    try {
      const data = await getCustomerById(customerId);
      setDetails(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDetails(false);
    }
  };

  // --- Delete customer ---
  const handleDeleteCustomer = (customerId) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this customer?</p>
          <div className="toast-buttons">
            <button
              className="btn-danger"
              onClick={async () => {
                try {
                  await axios.delete(`${API_BASE_URL}/customers/${customerId}`);
                  setCustomers(customers.filter(c => c.id !== customerId));
                  if (selectedCustomer === customerId) setSelectedCustomer(null);
                  toast.success("Customer deleted successfully!");
                } catch (err) {
                  console.error(err);
                  toast.error("Failed to delete customer. Please try again.");
                } finally { closeToast(); }
              }}
            >Yes</button>
            <button className="btn-secondary" onClick={closeToast}>No</button>
          </div>
        </div>
      ), { autoClose: false }
    );
  };

  // --- Highlight search text ---
  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <span key={i} className="highlight">{part}</span> : part
    );
  };

  const handleClearFilters = () => {
    setSearch("");
    setSortBy("c.id");
    setOrder("ASC");
    setPage(1);
    setAddressFilter({ country: "", state: "", city: "", postal: "" });
  };

  // --- Address Filtering ---
  const filteredAddresses = details?.addresses?.filter(a =>
    (!addressFilter.country || a.country?.toLowerCase().includes(addressFilter.country.toLowerCase())) &&
    (!addressFilter.state || a.state?.toLowerCase().includes(addressFilter.state.toLowerCase())) &&
    (!addressFilter.city || a.city?.toLowerCase().includes(addressFilter.city.toLowerCase())) &&
    (!addressFilter.postal || a.pin?.toLowerCase().includes(addressFilter.postal.toLowerCase()))
  );

  // --- Add/Edit/Delete Address Handlers ---
  const handleDeleteAddress = async (addressId) => {
    try {
      await axios.delete(`${API_BASE_URL}/addresses/${addressId}`);
      setDetails({
        ...details,
        addresses: details.addresses.filter(a => a.id !== addressId)
      });
      toast.success("Address deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete address.");
    }
  };

  const handleSaveAddress = async (address) => {
    try {
      if (editingAddress?.id) {
        const res = await axios.put(`${API_BASE_URL}/addresses/${editingAddress.id}`, address);
        setDetails({
          ...details,
          addresses: details.addresses.map(a => a.id === editingAddress.id ? res.data : a)
        });
        toast.success("Address updated!");
      } else {
        const res = await axios.post(`${API_BASE_URL}/customers/${selectedCustomer}/addresses`, address);
        setDetails({
          ...details,
          addresses: [...details.addresses, res.data]
        });
        toast.success("Address added!");
      }
      setEditingAddress(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save address.");
    }
  };

  return (
    <Layout>
      <ToastContainer position="top-right" />
      <h2 className="page-title">Customer List</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, city, state, pin..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-search"
        />
        <button onClick={handleClearFilters} className="btn-clear">Clear Filters</button>
      </div>

      {/* Sorting Headers */}
      <div className="sort-header">
        <div className="sort-item" onClick={() => handleSort("c.id")}>ID {getSortIcon("c.id")}</div>
        <div className="sort-item" onClick={() => handleSort("c.first_name")}>First Name {getSortIcon("c.first_name")}</div>
        <div className="sort-item" onClick={() => handleSort("c.last_name")}>Last Name {getSortIcon("c.last_name")}</div>
        <div className="sort-item" onClick={() => handleSort("c.phone_number")}>Phone {getSortIcon("c.phone_number")}</div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-text">Error: {error.message}</p>}

      <CustomerList
        customers={customers}
        onDelete={handleDeleteCustomer}
        onSelect={handleSelectCustomer}
        search={search}
        highlightText={highlightText}
      />

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="btn-page">Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="btn-page">Next</button>
      </div>

      {/* Customer Details & Address Management */}
      {selectedCustomer && (
        <div className="customer-details">
          {loadingDetails ? <p>Loading details...</p> : details ? (
            <>
              <h3 className="customer-name">{details.first_name} {details.last_name}</h3>
              <button
                onClick={() => handleDeleteCustomer(details.id)}
                className="btn-danger mb-4"
              >Delete Customer</button>

              {/* Address Filters */}
              <div className="address-filters">
                {["country", "state", "city", "postal"].map(f => (
                  <input
                    key={f}
                    type="text"
                    placeholder={`Filter by ${f}`}
                    value={addressFilter[f]}
                    onChange={e => setAddressFilter({ ...addressFilter, [f]: e.target.value })}
                    className="input-address-filter"
                  />
                ))}
                <button className="btn-add" onClick={() => setEditingAddress({})}>Add Address</button>
              </div>

              {/* Address List */}
              <div className="address-list">
                {filteredAddresses?.length > 0 ? filteredAddresses.map(addr => (
                  <div key={addr.id} className="address-card">
                    <p>{addr.street}, {addr.city}, {addr.state}, {addr.country}, {addr.pin}</p>
                    <div className="address-actions">
                      <button className="btn-edit" onClick={() => setEditingAddress(addr)}>Edit</button>
                      <button className="btn-danger" onClick={() => handleDeleteAddress(addr.id)}>Delete</button>
                    </div>
                  </div>
                )) : <p>No addresses found.</p>}
              </div>

              {/* Add/Edit Address Modal */}
              {editingAddress !== null && (
                <div className="modal-overlay">
                  <div className="modal">
                    <h4>{editingAddress.id ? "Edit Address" : "Add Address"}</h4>
                    {["street", "city", "state", "country", "pin"].map(f => (
                      <input
                        key={f}
                        type="text"
                        placeholder={f}
                        className="input-address"
                        value={editingAddress[f] || ""}
                        onChange={e => setEditingAddress({ ...editingAddress, [f]: e.target.value })}
                      />
                    ))}
                    <div className="modal-actions">
                      <button className="btn-secondary" onClick={() => setEditingAddress(null)}>Cancel</button>
                      <button className="btn-save" onClick={() => handleSaveAddress(editingAddress)}>Save</button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : <p>No details found.</p>}
        </div>
      )}
    </Layout>
  );
}

export default CustomerListPage;





















