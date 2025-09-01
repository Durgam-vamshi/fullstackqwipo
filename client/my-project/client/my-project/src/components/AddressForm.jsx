// import React, { useState, useEffect } from "react";

// function AddressForm({ initialData = {}, onSubmit, onCancel }) {
//   const [form, setForm] = useState({
//     address_details: initialData.address_details || "",
//     city: initialData.city || "",
//     state: initialData.state || "",
//     pin_code: initialData.pin_code || "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(form);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 border p-4 my-2">
//       <div>
//         <label>Address Details:</label>
//         <input type="text" name="address_details" value={form.address_details} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>City:</label>
//         <input type="text" name="city" value={form.city} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>State:</label>
//         <input type="text" name="state" value={form.state} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Pin Code:</label>
//         <input type="text" name="pin_code" value={form.pin_code} onChange={handleChange} required />
//       </div>
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2">Save</button>
//       {onCancel && <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 ml-2">Cancel</button>}
//     </form>
//   );
// }

// export default AddressForm;






import React, { useState } from "react";
import "./styles/AddressForm.css"; // Import the CSS file

function AddressForm({ initialData = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    address_details: initialData.address_details || "",
    city: initialData.city || "",
    state: initialData.state || "",
    pin_code: initialData.pin_code || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="address-form">
      <div className="form-group">
        <label>Address Details:</label>
        <input type="text" name="address_details" value={form.address_details} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>City:</label>
        <input type="text" name="city" value={form.city} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>State:</label>
        <input type="text" name="state" value={form.state} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Pin Code:</label>
        <input type="text" name="pin_code" value={form.pin_code} onChange={handleChange} required />
      </div>
      <div className="form-buttons">
        <button type="submit" className="btn-save">Save</button>
        {onCancel && <button type="button" onClick={onCancel} className="btn-cancel">Cancel</button>}
      </div>
    </form>
  );
}

export default AddressForm;
