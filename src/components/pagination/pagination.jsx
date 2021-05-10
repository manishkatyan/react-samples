import React, { useEffect, useState } from "react";

export default function Pagination() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;
  let maxPage = 20;

  const getPageData = () => {
    if (!data) return;
    const startIndex = currentPage * pageSize - pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  const apiURL = "https://jsonplaceholder.typicode.com/posts/";
  useEffect(() => {
    fetch(apiURL)
      .then((response) => response.json())
      .then((apiData) => {
        setData(apiData);
      })
      .catch((ex) => setError(ex.message));
  }, []);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  if (error) return <div>An error occurred: {error}</div>;

  return (
    <>
      <div className="row">
        <div className="col-4">
          <h3>Features</h3>
        </div>
        <div className="col">
          <PaginationData data={getPageData()} />
          <button
            className="btn btn-primary m-2"
            disabled={currentPage === maxPage ? "disabled" : ""}
            onClick={handleNext}
          >
            Next
          </button>
          <button
            className="btn btn-secondary"
            disabled={currentPage === 1 ? "disabled" : ""}
            onClick={handlePrevious}
          >
            Previous
          </button>
        </div>
      </div>
    </>
  );
}

function PaginationData({ data }) {
  if (!data) return <p>No Data Available</p>;
  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row) => {
              return (
                <tr key={row.id}>
                  <td class="align-top">{row.id}</td>
                  <td class="align-top">{row.title}</td>
                  <td class="align-top">{row.body}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
