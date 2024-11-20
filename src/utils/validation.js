// Function to validate email format
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Function to validate password strength
  export const validatePassword = (password) => {
    // Password should be at least 6 characters long
    return password.length >= 6;
  };
  
  // Function to validate if a field is not empty
  export const validateNotEmpty = (field) => {
    return field.trim() !== '';
  };
  