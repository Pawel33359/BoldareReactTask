import { useEffect, useState } from "react";
import ServantList from "./ServantList";
import Filtering from "./Filtering";
import Pagination from "./Pagination";
import { MAX_ON_PAGE } from "../config";
import { changeDateFormat } from "../changeDateFormat";

function filterServants(servants, filteredBy, filterQuery) {
  let filteredServants;
  // If servants are filtered by birthday check using Date
  if (filteredBy === "dateOfBirth") {
    filteredServants = servants.filter((servant) => {
      const birthday = new Date(changeDateFormat(servant.dateOfBirth));
      if (
        birthday.getDate() === filterQuery.getDate() &&
        birthday.getMonth() === filterQuery.getMonth() &&
        birthday.getYear() === filterQuery.getYear()
      )
        return servant;

      return null;
    });
    // Else compare strings
  } else {
    filteredServants = servants.filter((servant) => {
      if (
        String(servant[filteredBy])
          .slice(0, filterQuery.length)
          .toLowerCase() === filterQuery.toLowerCase()
      )
        return servant;

      return null;
    });
  }
  return filteredServants;
}

function App() {
  const [servants, setServants] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);

  const [filterQuery, setFilterQuery] = useState("");
  const [filteredBy, setFilteredBy] = useState("firstName");

  // if there is no filter query assign servants to filteredServants
  // else filter servants based on filteredBy and filterQuery
  const filteredServants =
    filterQuery === "" || filterQuery === null
      ? servants
      : filterServants(servants, filteredBy, filterQuery);

  // calculate number of pages
  const allPages = Math.ceil(filteredServants.length / MAX_ON_PAGE);

  // fetch servants from json-server
  useEffect(() => {
    async function fetchServants() {
      try {
        const res = await fetch(`http://localhost:8000/servants`);
        const data = await res.json();
        setServants(data);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchServants();
  }, []);

  return (
    <div className="container">
      <header>
        <Filtering
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
          filteredBy={filteredBy}
          setFilteredBy={setFilteredBy}
        />
      </header>
      <main>
        <ServantList
          servants={filteredServants}
          page={page}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <Pagination page={page} setPage={setPage} allPages={allPages} />
      </main>
    </div>
  );
}

export default App;
