import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

class CopyLink extends React.Component {
  constructor() {
    super();
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.copyUrl = this.copyUrl.bind(this);
  }

  state = {
    open: false,
  };

  handleTouchTap() {
    this.setState({
      open: true,
    });
  };

  handleRequestClose() {
    this.setState({
      open: false,
    });
  };

  copyUrl() {
    const input = document.querySelector('.vote-url input');
    input.select();
    const copied = document.execCommand('copy');
    if(copied) this.handleTouchTap();
  }

  render() {
    return(
      <article>
        <Card>
          <CardHeader
            title="Share this Straw Poll link"
          />
          <CardText>
            <TextField className="vote-url"
                       value={`${window.location.origin}/vote/${this.props.id}`} 
                       hintText="URL" 
                       fullWidth={true}
            />
          </CardText>
          <CardActions>
            <FlatButton label="Copy Link to clipboard"
                        onClick={this.copyUrl} />
          </CardActions>
        </Card>
        <Snackbar
          open={this.state.open}
          message="The link has been copied"
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />
      </article>
    );
  }
}

CopyLink.propTypes = {
  id: React.PropTypes.string.isRequired
};

export default CopyLink;