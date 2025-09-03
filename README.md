Customer & Multiple Addresses CRUD Application

This project demonstrates end-to-end CRUD operations for managing customers and their multiple addresses using:

Frontend: React.js with React Router

Backend: Node.js with Express.js

Database: SQLite

The application is designed to work in both mobile and web environments, covering validation, error handling, navigation, and responsive UI.

🚀 Features
🔹 Mobile CRUD Operations

Create Customer: Form validation for first name, last name, phone, and address details.

Read Customer: Navigate by ID and display full customer profile.

Update Customer: Modify selected fields and show confirmation messages.

Delete Customer: Search by ID, confirm deletion, and remove permanently.

Multiple Addresses Management:

View all addresses linked to a customer.

Add, update, or delete addresses.

Mark customers with “Only One Address”.

Search & Filters: Filter customers by city, state, or pincode with clear filters.

Pagination & Sorting: Navigate through customer lists efficiently.

🔹 Web CRUD Operations

Customer Dashboard: Create, view, update, and delete customer records.

Order/Payment/Shipping Info: Display customer’s related data (mock implementation).

Address Management: Filter, sort, and manage multiple addresses.

Search Functionality: Full-text search on name, address, email, or phone.

Responsive Design: Mobile-first, with adaptive UI across devices.

Error Handling & Logging: Capture and log errors at every CRUD step.

🛠 Tech Stack

Frontend:

React.js

React Router

Tailwind CSS / CSS Media Queries (for responsiveness)

Backend:

Node.js

Express.js

Database:

SQLite (lightweight relational DB for demo purposes)

📂 Project Structure
├── client/                  # React Frontend  
│   ├── src/  
│   │   ├── components/      # Reusable UI components  
│   │   ├── pages/           # CRUD pages (Create, Read, Update, Delete)  
│   │   ├── routes/          # React Router setup  
│   │   ├── services/        # API calls  
│   │   └── App.js  
│   └── package.json  

├── server/                  # Node.js Backend  
│   ├── config/              # DB connection (SQLite)  
│   ├── controllers/         # Business logic for CRUD  
│   ├── models/              # SQLite models  
│   ├── routes/              # Express routes  
│   ├── middleware/          # Error handling, validation  
│   ├── app.js  
│   └── package.json  

└── README.md  

⚙️ Setup Instructions
1. Clone Repository
git clone https://github.com/your-username/customer-crud-app.git
cd customer-crud-app

2. Install Dependencies
Backend
cd server
npm install

Frontend
cd ../client
npm install

3. Run Application
Start Backend
cd server
npm start

Start Frontend
cd client
npm start


Frontend will run on http://localhost:3000

Backend will run on http://localhost:5000

🧪 Test Cases

✅ Create customer with validation

✅ Fetch customer profile by ID

✅ Update customer information

✅ Delete customer after confirmation

✅ Search by city/state/pincode

✅ Manage multiple addresses per customer

✅ Responsive design testing on mobile + web

✅ Error handling (DB, validation, network errors)
