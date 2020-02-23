export const validateUsername = (username) => {
  if (username.length > 40) {
    return 'Username must be under 40 characters.';
  }

  if (username.length < 5) {
    return 'Username must be at least 5 characters.';
  }

  return ''; // If it's fine return an empty string (false)
};

export const validatePassword = (password) => {
  if (password.length > 40) {
    return 'Password must be under 40 characters.';
  }

  if (password.length < 5) {
    return 'Password must be at least 5 characters.';
  }

  return ''; // If it's fine return an empty string (false)
};

export const passwordMismatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }

  return ''; // If it's fine return an empty string (false)
};
