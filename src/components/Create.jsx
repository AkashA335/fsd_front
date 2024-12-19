import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const Create = () => {
  const [values, setValues] = useState({
    name: "",
    employeeID: "",
    email: "",
    phoneNumber: "",
    department: "",
    dateOfJoining: "",
    role: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!values.name.trim()) errors.name = "Name is required";
    if (!values.employeeID.trim())
      errors.employeeID = "Employee ID is required";
    if (!values.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(values.email))
      errors.email = "Email is not valid";
    if (!values.phoneNumber.trim())
      errors.phoneNumber = "Phone number is required";
    else if (!/^\d{10}$/.test(values.phoneNumber))
      errors.phoneNumber = "Phone number must be 10 digits";
    if (!values.department.trim()) errors.department = "Department is required";
    if (!values.dateOfJoining.trim())
      errors.dateOfJoining = "Date of joining is required";
    if (!values.role.trim()) errors.role = "Role is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => toast.error(error));
      return;
    }

    axios
      .post(`${BACKEND_URL}/register`, values)
      .then((res) => toast.success("Registration Successful!"))
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          const { message } = err.response.data;
          if (message === "Email already exists") {
            toast.error("Email already exists. Please use a different email.");
          } else if (message === "Employee ID already exists") {
            toast.error(
              "Employee ID already exists. Please use a different ID."
            );
          }
        } else {
          toast.error("Error during registration. Please try again.");
        }
      });
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center transform scale-104">
      <h2 className="text-3xl font-bold mb-5">Add User Details</h2>
      <form className="space-y-5 font-semibold" onSubmit={handleSubmit}>
        <div className="flex items-center gap-4">
          <label htmlFor="name" className="w-32 font-bold text-l text-left">
            Name:
          </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="flex-grow border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="employeeID" className="w-32 font-bold text-l text-left">
            Employee ID:
          </label>
          <input
            type="text"
            name="employeeID"
            onChange={handleChange}
            className="flex-grow border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="email" className="w-32 font-bold text-l text-left">
            Email:
          </label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="flex-grow border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="phoneNumber" className="w-32 font-bold text-l text-left">
            Phone Number:
          </label>
          <input
            type="tel"
            name="phoneNumber"
            onChange={handleChange}
            className="flex-grow border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="department" className="w-32 font-bold text-l text-left">
            Department:
          </label>
          <input
            type="text"
            name="department"
            onChange={handleChange}
            className="flex-grow border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="dateOfJoining" className="w-32 font-bold text-l text-left">
            Date of Joining:
          </label>
          <input
            type="date"
            name="dateOfJoining"
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
            className="flex-grow border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="role" className="w-32 font-bold text-l text-left">
            Role:
          </label>
          <input
            type="text"
            name="role"
            onChange={handleChange}
            className="flex-grow border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            type="reset"
          >
            Clear
          </button>
        </div>
      </form>
      <Link to="/read">
        <button className="text-l flex gap-4 justify-center mt-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
          Show Details
        </button>
      </Link>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Create;
