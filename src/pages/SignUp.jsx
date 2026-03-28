import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // Mock signup - in real app, would register with backend
        localStorage.setItem(
            "user",
            JSON.stringify({
                name,
                email,
            })
        );

        alert("Account created successfully! You can now sign in.");
        navigate("/signin");
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent to-primary mb-4">
                        <i className="fas fa-user-plus text-white text-2xl"></i>
                    </div>
                    <h2>Join Us</h2>
                    <p className="auth-subtitle">Create an account to start shopping</p>
                </div>

                {error && <div className="error-message"><i className="fas fa-exclamation-circle mr-2"></i>{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name"><i className="fas fa-user text-primary mr-2"></i>Full Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email"><i className="fas fa-envelope text-primary mr-2"></i>Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password"><i className="fas fa-key text-primary mr-2"></i>Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword"><i className="fas fa-lock text-primary mr-2"></i>Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="auth-btn">
                        <i className="fas fa-user-check mr-2"></i>Create Account
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/signin">Sign In here</Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
