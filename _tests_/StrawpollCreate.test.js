import {
  addChoice,
  updateChoice,
  removeChoice
} from '../src/components/state-functions/StrawpollCreateState';

test('addChoice add a new choice', () => {
  const startState = {
    choices: [{value:'', votes:0}, {value:'', votes:0}]
  };
  const finalState = {choices: addChoice(startState, {value:'', votes:0})};
  expect(finalState.choices.length).toEqual(3);
});


test('updateChoice updates the choice at a specific position with a given value', () => {
  const startState = {
    choices: [{value:'', votes:0}, {value:'', votes:0}]
  };
  const finalState = {choices: updateChoice(startState, 'new', 1)};
  expect(finalState.choices[1].value).toEqual('new');
});

test('removeChoice deletes the choice at a specific position', () => {
  const startState = {
    choices: [{value:'', votes:0}, {value:'', votes:0}, {value:'', votes:0}]
  };
  const finalState = {choices: removeChoice(startState, 1)};
  expect(finalState.choices.length).toEqual(2);
});
