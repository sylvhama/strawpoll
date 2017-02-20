import React from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';

const NotFound = () => (
	<Paper zDepth={1} className="paper">
	  <h2>404 - Page not found!</h2>
	  <p><Link to="/">Head back to home</Link></p>
	</Paper>
);

export default NotFound;
