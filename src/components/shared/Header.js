import React from 'react';
import AppBar from 'material-ui/AppBar';

class Header extends React.Component {
  constructor() {
    super();
    this.onTitleTouch = this.onTitleTouch.bind(this);
  }

  onTitleTouch() {
    this.context.router.push('/');
  }

  render() {
    return (
      <AppBar
        title="Straw Poll"
        showMenuIconButton={false}
        onTitleTouchTap={this.onTitleTouch}
        style={{cursor: 'pointer'}}
      />
    )
  }
}

Header.contextTypes = {
  router: React.PropTypes.object
};

export default Header;
