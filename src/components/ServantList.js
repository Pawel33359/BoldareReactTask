import ServantItem from "./ServantItem";
import { MAX_ON_PAGE, TRANSLATIONS } from "../config";
import { changeDateFormat } from "../changeDateFormat";

function ServantList({ servants, page, sortBy, setSortBy }) {
  const pageFrom = (page - 1) * MAX_ON_PAGE;
  const pageTo = page * MAX_ON_PAGE - 1;

  const sortedServants = sortBy ? sortServants() : servants;

  // Sort servants depending on sortBy value
  function sortServants() {
    const newSortedServants = [...servants].sort((a, b) => {
      if (
        sortBy === "firstName" ||
        sortBy === "lastName" ||
        sortBy === "function"
      ) {
        return a[sortBy].localeCompare(b[sortBy]);
      }
      if (sortBy === "experience") {
        return a[sortBy] - b[sortBy];
      }
      if (sortBy === "dateOfBirth") {
        return (
          new Date(changeDateFormat(a[sortBy])).getTime() -
          new Date(changeDateFormat(b[sortBy])).getTime()
        );
      }
      return 0;
    });
    return newSortedServants;
  }

  // handle clicks on table header
  function handleClick(sortValue) {
    // if clicked on again then set sortBy to null
    if (sortValue === sortBy) {
      setSortBy(null);
      return;
    }
    setSortBy(sortValue);
  }

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(TRANSLATIONS).map((key) => (
            <th key={key} onClick={() => handleClick(key)}>
              {TRANSLATIONS[key]}
              {sortBy === key ? <span>&darr;</span> : ""}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedServants.map((servant, index) => {
          return index >= pageFrom && index <= pageTo ? (
            <ServantItem servant={servant} key={servant.id} />
          ) : null;
        })}
      </tbody>
    </table>
  );
}

export default ServantList;
