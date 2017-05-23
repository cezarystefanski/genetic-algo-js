function mutacje (populacja, dane) {
  const { suwakPuli: pula, suwakMutacji: pm, suwakGenow: liczbaGenow } = dane;
  const losowe = [];
  for (let i = 0; i < pula; i += 1) {
    losowe[i] = (Math.random() * 10000 % 100) / 100;
  }
  const kopiaPopulacji = JSON.parse(JSON.stringify(populacja));
  let miejsceMutacji;
  for (let i = 0; i < pula; i += 1) {
    if(losowe[i] < pm) {
      miejsceMutacji = Math.round(Math.random() * 10000 % liczbaGenow);
      if (kopiaPopulacji[i][miejsceMutacji] === 0) {
        kopiaPopulacji[i][miejsceMutacji] = 1;
      } else {
        kopiaPopulacji[i][miejsceMutacji] = 0;
      }
    }
  }
  return kopiaPopulacji;
}

export default mutacje;
