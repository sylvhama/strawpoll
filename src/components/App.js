import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Header from './Header';
import StrawpollCreate from './StrawpollCreate';
import StrawpollShow from './StrawpollShow';
import StrawpollVote from './StrawpollVote';
import NotFound from './NotFound';

class App extends React.Component {
	render() {
		return (
		  <Router>
		  	<main>
				  <Header />
				  <Switch>
						<Route path="/" exact component={StrawpollCreate} />
						<Route path="/vote/:id" component={StrawpollVote} />
						<Route path="/show/:id" component={StrawpollShow} />
			  		<Route component={NotFound} />
			  	</Switch>
		  	</main>
		  </Router>
		)
	}
}

export default App;
