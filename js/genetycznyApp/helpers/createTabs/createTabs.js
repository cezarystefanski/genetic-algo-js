function createTabs(suwaki, defaults) {
  const { wynikiNode } = defaults;
  const wyniki = document.getElementById(wynikiNode);

  const wynikiDivs = Array.from(wyniki.querySelectorAll('div[id^=wyniki]'));
  const wynikiLength = wynikiDivs.length;
  const tabContainer = document.createElement('div');
  tabContainer.classList.add('tab');
  wyniki.insertBefore(tabContainer, wyniki.firstChild);
  const tablinks = [];
  for (let i = 0; i < wynikiLength; i += 1) {
    const button = document.createElement('button');
    const wynikId = wynikiDivs[i].id;
    button.classList.add('tablinks');
    button.setAttribute('tab', wynikId);
    button.textContent = wynikId;
    tabContainer.appendChild(button);
    tablinks.push(button);
  }
  tablinks.forEach(link => link.addEventListener('click', (e) => {
    openTab(e, tablinks, wynikiDivs);
  }));
}

function openTab(evt, tablinks, wynikiDivs) {
    wynikiDivs.forEach(div => div.style.display = "none");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    const name = evt.target.getAttribute('tab');
    document.getElementById(name).style.display = "block";
    evt.target.className += " active";
}

export default createTabs;
