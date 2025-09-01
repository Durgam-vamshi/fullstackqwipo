// import React from "react";

// function AddressList({ addresses, onEdit, onDelete }) {
//   return (
//     <table className="min-w-full border mt-4">
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Address</th>
//           <th>City</th>
//           <th>State</th>
//           <th>Pin Code</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {addresses.map((addr) => (
//           <tr key={addr.id} className="border-t">
//             <td>{addr.id}</td>
//             <td>{addr.address_details}</td>
//             <td>{addr.city}</td>
//             <td>{addr.state}</td>
//             <td>{addr.pin_code}</td>
//             <td className="space-x-2">
//               <button onClick={() => onEdit(addr)} className="text-green-500">Edit</button>
//               <button onClick={() => onDelete(addr.id)} className="text-red-500">Delete</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export default AddressList;

















import React from "react";
import "./styles/AddressList.css"; // Import the CSS file

function AddressList({ addresses, onEdit, onDelete }) {
  return (
    <div className="address-list-container">
      <table className="address-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Pin Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((addr) => (
            <tr key={addr.id}>
              <td>{addr.id}</td>
              <td>{addr.address_details}</td>
              <td>{addr.city}</td>
              <td>{addr.state}</td>
              <td>{addr.pin_code}</td>
              <td className="action-buttons">
                <button onClick={() => onEdit(addr)} className="btn-edit">Edit</button>
                <button onClick={() => onDelete(addr.id)} className="btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AddressList;
