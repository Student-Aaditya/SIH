import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bgImage from "../assets/Bg-Image.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "admin",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("https://sih-1-ttr9.onrender.com/user/login", {
        email: data.email,
        password: data.password,
        role:data.role
      });
        const { role } = res.data.user;

    if (role.toLowerCase() !== data.role.toLowerCase()) {
      alert("Role mismatch! Please select the correct role.");
      return;
    }
      console.log(res.data);

      if (data.role === "admin") {
        navigate("/admin/Students");
      } else if (data.role === "student") {
        navigate("/student/My_Profile");
      } else if (data.role === "alumini") {
        navigate("/alumni/Professional_Details");
      }
    } catch (err) {
      console.log(err.response?.data || err);
      alert(err.response?.data?.msg || "Invalid login credentials");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light"
     style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}>
          <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: "blur(8px) brightness(0.6)", 
          zIndex: 1,
        }}
      />

      <div className="card shadow-lg p-4" style={{ width: "400px" ,
        borderRadius: "12px",
          background: "rgba(255, 255, 255, 0.9)", 
          zIndex: 2,
      }}>
        <h3 className="text-center fw-bold mb-4 
        text-primary">UniAlum Login</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.co\.in$/,
                  message: "Email must be in format: user@xyz.co.in",
                },
              })}
            />
            {errors.email && (
              <div className="text-danger small">{errors.email.message}</div>
            )}
          </div>

          {/* Password with eye icon */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                {...register("password", { required: "Password is required" })}
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <div className="text-danger small">{errors.password.message}</div>
            )}
          </div>

          {/* Role */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Login as</label>
            <select
              className="form-select"
              {...register("role", { required: "Role is required" })}
            >
              <option value="admin">Admin</option>
              <option value="student">Student</option>
              <option value="alumini">Alumini</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
