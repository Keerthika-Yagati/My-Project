import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email");
            return;
        }

        // Mock login - in real app, would authenticate with backend
        localStorage.setItem(
            "user",
            JSON.stringify({
                email,
                name: email.split("@")[0],
            })
        );

        alert("Signed in successfully!");
        navigate("/");
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
                        <i className="fas fa-lock text-white text-2xl"></i>
                    </div>
                    <h2>Welcome Back</h2>
                    <p className="auth-subtitle">Sign in to access your account</p>
                </div>

                {error && <div className="error-message"><i className="fas fa-exclamation-circle mr-2"></i>{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
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
                    </div>

                    <button type="submit" className="auth-btn">
                        <i className="fas fa-sign-in-alt mr-2"></i>Sign In
                    </button>
                </form>

                <p className="auth-footer">
                    Don't have an account? <Link to="/signup">Create one now</Link>
                </p>
            </div>
        </div>
    );
}

export default SignIn;
