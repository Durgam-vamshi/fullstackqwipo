// import React, { useState } from "react";

// function CustomerForm({ initialData = {}, onSubmit }) {
//   const [form, setForm] = useState({
//     first_name: initialData.first_name || "",
//     last_name: initialData.last_name || "",
//     phone_number: initialData.phone_number || "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(form);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label>First Name:</label>
//         <input type="text" name="first_name" value={form.first_name} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Last Name:</label>
//         <input type="text" name="last_name" value={form.last_name} onChange={handleChange} required />
//       </div>
//       <div>
//         <label>Phone Number:</label>
//         <input type="text" name="phone_number" value={form.phone_number} onChange={handleChange} required />
//       </div>
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2">Submit</button>
//     </form>
//   );
// }

// export default CustomerForm;
















import React, { useState } from "react";
import "./CustomerForm.css"; // Import the CSS file

function CustomerForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    first_name: initialData.first_name || "",
    last_name: initialData.last_name || "",
    phone_number: initialData.phone_number || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="customer-form">
      <div className="form-group">
        <label>First Name:</label>
        <input type="text" name="first_name" value={form.first_name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input type="text" name="last_name" value={form.last_name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Phone Number:</label>
        <input type="text" name="phone_number" value={form.phone_number} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn-submit">Submit</button>
    </form>
  );
}

export default CustomerForm;
