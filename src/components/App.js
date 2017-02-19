import React from 'react';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const App = () => (
  <AppBar
    title="Strawpoll"
    showMenuIconButton={false}
  />
);

export default App;
