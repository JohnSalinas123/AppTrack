/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

export const LoginPage = () => {
	const [loginMode, setLoginMode] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const handleSwitchMode = () => {
		setLoginMode(!loginMode);
		setErrorMessage("");
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			if (loginMode) {
				// login logic
				const response = await axios.post("/api/users/login", {
					email,
					password,
				});
				console.log(response);

				console.log(response.status === 200);

				if (response.status === 200) {
					navigate("/dashboard", { replace: true });
				} else {
					setErrorMessage("Email or password incorrect.");
				}
			} else {
				// sign up logic

				if (password != confirmPassword) {
					setErrorMessage("Passwords don't match.");
					return;
				}

				const response = await axios.post("/api/users/register", {
					email,
					password,
				});

				if (response.status === 201) {
					navigate("/dashboard", { replace: true });
				} else {
					setErrorMessage("Sign up failed");
				}
			}
		} catch (error) {
			console.log("Failed to login or signup", error);
		}
	};

	return (
		<>
			<div id="login-page">
				<span id="login-title">AppTrack</span>

				<div id="auth-container">
					<form id="login-form" onSubmit={handleSubmit}>
						<span id="auth-title">{loginMode ? "Login" : "Sign Up"}</span>
						<label className="login-label" htmlFor="email">
							Email:
						</label>
						<input
							className="login-field"
							type="email"
							id="email"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<label className="login-label" htmlFor="password">
							Password:
						</label>
						<input
							className="login-field"
							type="text"
							id="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						{!loginMode && (
							<>
								<label className="login-label" htmlFor="confirmPassword">
									Confirm Password
								</label>
								<input
									className="login-field"
									type="password"
									id="confirmPassword"
									name="confirmPassword"
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
								/>
							</>
						)}
						<button id="login-submit-button" type="submit">
							{loginMode ? "Login" : "Sign Up"}
						</button>
					</form>
					<a id="login-switch" onClick={handleSwitchMode}>
						{loginMode ? "Create an account" : "Already have an account?"}
					</a>
				</div>
				<span id="login-error">{errorMessage}</span>
			</div>
		</>
	);
};
