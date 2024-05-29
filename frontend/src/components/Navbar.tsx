import "./Navbar.css";

export const Navbar = () => {
	return (
		<>
			<nav>
				<h1 id="title-text">AppTrack</h1>

				<ul id="nav-elements-list">
					<li className="nav-element">
						<a>applications</a>
					</li>
					<li className="nav-element">
						<a>overview</a>
					</li>
				</ul>

				<div id="signout-container">
					<a>signout</a>
				</div>
			</nav>
		</>
	);
};
