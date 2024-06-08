import { NavLink } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
	return (
		<>
			<nav>
				<h1 id="title-text">AppTrack</h1>

				<ul id="nav-elements-list">
					<NavLink className="nav-element" to="applications">
						applications
					</NavLink>
					<NavLink className="nav-element" to="visualization">
						visualization
					</NavLink>
				</ul>

				<div id="signout-container">
					<a>signout</a>
				</div>
			</nav>
		</>
	);
};
