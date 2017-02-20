import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import StrawpollCreate from './StrawpollCreate';
import StrawpollShow from './StrawpollShow';
import StrawpollVote from './StrawpollVote';
import NotFound from './NotFound';

class App extends React.Component {

	render() {
		return (
		  <Router>
		  	<main>
				  <AppBar
				    title="Straw Poll"
				    showMenuIconButton={false}
				  />
				  <Switch>
						<Route path="/" exact component={StrawpollCreate} />
						<Route path="/vote/:strawpollId" component={StrawpollVote} />
						<Route path="/show/:strawpollId" component={StrawpollShow} />
			  		<Route component={NotFound} />
			  	</Switch>
		  	</main>
		  </Router>
		)
	}
}

export default App;
