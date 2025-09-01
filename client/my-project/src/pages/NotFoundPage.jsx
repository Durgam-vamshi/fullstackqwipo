// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Layout from "../layouts/Layout";
// import { getCustomerById } from "../apis/customerApi";
// import { useAddresses } from "../hooks/useAddresses";
// import AddressList from "../components/AddressList";
// import AddressForm from "../components/AddressForm";
// import "../pages/styles/NotFound.css"; 

// function CustomerDetailPage() {
//   const { id } = useParams();
//   const [customer, setCustomer] = useState(null);
//   const { addresses, addAddress, editAddress, removeAddress } = useAddresses(id);
//   const [editingAddress, setEditingAddress] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     getCustomerById(id).then((data) => setCustomer(data));
//   }, [id]);

//   const handleAddressSubmit = async (form) => {
//     if (editingAddress) {
//       await editAddress(editingAddress.id, form);
//       setEditingAddress(null);
//     } else {
//       await addAddress(form);
//     }
//     setShowForm(false);
//   };

//   const handleEditAddress = (address) => {
//     setEditingAddress(address);
//     setShowForm(true);
//   };

//   return (
//     <Layout>
//       {!customer ? (
//         <p className="loading-text">Loading customer details...</p>
//       ) : (
//         <div className="customer-detail-page">
//           {/* Customer Info Card */}
//           <div className="customer-card">
//             <div>
//               <h2 className="customer-name">{customer.first_name} {customer.last_name}</h2>
//               <p className="customer-phone"><strong>Phone:</strong> {customer.phone_number}</p>
//             </div>
//             <div>
//               <button
//                 onClick={() => { setShowForm(true); setEditingAddress(null); }}
//                 className="btn-add-address"
//               >
//                 + Add Address
//               </button>
//             </div>
//           </div>

//           {/* Address Form */}
//           {showForm && (
//             <div className="address-form-container">
//               <AddressForm
//                 initialData={editingAddress || {}}
//                 onSubmit={handleAddressSubmit}
//                 onCancel={() => setShowForm(false)}
//               />
//             </div>
//           )}

//           {/* Address List */}
//           <div className="address-grid">
//             {addresses.length > 0 ? addresses.map((addr) => (
//               <div key={addr.id} className="address-card">
//                 <p className="address-street">{addr.street}</p>
//                 <p className="address-city">{addr.city}, {addr.state}</p>
//                 <p className="address-pin">{addr.country} - {addr.pin}</p>

//                 <div className="address-actions">
//                   <button
//                     onClick={() => handleEditAddress(addr)}
//                     className="btn-edit"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => removeAddress(addr.id)}
//                     className="btn-delete"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             )) : (
//               <p className="no-address">No addresses found. Add one above!</p>
//             )}
//           </div>
//         </div>
//       )}
//     </Layout>
//   );
// }

// export default CustomerDetailPage;

import React from "react"

const NotFoundPage = () =>{
  return(
    <div>
      <h1>Something is </h1>
    </div>
  )

}


export default NotFoundPage