function createCheckbox(name, label, node) {
  const wrapper = document.createElement('div');
  const box = document.createElement('input');
  const boxLabel = document.createElement('label');

  box.setAttribute('type', 'checkbox');
  box.setAttribute('name', name);
  box.id = name;
  boxLabel.textContent = label;
  boxLabel.setAttribute('for', name);
  wrapper.appendChild(box);
  wrapper.appendChild(boxLabel);
  node.appendChild(wrapper);

  return box;
}

export default createCheckbox;
