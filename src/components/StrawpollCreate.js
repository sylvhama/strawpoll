import React from 'react';
import base from '../base';
import Choice from './Choice';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class StrawpollCreate extends React.Component {

  constructor() {
    super();
    this.addChoice = this.addChoice.bind(this);
    this.updateChoice = this.updateChoice.bind(this);
    this.removeChoice = this.removeChoice.bind(this);
    this.submit = this.submit.bind(this);
    this.isFormSubmitable = this.isFormSubmitable.bind(this);
  }

  state = {
    id: Date.now(),
    wait: false,
    question: '',
    choices: [{value:'', votes:0}, {value:'', votes:0}]
  };

  updateQuestion(newValue) {
    let question = this.state.question;
    question = newValue;
    this.setState({question});
  }

  addChoice() {
    let choices = [...this.state.choices];
    choices.push({value:'', votes:0});
    this.setState({choices});
  }

  updateChoice(newValue, index) {
    let choices = [...this.state.choices];
    choices[index].value = newValue;
    this.setState({choices});
  }

  removeChoice(index) {
    let choices = [...this.state.choices];
    choices.splice(index, 1);
    this.setState({choices});
  }

  submit(e) {
    e.preventDefault();
    this.setState({wait: true});
    const id = this.state.id,
          question = this.state.question,
          choices = [...this.state.choices];
    base.isUserSignedIn()
        .then((isSigned) => {
          if(isSigned) return Promise.resolve(true);
          return base.signInAnonymously();
        })
        .then(() => base.post(id, {question, choices}))
        .then(() => {
          const path = `/show/${id}`;
          return this.context.router.push(path);
        })
        .catch(err => console.error(err));
  }

  isFormSubmitable() {
    const wait = this.state.wait;
    if(wait) return false;
    const question = this.state.question,
          choices = [...this.state.choices],
          emptyChoices = choices.filter((choice) => choice.value.length===0);
    if(emptyChoices.length===0 && question.length) return true;
    return false;
  }

  render() {
    const wait = this.state.wait,
          question = this.state.question,
          choices = [...this.state.choices];
    return (
    	<Paper zDepth={1} className="paper">
    	  <h2>Create your Straw Poll</h2>
        <form onSubmit={(e) => this.submit(e)}>
          <TextField value={question} 
                     onChange={(e, newValue) => this.updateQuestion(newValue)}
                     hintText="Your question" 
                     fullWidth={true}
                     disabled={wait}
          />
          <br />
          {choices.map((choice, i) => <Choice key={i}
                                              value={choice.value}
                                              index={i} 
                                              wait={wait}
                                              choices={choices}
                                              updateChoice={(newValue, index) => this.updateChoice(newValue, index)}
                                              removeChoice={(index) => this.removeChoice(index)}
                                      /> )}
          <br />
          <RaisedButton
            label="Add choice"
            icon={<ContentAdd />}
            onClick={this.addChoice}
            disabled={wait}
          />
          <RaisedButton label="Publish Straw Poll" 
                        type="submit"
                        style={{marginTop: '2rem'}}
                        primary={true}
                        fullWidth={true}
                        disabled={!this.isFormSubmitable()}
          />
        </form>
    	</Paper>
    )
  }
}

StrawpollCreate.contextTypes = {
  router: React.PropTypes.object
};

export default StrawpollCreate;
