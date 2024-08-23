const correspondingBracketCloser = {
  '(': ')',
  '<': '>',
  '{': '}',
  '[': ']',
};

const bracketClosers = Object.values(correspondingBracketCloser);

function checkIsAllBracedBrackets(sentence) {
  const bracketStack = [];

  for (const curChar of sentence) {
    // If it is opening bracket, push to stack.
    if (correspondingBracketCloser[curChar]) {
      bracketStack.push(curChar);
      continue;
    }

    // If it is other characters, pass.
    if (!bracketClosers.includes(curChar)) {
      continue;
    }

    // If it is closing bracket but the stack is empty, return false.
    if (bracketStack.length === 0) {
      return false;
    }

    // If it is closing bracket but with wrong opener in top of stack, return false.
    // If all things passed, pop stack and go next.
    if (correspondingBracketCloser[bracketStack.pop()] !== curChar) {
      return false;
    }
  }

  if (bracketStack.length !== 0) {
    return false;
  }

  return true;
}

document.addEventListener('DOMContentLoaded', () => {
  // Add instruction
  document.querySelector(
    '#instruction'
  ).textContent = `Accepted brackets: ${Object.entries(
    correspondingBracketCloser
  )
    .map(([opener, closer]) => `${opener}${closer}`)
    .join(', ')}`;

  // Add check button click handler
  document.querySelector('#check').addEventListener('click', () => {
    const inputValue = document.querySelector('#sentence').value;
    if (checkIsAllBracedBrackets(inputValue)) {
      document.querySelector('#result').textContent =
        'This sentence has all-braced brackets!';
    } else {
      document.querySelector('#result').textContent =
        'This sentence does not have all-braced brackets...';
    }
  });
});
