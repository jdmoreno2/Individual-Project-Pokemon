import { useDispatch, useSelector } from 'react-redux';
import FormCreate from '../../components/FormCreate/FormCreate';
import './Create.scss'
import { createPokemon } from '../../Reducer/actions'
import axios from 'axios';
const { REACT_APP_BACK } = process.env;
// const { POKEMONS_URL_API } = import.meta.env;

export default function Create() {
  const dispatch = useDispatch();
  async function get(url, data) {
    try {
      let error = '';
      const poke = await axios.post(url, data).catch(e => {
        console.log(e.message)
        error = e.message
      });
      if (poke) {
        return poke.data;
      } else {
        return undefined;
      };
    } catch (error) {
      console.log('Error: ' + error.response)
    }
  }
  const onSubmit = async (data) => {
    const create = await get(REACT_APP_BACK+'/pokemons', data);
    console.log(create);
    if (create) {
      dispatch(createPokemon(create))
      return true;
    }else{
      return false;
    }
  }
  let tipos = useSelector(state => state.tipos);

  return (
    <div className='CreatePokemonPage'>
      <FormCreate onSubmit={onSubmit} tipos={tipos} />
    </div>
  );
}