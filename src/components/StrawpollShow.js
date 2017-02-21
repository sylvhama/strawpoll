import React from 'react';
import base from '../base';

import Paper from 'material-ui/Paper';

class StrawpollShow extends React.Component {

  state = {
    question: '',
    choices: [],
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    base.listenTo(`${id}`, {
      context: this,
      then(data) {
        if(Object.keys(data).length) {
          const question = data.question,
                choices = [...data.choices];
          this.setState({question, choices});
        }else {
          this.context.router.push('/');
        }
      }
    });
  }

  render() {
    const {question, choices} = this.state;
    return (
      <Paper zDepth={1} className="paper">
        <h2>{`${question}`}</h2>
      </Paper>
    );
  }
}

StrawpollShow.contextTypes = {
  router: React.PropTypes.object
};

export default StrawpollShow;
