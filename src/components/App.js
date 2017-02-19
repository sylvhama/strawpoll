import React from 'react';
import AppBar from 'material-ui/AppBar';
import StrawpollCreator from './StrawpollCreator'

class App extends React.Component {
	render() {
		return (
			<main>
			  <AppBar
			    title="Straw Poll"
			    showMenuIconButton={false}
			  />
				<StrawpollCreator />
			</main>
		)
	}
}

export default App;
