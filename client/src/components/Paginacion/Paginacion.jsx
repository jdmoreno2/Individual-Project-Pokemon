import './Paginacion.scss';

export default function Paginacions({ datos }) {

  return (
    <ul className="pagination">
      {datos}
    </ul>
  );
}