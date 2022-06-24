import { useDispatch, useSelector } from 'react-redux';
import FormCreate from '../../components/FormCreate/FormCreate';
import './Create.scss'
import { createPokemon } from '../../Reducer/actions'
import axios from 'axios';

export default function Create() {
  const dispatch = useDispatch();
  async function get(url, data) {
    try {
      const poke = await axios.post(url, data)
      return poke.data;
    } catch (error) {
      console.log('Error: ' + error.response)
    }
  }
  const onSubmit = async (data) => {
    const create = await get('http://localhost:3001/pokemons', data);
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