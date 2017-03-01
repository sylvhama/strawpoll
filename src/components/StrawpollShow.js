import React from 'react';
import base from '../base';
import CopyLink from './shared/CopyLink';

import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';

let ready = false;

class StrawpollShow extends React.Component {

  state = {
    id: null,
    question: '',
    choices: [],
    highest: [],
    total: 0,
  }

  componentDidMount() {
    const id = this.props.match.params.id,
          callbackFct = (data) => {
            if(Object.keys(data).length) {
              const question = data.question,
                    choices = [...data.choices];
              let highest = [0],
                  total = choices[0].votes;
              for(let i = 1; i < choices.length; i++) { 
                let votes = choices[i].votes;
                if(choices[highest[0]].votes === votes) highest.push(i);
                else if(choices[highest[0]].votes < votes) highest = [i];
                total += votes;
              }
              ready = true;
              this.setState({id, question, choices, highest, total});
            }else {
              this.context.router.push('/');
            }
          };
    base.isUserSignedIn()
        .then(isSigned => {
          if(isSigned) return Promise.resolve(true);
          return base.signInAnonymously();
        })
        .then(() => base.listenTo(id, this, callbackFct))
        .catch(err => console.error(err));
  }

  render() {
    if(!ready) return (
      <Paper style={{textAlign: 'center'}} zDepth={1} className="paper"> 
        <CircularProgress />
      </Paper>
    );
    const {question, choices, highest, total} = this.state;
    const renderRect = (choice, i) => {
      if(total===0) return '';
      else return (
        <rect x="0"
              y="0"
              width={`${choice.votes/total*100}%`}
              height="24"
              fill={highest.indexOf(i)>-1?'#8BC34A':'#00bcd4'}>
          <animate attributeType="XML"
                   attributeName="width"
                   from="0"
                   to={`${choice.votes/total*100}%`}
                   dur="0.5s"
                   repeatCount="1"/>
        </rect>
      );
    };
    const renderText = (choice) => {
      if(total===0) return `${choice.votes} vote`;
      else if(choice.votes<=1) return `${choice.votes} vote (${Math.round(choice.votes/total*100)}%)`;
      else return `${choice.votes} votes (${Math.round(choice.votes/total*100)}%)`;
    };
    return (
      <Paper zDepth={1} className="paper">
        <h2>{`${question}`}</h2>
        <h4>{`Total votes: ${total}`}</h4>
        <article style={{marginBottom: '2rem'}}>
        {choices.map((choice, i) => {
          return(
            <figure key={i}>
              <figcaption>{choice.value}</figcaption>
              <svg width="100%" height="24">
                {renderRect(choice, i)}
                <text x="4"
                      y="17"
                      fontFamily="Roboto, sans-serif"
                      fontSize="16px"
                      fill="black">
                  {renderText(choice)}
                </text>
              </svg>
            </figure>
          )
        })}
        </article>
        <CopyLink id={this.state.id} />
      </Paper>
    );
  }
}

StrawpollShow.contextTypes = {
  router: React.PropTypes.object
};

export default StrawpollShow;
