import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Choice from '../src/components/shared/Choice';
import renderer from 'react-test-renderer';
import React from 'react';

test('Choice component renders the choice correctly', () => {
  const rendered = renderer.create(
    <MuiThemeProvider>
      <Choice value={'test'}
              index={0}
              wait={false}
              choices={[]}
              updateChoice={()=>null}
              removeChoice={()=>null} />
    </MuiThemeProvider>
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});