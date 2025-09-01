// Validation for customer fields
export const validateCustomer = (customer) => {
  const errors = {};
  if (!customer.first_name) errors.first_name = "First name is required";
  if (!customer.last_name) errors.last_name = "Last name is required";
  if (!customer.phone_number) errors.phone_number = "Phone number is required";
  else if (!/^\d{10}$/.test(customer.phone_number)) errors.phone_number = "Phone number must be 10 digits";
  return errors;
};

// Validation for address fields
export const validateAddress = (address) => {
  const errors = {};
  if (!address.address_details) errors.address_details = "Address is required";
  if (!address.city) errors.city = "City is required";
  if (!address.state) errors.state = "State is required";
  if (!address.pin_code) errors.pin_code = "Pin code is required";
  else if (!/^\d{5,6}$/.test(address.pin_code)) errors.pin_code = "Pin code must be 5 or 6 digits";
  return errors;
};
