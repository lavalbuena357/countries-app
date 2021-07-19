import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES';

//obtener lista de paises -- consumidos desde la api externa 
export function getCountries(){
  return async function(dispatch) {
      try {
          const countries = await axios.get('http://localhost:3001/countries');
          dispatch({
              type: GET_COUNTRIES,
              payload: countries.data
          });
      } catch(err) {console.log(err)}
  }
}