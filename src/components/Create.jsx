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
    <div className="flex flex-col min-h-screen justify-center items-center">
      <h2 className="text-4xl font-bold mb-4 ">Add User Details</h2>
      <form className="  space-y-5 font-semibold" onSubmit={handleSubmit}>
        <div className="font-bold space-y-4 text-xl">
          <div className="space-x-2">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" onChange={handleChange} />
          </div>
          <div className="space-x-2">
            <label htmlFor="employeeID">Employee ID:</label>
            <input type="text" name="employeeID" onChange={handleChange} />
          </div>
          <div className="space-x-2">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" onChange={handleChange} />
          </div >
          <div className="space-x-2">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="tel" name="phoneNumber" onChange={handleChange} />
          </div>
          <div className="space-x-2">
            <label htmlFor="department">Department:</label>
            <input type="text" name="department" onChange={handleChange} />
          </div>
          <div className="space-x-2">
            <label htmlFor="dateOfJoining">Date of Joining:</label>
            <input
              type="date"
              name="dateOfJoining"
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="space-x-2">
            <label htmlFor="role">Role:</label>
            <input type="text" name="role" onChange={handleChange} />
          </div>
          <div className="flex gap-4 justify-center mt-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Submit
            </button>
            <div>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                type="reset"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </form>
      <Link to="/read">
        <button className="flex gap-4 justify-center mt-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ">
          Show Details
        </button>
      </Link>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Create;
