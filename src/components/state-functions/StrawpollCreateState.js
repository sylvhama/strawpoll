export function addChoice(state, newChoice) {
  let choices = [...state.choices];
  choices.push(newChoice);
  return choices;
}

export function updateChoice(state, newValue, index) {
  let choices = [...state.choices];
  choices[index].value = newValue;
  return choices;
}

export function removeChoice(state, index) {
  let choices = [...state.choices];
  choices.splice(index, 1);
  return choices;
}
