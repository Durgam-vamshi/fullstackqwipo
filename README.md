# 📌 Customer & Multiple Addresses CRUD Application  

This project demonstrates **end-to-end CRUD operations** for managing customers and their multiple addresses.  
It uses a **full-stack approach** with:  

- ⚛️ **Frontend**: React.js + React Router  
- 🚀 **Backend**: Node.js + Express.js  
- 🗄 **Database**: SQLite  

The application supports **mobile** and **web environments**, featuring validation, error handling, navigation, and responsive UI.  

---

## ✨ Features  

### 📱 Mobile CRUD Operations  
- ➕ **Create Customer**: Validate inputs (first name, last name, phone, address, city, state, pincode).  
- 📖 **Read Customer**: Navigate by ID & display profile details.  
- ✏️ **Update Customer**: Modify details and show confirmation messages.  
- ❌ **Delete Customer**: Search by ID, confirm deletion, and remove permanently.  
- 🏠 **Multiple Addresses Management**:  
  - View all addresses linked to a customer.  
  - Add, update, delete addresses.  
  - Mark customers as “Only One Address”.  
- 🔍 **Search & Filters**: Filter by city, state, or pincode with clear filters.  
- 📑 **Pagination & Sorting**: Navigate customer lists efficiently.  

### 💻 Web CRUD Operations  
- 🏷 **Customer Dashboard**: Create, view, update, delete customers.  
- 📦 **Order/Payment/Shipping Info**: Display related data (mock implementation).  
- 🏠 **Address Management**: Filter, sort, and manage addresses.  
- 🔎 **Full-text Search**: Search by name, address, email, or phone.  
- 📱 **Responsive Design**: Mobile-first layout across devices.  
- ⚠️ **Error Handling & Logging**: Catch and log errors at every step.  

---

## 🛠 Tech Stack  

**Frontend**  
- React.js  
- React Router  
- Tailwind CSS / CSS Media Queries  

**Backend**  
- Node.js  
- Express.js  

**Database**  
- SQLite (lightweight relational DB)  

---

## 📂 Project Structure  

```

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

````

---

## ⚙️ Setup Instructions  

### 1️⃣ Clone Repository  
```bash
git clone https://github.com/Durgam-vamshi/fullstackqwipo.git
cd fullstackqwipo
````

### 2️⃣ Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd ../client
npm install
```

### 3️⃣ Run Application

#### Start Backend

```bash
cd server
npm start
```

#### Start Frontend

```bash
cd client
npm start
```

🌍 **Frontend** → [http://localhost:3000](http://localhost:3000)
⚡ **Backend** → [http://localhost:5000](http://localhost:5000)

---

## ✅ Test Cases

* [x] Create customer with validation
* [x] Fetch customer profile by ID
* [x] Update customer information
* [x] Delete customer after confirmation
* [x] Search by city/state/pincode
* [x] Manage multiple addresses per customer
* [x] Responsive design (mobile + web)
* [x] Error handling (DB, validation, network errors)

---

## 📌 Expectations

* 🧩 Clean **MVC architecture** in backend
* ♻️ Reusable React components in frontend
* ✅ Proper validation & error handling
* 📜 Clear Git commit history

---

👨‍💻 **Author**: [Durgam Vamshi](https://github.com/Durgam-vamshi)

```

