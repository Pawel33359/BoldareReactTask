import { TRANSLATIONS } from "../config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Filtering({ filterQuery, setFilterQuery, filteredBy, setFilteredBy }) {
  function handleChangeFilteredBy(e) {
    setFilteredBy(e.target.value);
    setFilterQuery("");
  }

  return (
    <>
      <label>Filter by:</label>
      <select value={filteredBy} onChange={(e) => handleChangeFilteredBy(e)}>
        {Object.keys(TRANSLATIONS).map((key) => (
          <option key={key} value={key}>
            {TRANSLATIONS[key]}
          </option>
        ))}
      </select>
      {filteredBy === "dateOfBirth" ? (
        <DatePicker
          selected={filterQuery}
          onChange={(date) => setFilterQuery(date)}
          dateFormat="dd.MM.yyyy"
        />
      ) : (
        <input
          type="text"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
        />
      )}
    </>
  );
}

export default Filtering;
