import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import { getCustomerById } from "../apis/customerApi";
import AddressList from "../components/AddressList";
import AddressForm from "../components/AddressForm";
import "../pages/styles/CustomerDetailsPage.css"; // Import the CSS

function CustomerDetailPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getCustomerById(id).then((data) => {
      setCustomer(data);
      setAddresses(data.addresses || []);
    });
  }, [id]);

  const handleAddressSubmit = (form) => {
    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddress.id ? { ...addr, ...form } : addr
        )
      );
      setEditingAddress(null);
    } else {
      setAddresses((prev) => [
        ...prev,
        { id: Date.now(), ...form, customer_id: customer.id },
      ]);
    }
    setShowForm(false);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleDeleteAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <Layout>
      <div className="customer-detail">
        {!customer ? (
          <p>Loading customer details...</p>
        ) : (
          <>
            <h2>{customer.first_name} {customer.last_name}</h2>
            <p><strong>Phone:</strong> {customer.phone_number}</p>

            <h3>Addresses</h3>
            <button
              className="btn-add-address"
              onClick={() => {
                setShowForm(true);
                setEditingAddress(null);
              }}
            >
              Add Address
            </button>

            {showForm && (
              <AddressForm
                className="address-form"
                initialData={editingAddress || {}}
                onSubmit={handleAddressSubmit}
                onCancel={() => setShowForm(false)}
              />
            )}

            <AddressList
              className="address-list"
              addresses={addresses}
              onEdit={handleEditAddress}
              onDelete={handleDeleteAddress}
            />
          </>
        )}
      </div>
    </Layout>
  );
}

export default CustomerDetailPage;









