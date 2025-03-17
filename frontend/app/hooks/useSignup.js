import { useState } from "react";
import { toast } from "react-toastify";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async ({
    fullName,
    username,
    email,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      email,
      password,
      confirmPassword,
      gender,
    });

    if (!success) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:4800/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          email,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 403 && data.error && Array.isArray(data.error)) {
          // If multiple validation errors exist, show each one separately
          data.error.forEach((err) => {
            if (err.message) {
              toast.error(err.message);
            }
          });
        } else {
          // Handle single error message
          toast.error(data.error || "Signup failed");
        }
        throw new Error("Signup failed");
      }

      toast.success("User signed up successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({
  fullName,
  username,
  email,
  password,
  confirmPassword,
  gender,
}) {
  if (
    !fullName ||
    !username ||
    !email ||
    !password ||
    !confirmPassword ||
    !gender
  ) {
    toast.error("Please fill all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }

  return true;
}
