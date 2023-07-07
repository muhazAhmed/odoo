import { AtomSpinner } from 'react-epic-spinners'
import "./Loader.css"

export const Loading = () => {
  return (
    <div className="loader">
    <AtomSpinner color="#E31A34"></AtomSpinner>
    <h4>Loading...</h4>
    </div>
  );
};