import React from 'react';
import base from '../base';

import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';

class StrawpollVote extends React.Component {

  constructor() {
    super();
    this.updateUserChoice = this.updateUserChoice.bind(this);
    this.isFormSubmitable = this.isFormSubmitable.bind(this);
    this.submit = this.submit.bind(this);
  }

  state = {
    wait: true,
    previousVotes: [],
    id: null,
    question: '',
    choices: [],
    userChoice: -1
  }

  componentWillMount() {
    const id = this.props.match.params.id;
    let previousVotes = JSON.parse(localStorage.getItem('previousVotes'));
    if(!Array.isArray(previousVotes)) previousVotes = [];
    else if(previousVotes.indexOf(id)>-1) {
      const path = `/show/${id}`;
      return this.context.router.push(path);
    } 
    base.fetch(`${id}`, {
      context: this
    }).then(data => {
      if(Object.keys(data).length) {
        const wait = false,
              question = data.question,
              choices = [...data.choices];
        this.setState({wait, previousVotes, id, question, choices});
      }else {
        this.context.router.push('/');
      }
    }).catch(err => {
      console.error(err);
    });
  }

  updateUserChoice(value) {
    this.setState({userChoice: value});
  }

  submit(e) {
    e.preventDefault();
    this.setState({wait: true});
    const id = this.state.id,
          choices = this.state.choices;
    choices[this.state.userChoice].votes++;
    base.update(`${id}`, {
      data: {choices}
    }).then(() => {
      const previousVotes = [...this.state.previousVotes],
            path = `/show/${id}`;
      previousVotes.push(id);
      localStorage.setItem('previousVotes', JSON.stringify(previousVotes));
      this.context.router.push(path);
    }).catch(err => {
      console.error(err);
    });
  }

  isFormSubmitable() {
    const wait = this.state.wait;
    if(wait) return false;
    const userChoice = this.state.userChoice;
    if(userChoice >= 0) return true;
    return false;
  }

  render() {
    const {question, choices} = this.state;
    const styles = {
      vote: {
        marginTop: '2rem',
      },
      radioButton: {
        marginBottom: '1rem',
      },
    };
    return(
    	<Paper zDepth={1} className="paper">
    	  <h2>{`${question}`}</h2>
        <form onSubmit={(e) => this.submit(e)}>
          <RadioButtonGroup name="userChoice"
                            onChange={(e, value) => this.updateUserChoice(value)}>
            {choices.map((choice, i) => <RadioButton
                                          key={i}
                                          value={i}
                                          label={choice.value}
                                          style={styles.radioButton}
                                        /> )}
          </RadioButtonGroup>
          <RaisedButton label="Confirm Vote" 
                        type="submit"
                        style={styles.vote}
                        primary={true}
                        fullWidth={true}
                        disabled={!this.isFormSubmitable()}
          />
        </form>
    	</Paper>
    );
  }
}

StrawpollVote.contextTypes = {
  router: React.PropTypes.object
};

export default StrawpollVote;
