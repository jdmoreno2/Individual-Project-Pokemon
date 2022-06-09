import "./FormSearch.scss";

export default function FormSearch(props) {
  return(
    <div className="cover">
      <h1>App Mi Pokemon</h1>
      <form className="flex-form">
        <input type="search" placeholder="Que pokemon quieres buscar?" />
        <input type="button" value="Buscar" />
      </form>
    </div>
  );
}