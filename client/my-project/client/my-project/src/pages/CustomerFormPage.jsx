import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import { useCustomers } from "../hooks/useCustomers";
import { getCustomerById, updateMultipleAddresses, addMultipleAddresses } from "../apis/customerApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../pages/styles/customerFormPage.css";

function CustomerFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { addCustomer, editCustomer } = useCustomers();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    address_details: "",
    city: "",
    state: "",
    pin_code: "",
  });

  const [addresses, setAddresses] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch customer details if editing
  useEffect(() => {
    if (isEdit) {
      getCustomerById(id).then((data) => {
        setForm({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          phone_number: data.phone_number || "",
          address_details: data.address_details || "",
          city: data.city || "",
          state: data.state || "",
          pin_code: data.pin_code || "",
        });
        setAddresses(
          data.addresses?.map((a) => ({
            id: a.id,
            address_details: a.address_details,
            city: a.city,
            state: a.state,
            pin_code: a.pin_code,
            is_primary: a.is_primary,
          })) || []
        );
      });
    }
  }, [id, isEdit]);

  // Validation
  const validate = () => {
    let newErrors = {};
    if (!form.first_name.trim()) newErrors.first_name = "First Name is required";
    if (!form.last_name.trim()) newErrors.last_name = "Last Name is required";
    if (!/^[0-9]{10}$/.test(form.phone_number))
      newErrors.phone_number = "Phone number must be 10 digits";
    if (!form.address_details.trim()) newErrors.address_details = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!/^[0-9]{6}$/.test(form.pin_code)) newErrors.pin_code = "Pin code must be 6 digits";

    addresses.forEach((a, index) => {
      if (!a.address_details.trim()) newErrors[`address_${index}`] = "Address is required";
      if (!a.city.trim()) newErrors[`city_${index}`] = "City is required";
      if (!a.state.trim()) newErrors[`state_${index}`] = "State is required";
      if (!/^[0-9]{6}$/.test(a.pin_code)) newErrors[`pin_${index}`] = "Pin code must be 6 digits";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handlers
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddressChange = (index, field, value) => {
    const newAddrs = [...addresses];
    newAddrs[index][field] = value;
    setAddresses(newAddrs);
  };

  const addAddress = () =>
    setAddresses([...addresses, { address_details: "", city: "", state: "", pin_code: "", is_primary: 0 }]);

  const removeAddress = (index) => {
    const newAddrs = [...addresses];
    newAddrs.splice(index, 1);
    setAddresses(newAddrs);
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      if (isEdit) {
        // -------------------
        // Update customer
        // -------------------
        await editCustomer(id, form);

        // Split addresses into existing and new
        const existingAddresses = addresses.filter((a) => a.id);
        const newAddresses = addresses.filter((a) => !a.id).map((a) => ({ ...a, customer_id: id }));

        // Update existing addresses
        if (existingAddresses.length > 0) {
          await updateMultipleAddresses(existingAddresses);
        }

        // Add new addresses
        if (newAddresses.length > 0) {
          await addMultipleAddresses(newAddresses);
        }

        toast.success("Customer and addresses updated successfully!");
      } else {
        // -------------------
        // Create customer
        // -------------------
        const customerResp = await addCustomer(form);
        console.log("Customer Response:", customerResp);

        const customerId = customerResp.data.id; // ✅ Correct

        if (!customerId) throw new Error("Customer ID not returned from API");

        // Prepare all addresses
        const allAddresses = [
          {
            customer_id: customerId,
            address_details: form.address_details,
            city: form.city,
            state: form.state,
            pin_code: form.pin_code,
            is_primary: 1,
          },
          ...addresses.map((a) => ({ ...a, customer_id: customerId })),
        ];

        // Add all addresses
        if (allAddresses.length > 0) {
          await addMultipleAddresses(allAddresses);
        }

        toast.success("Customer and addresses created successfully!");
      }

      // Navigate after success
      setTimeout(() => navigate("/customers"), 1500);
    } catch (err) {
      console.error("Error in handleSubmit:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "First Name", name: "first_name" },
    { label: "Last Name", name: "last_name" },
    { label: "Phone Number", name: "phone_number", type: "tel" },
    { label: "Address", name: "address_details" },
    { label: "City", name: "city" },
    { label: "State", name: "state" },
    { label: "Pin Code", name: "pin_code", type: "number" },
  ];

  return (
    <Layout>
      <div className="customer-form-page">
        <h2>{isEdit ? "Edit Customer" : "Add New Customer"}</h2>

        <form onSubmit={handleSubmit} className="customer-form">
          {fields.map((field) => (
            <div key={field.name} className="form-group">
              <label>{field.label}</label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                className="form-input"
              />
              {errors[field.name] && <p className="error-text">{errors[field.name]}</p>}
            </div>
          ))}

          <h3>Other Addresses</h3>
          {addresses.map((addr, index) => (
            <div key={addr.id || index} className="address-row">
              <input
                type="text"
                placeholder="Address"
                value={addr.address_details}
                onChange={(e) => handleAddressChange(index, "address_details", e.target.value)}
                className="form-input"
              />
              <input
                type="text"
                placeholder="City"
                value={addr.city}
                onChange={(e) => handleAddressChange(index, "city", e.target.value)}
                className="form-input"
              />
              <input
                type="text"
                placeholder="State"
                value={addr.state}
                onChange={(e) => handleAddressChange(index, "state", e.target.value)}
                className="form-input"
              />
              <input
                type="number"
                placeholder="Pin"
                value={addr.pin_code}
                onChange={(e) => handleAddressChange(index, "pin_code", e.target.value)}
                className="form-input"
              />
              <label className="primary-checkbox">
                <input
                  type="checkbox"
                  checked={addr.is_primary}
                  onChange={() => {
                    const newAddrs = addresses.map((a, i) => ({ ...a, is_primary: i === index ? 1 : 0 }));
                    setAddresses(newAddrs);
                  }}
                />
                <span>Primary</span>
                <button type="button" onClick={() => removeAddress(index)} className="remove-btn">
                  X
                </button>
              </label>
            </div>
          ))}

          <button type="button" className="btn-add" onClick={addAddress}>
            + Add Address
          </button>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Saving..." : "Submit"}
          </button>
        </form>

        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </Layout>
  );
}

export default CustomerFormPage;
