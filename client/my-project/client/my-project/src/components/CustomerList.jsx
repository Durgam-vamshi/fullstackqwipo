// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getCustomers } from "../apis/customerApi"; // make sure the path is correct

// function CustomerList({ customers = [], onDelete }) {
//   const safeCustomers = Array.isArray(customers) ? customers : [];

//   // Log customers received
//   console.log("Customers in CustomerList:", safeCustomers);

//   return (
//     <table className="min-w-full border">
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>First Name</th>
//           <th>Last Name</th>
//           <th>Phone</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {safeCustomers.length === 0 ? (
//           <tr>
//             <td colSpan="5" className="text-center py-4">
//               No customers found.
//             </td>
//           </tr>
//         ) : (
//           safeCustomers.map((customer) => (
//             <tr key={customer.id} className="border-t">
//               <td>{customer.id}</td>
//               <td>{customer.first_name}</td>
//               <td>{customer.last_name}</td>
//               <td>{customer.phone_number}</td>
//               <td className="space-x-2">
//                 <Link
//                   to={`/customers/${customer.id}`}
//                   className="text-blue-500"
//                 >
//                   View
//                 </Link>
//                 <Link
//                   to={`/customers/${customer.id}/edit`}
//                   className="text-green-500"
//                 >
//                   Edit
//                 </Link>
//                 <button
//                   onClick={() => onDelete(customer.id)}
//                   className="text-red-500"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))
//         )}
//       </tbody>
//     </table>
//   );
// }

// // Parent component to fetch data from backend
// export function CustomerListPage() {
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await getCustomers({ page: 1, limit: 10 });
//         console.log("Fetched customers from backend:", data);
//         setCustomers(data);
//       } catch (err) {
//         console.error("Error fetching customers:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   const handleDelete = (id) => {
//     console.log("Delete customer with id:", id);
//     // call delete API here if needed
//   };

//   if (loading) return <p>Loading...</p>;

//   return <CustomerList customers={customers} onDelete={handleDelete} />;
// }

// export default CustomerList;
















import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCustomers } from "../apis/customerApi"; // adjust path if needed
import "./styles/customerList.css"; // Import CSS file

function CustomerList({ customers = [], onDelete }) {
  const safeCustomers = Array.isArray(customers) ? customers : [];

  return (
    <div className="customer-list-container">
      <table className="customer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {safeCustomers.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">
                No customers found.
              </td>
            </tr>
          ) : (
            safeCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.first_name}</td>
                <td>{customer.last_name}</td>
                <td>{customer.phone_number}</td>
                <td className="action-buttons">
                  <Link to={`/customers/${customer.id}`} className="btn-view">View</Link>
                  <Link to={`/customers/${customer.id}/edit`} className="btn-edit">Edit</Link>
                  <button onClick={() => onDelete(customer.id)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// Parent component
export function CustomerListPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCustomers({ page: 1, limit: 10 });
        setCustomers(data);
      } catch (err) {
        console.error("Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleDelete = (id) => {
    console.log("Delete customer with id:", id);
  };

  if (loading) return <p>Loading...</p>;

  return <CustomerList customers={customers} onDelete={handleDelete} />;
}

export default CustomerList;











































