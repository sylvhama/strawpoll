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
  }

  state = {
    question: '',
    choices: ['', ''],
  }

  renderChoice(choice, i) {
    const style = {
      container: {position:'relative', paddingRight:'48px'},
      icon: {position:'absolute', right:0},
    }
    return (
      <div key={i}>
        <div style={style.container}>
          <TextField value={choice}
                     onChange={(e, newValue) => this.updateChoice(newValue, i)}
                     hintText={`Choice ${i+1}`}
                     fullWidth={true}
                     underlineShow={false}
          />
          <IconButton style={style.icon} 
                      onClick={() => this.removeChoice(i)}>
            <ContentClear />
          </IconButton>
        </div>
        <Divider />
      </div>
    );
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

  render() {
    const question = this.state.question,
          choices = [...this.state.choices];
    return (
    	<Paper zDepth={1} className="paper">
    	  <h2>Create your Straw Poll</h2>
        <form>
          <TextField value={question} 
                     onChange={(e, newValue) => this.updateQuestion(newValue)}
                     hintText="Your question" 
                     fullWidth={true}
          />
          <br />
          {choices.map((choice, i) => this.renderChoice(choice, i) )}
          <br />
          <RaisedButton
            label="Add choice"
            icon={<ContentAdd />}
            onClick={this.addChoice}
          />
        </form>
    	</Paper>
    )
  }
}

export default StrawpollCreate;
