const createSlider = (defValue, min, max, step, parentNode, name) => {
  const container = document.createElement('div');
  const slider = document.createElement('input');
  const title = document.createElement('p');

  slider.setAttribute('type', 'range')
  slider.setAttribute('min', min)
  slider.setAttribute('max', max);
  slider.setAttribute('step', step);
  slider.value = defValue;
  slider.classList.add('slider');
  title.textContent = `${name} - ${defValue}`;
  container.appendChild(slider)
  container.appendChild(title);
  container.classList.add('slider-container');
  parentNode.appendChild(container);

  slider.addEventListener('change', () => {
    title.textContent = `${name} - ${slider.value}`;
  });

  return slider;
};

export default createSlider;