/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

import "./LoginPage.css";

export const LoginPage = () => {
	const [loginMode, setLoginMode] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSwitchMode = () => {
		setLoginMode(!loginMode);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			if (loginMode) {
				// login logic
			} else {
				// sign up logic
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
							type="password"
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
						{loginMode ? "Create an account" : "Log in to existing account"}
					</a>
				</div>
			</div>
		</>
	);
};
