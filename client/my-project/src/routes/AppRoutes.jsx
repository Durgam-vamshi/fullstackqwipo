import React from "react";
import { Routes, Route } from "react-router-dom";
import CustomerListPage from "../pages/CustomerListPage";
import CustomerFormPage from "../pages/CustomerFormPage";
import CustomerDetailPage from "../pages/CustomerDetailPage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CustomerListPage />} />
      <Route path="/customers" element={<CustomerListPage />} />
      <Route path="/customers/new" element={<CustomerFormPage />} />
      <Route path="/customers/:id/edit" element={<CustomerFormPage />} />
      <Route path="/customers/:id" element={<CustomerDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
