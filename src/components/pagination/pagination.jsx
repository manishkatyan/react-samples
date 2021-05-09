import React, { useEffect, useState } from "react";

export default function Pagination() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;
  let maxPage = 10;

  const getPageData = () => {
    if (!data) return;
    const startIndex = currentPage * pageSize - 10;
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
      <h1>Pagination</h1>
      <div>
        <PaginationData data={getPageData()} />
        <button
          disabled={currentPage === maxPage ? "disabled" : ""}
          onClick={handleNext}
        >
          Next
        </button>
        <button
          disabled={currentPage === 1 ? "disabled" : ""}
          onClick={handlePrevious}
        >
          Previous
        </button>
      </div>
    </>
  );
}

function PaginationData({ data }) {
  if (!data) return <p>No Data Available</p>;
  return (
    <>
      <table>
        <tbody>
          {data &&
            data.map((row) => {
              return (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.title}</td>
                  <td>{row.body}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
