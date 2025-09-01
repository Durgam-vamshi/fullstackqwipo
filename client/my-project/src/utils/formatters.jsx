// Format phone number: 1234567890 → 123-456-7890
export const formatPhoneNumber = (phone) => {
  if (!phone) return "";
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
};

// Format address
export const formatAddress = (address) => {
  return `${address.address_details}, ${address.city}, ${address.state} - ${address.pin_code}`;
};
