import './Alert.scss';

export default function Alert({ message, type }) {

  return (
    <div className='Alert'>
      <div className={`Alert-${type}`} >
        <span className="closebtn" onClick={(e) => document.querySelector(".Alert").style.display = 'none'} >&times;</span>
        {message}
      </div>
    </div>
  );
}