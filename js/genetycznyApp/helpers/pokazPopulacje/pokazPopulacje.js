import { pula, liczbaGenow } from '../../defaults/';
import addConsoleLine from '../addConsoleLine';

function pokazPopulacje(populacja) {
  addConsoleLine('Garnitur chromosomowy populacji');
  let string = 'gen chromosom';
  let i = 0;
  for (i; i < pula; i+= 1) {
    string += `\n${i} - `;
    let j = liczbaGenow;
    for (j; j > 0; j -= 1) {
      string += populacja[i][j - 1];
    }
  }
  addConsoleLine(string);
}

export default pokazPopulacje;
