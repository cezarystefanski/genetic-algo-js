function bootstrapButton(options) {
  const context = document.getElementById(options.rootNode);
  const button = document.createElement('button');
  button.textContent = 'RESET';
  context.appendChild(button);

  return button;
}

export default bootstrapButton;
