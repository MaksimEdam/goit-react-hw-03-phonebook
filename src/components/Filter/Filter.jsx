import s from './Filter.module.css';

function Filter({ value, onChange }) {
  return (
    <label className={s.Label}>
      Find contacts by name
      <input type="text" value={value} onChange={onChange} />
    </label>
  );
}

export default Filter;
