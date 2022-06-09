import { useDispatch, useSelector } from 'react-redux';
import FormCreate from '../../components/FormCreate/FormCreate';
import './Create.scss'
import {createPokemon} from '../../Reducer/actions'

export default function Create() {
  const dispatch = useDispatch();
  const onSubmit = () => {
    dispatch(createPokemon())
  }
  let tipos = useSelector(state => state.tipos);

  return (
    <div className='CreatePokemonPage'>
      <FormCreate  onSubmit={() => onSubmit} tipos = {tipos} />
    </div>
  );
}