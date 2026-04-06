import logo from "../../assets/logo.png";
import image from "../../assets/beren-sutton-cleaver-ZOxnd4HmWXE-unsplash.jpg";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router";
import { login, signup } from "../../services/authService";
import type { UserData } from "../../types/userData";

export default function LandingPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    // capitalize the first letter of each word in the name input
    if (e.target.name === "name") setName(e.target.value);
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const normalizedName = name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    // handle login or register
    if (isLogin) {
      try {
        await login({ email, password } as UserData);
        setEmail("");
        setPassword("");
        navigate("/dashboard");
      } catch (error: unknown) {
        if (error instanceof Error) {
          const message = error.message;
          setError(message || "Something went wrong. Please try again.");
        } else {
          setError("Unexpected error. Please try again.");
        }
      }
    } else {
      try {
        await signup({ name: normalizedName, email, password } as UserData);
        setName("");
        setEmail("");
        setPassword("");
        setIsLogin(true);
      } catch (error: unknown) {
        if (error instanceof Error) {
          const message = error.message;
          setError(message || "Something went wrong. Please try again.");
        } else {
          setError("Unexpected error. Please try again.");
        }
      }
    }
  };

  const visitLogin = () => {
    setIsLogin(true);
    setError(null);
  };

  const visitRegister = () => {
    setIsLogin(false);
    setError(null);
  };

  return (
    <div className="auth-page-body">
      {/* Left side: Login form */}
      <div className="auth-left">
        <div className="auth-image-div">
          <img
            src={image}
            alt="Landing page image of a group of people walking on the beach at sunset"
            className="auth-image"
          />
        </div>
      </div>

      {/* Right side: Login form */}
      <div className="auth-right">
        <div className="auth-logo">
          <img src={logo} alt="Litlas logo" />
        </div>
        <div className="auth-form-div">
          <h1 className="auth-form-title">
            {isLogin ? "Welcome back" : "Create an account"}
          </h1>
          <h2 className="auth-form-subtitle">
            {isLogin
              ? "Sign in to keep planning your next adventure"
              : "Sign up to start planning your next adventure"}
          </h2>
          {error && (
            <div role="alert" className="alert-message">
              {error}
            </div>
          )}
          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="name" className="input-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="input-box"
                  value={name}
                  onChange={handleChange}
                  required
                  pattern=".{3,}"
                  title="Name must contain at least 3 characters"
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="this@example.com"
                className="input-box"
                value={email}
                onChange={handleChange}
                required
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                title="Please enter a valid email address"
                autoComplete="email"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="••••••••"
                className="input-box"
                value={password}
                onChange={handleChange}
                required
                pattern={
                  isLogin ? undefined : "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                }
                title={
                  isLogin
                    ? undefined
                    : "Must contain at least 8 characters with uppercase, lowercase, and a number."
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="show-hide-btn"
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
            </div>
            <div>
              <button type="submit" className="auth-btn">
                {isLogin ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </form>
          <div className="switch-page-div">
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                <button onClick={visitRegister} className="switch-page-btn">
                  Sign up here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button onClick={visitLogin} className="switch-page-btn">
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
