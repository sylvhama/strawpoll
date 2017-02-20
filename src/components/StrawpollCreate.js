import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';

class StrawpollCreate extends React.Component {

  constructor() {
    super();
    this.renderChoice = this.renderChoice.bind(this);
    this.addChoice = this.addChoice.bind(this);
    this.updateChoice = this.updateChoice.bind(this);
    this.removeChoice = this.removeChoice.bind(this);
    this.isChoiceDeletable = this.isChoiceDeletable.bind(this);
    this.isFormSubmitable = this.isFormSubmitable.bind(this);
  }

  state = {
    wait: false,
    question: '',
    choices: ['', ''],
  }

  updateQuestion(newValue) {
    let question = this.state.question;
    question = newValue;
    this.setState({question});
  }

  addChoice() {
    let choices = [...this.state.choices];
    choices.push('');
    this.setState({choices});
  }

  updateChoice(newValue, index) {
    let choices = [...this.state.choices];
    choices[index] = newValue;
    this.setState({choices});
  }

  removeChoice(index) {
    let choices = [...this.state.choices];
    choices.splice(index, 1);
    this.setState({choices});
  }

  isChoiceDeletable() {
    const wait = this.state.wait;
    if(wait) return false;
    const choices = [...this.state.choices];
    if(choices.length > 2) return true;
    return false;
  }

  isFormSubmitable() {
    const wait = this.state.wait;
    if(wait) return false;
    const question = this.state.question,
          choices = [...this.state.choices];
    const index = choices.indexOf('');
    if(index === -1 && question.length) return true;
    return false;
  }

  renderChoice(choice, i) {
    const wait = this.state.wait,
          style = {
            container: {position:'relative', paddingRight:'48px'},
            icon: {position:'absolute', right:0},
          };
    return (
      <div key={i}>
        <div style={style.container}>
          <TextField value={choice}
                     onChange={(e, newValue) => this.updateChoice(newValue, i)}
                     hintText={`Choice ${i+1}`}
                     fullWidth={true}
                     underlineShow={false}
                     disabled={wait}
          />
          <IconButton style={style.icon} 
                      onClick={() => this.removeChoice(i)}
                      disabled={!this.isChoiceDeletable()}>
            <ContentClear />
          </IconButton>
        </div>
        <Divider />
      </div>
    );
  }


  render() {
    const wait = this.state.wait,
          question = this.state.question,
          choices = [...this.state.choices];
    return (
    	<Paper zDepth={1} className="paper">
    	  <h2>Create your Straw Poll</h2>
        <form>
          <TextField value={question} 
                     onChange={(e, newValue) => this.updateQuestion(newValue)}
                     hintText="Your question" 
                     fullWidth={true}
                     disabled={wait}
          />
          <br />
          {choices.map((choice, i) => this.renderChoice(choice, i) )}
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

export default StrawpollCreate;
