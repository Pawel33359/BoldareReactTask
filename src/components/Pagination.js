function Pagination({ page, setPage, allPages }) {
  function handleGoBack() {
    if (page - 1 < 1) return;
    setPage((p) => p - 1);
  }
  function handleGoForward() {
    if (page + 1 > allPages) return;
    setPage((p) => p + 1);
  }
  function handleGoTo(newPage) {
    setPage(newPage);
  }

  return (
    <div className="pagination">
      <button onClick={handleGoBack}>&larr;</button>
      {Array.from({ length: allPages }, (_, i) => (
        <span
          key={i + 1}
          onClick={() => handleGoTo(i + 1)}
          className={i + 1 === page ? "pagination--active" : ""}
        >
          {i + 1}
        </span>
      ))}
      <button onClick={handleGoForward}>&rarr;</button>
    </div>
  );
}

export default Pagination;
