import React, { useEffect, useState } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const PaginationToDo = () => {
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState();

  const pageSize = 20;

  const apiURL = "https://jsonplaceholder.typicode.com/todos/";
  useEffect(() => {
    fetch(apiURL)
      .then((response) => response.json())
      .then((apiData) => {
        setData(apiData);
      })
      .catch((ex) => setError(ex.message));
  }, []);

  const getPageData = () => {
    if (!data) return;
    const startIndex = currentPage * pageSize - pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  if (error) return <div>An error occurred: {error}</div>;

  return (
    <>
      <div>
        <PaginationData pageData={getPageData()} />
        <PaginationV2
          itemsCount={data && data.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>
    </>
  );
};

export default PaginationToDo;

const PaginationData = (props) => {
  const { pageData } = props;

  if (!pageData) return <p>Loading ...</p>;

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        {pageData &&
          pageData.map((row) => {
            return (
              <tr key={row.id}>
                <td className="align-top">{row.id}</td>
                <td className="align-top">{row.title}</td>
                <td className="align-top">{row.completed ? "Yes" : "No"}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

const PaginationV2 = (props) => {
  if (!props.itemsCount) return null;

  const pagesCount = Math.floor(props.itemsCount / props.pageSize);

  const pages = _.range(1, pagesCount + 1);

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button
              onClick={props.onPrevious}
              className={props.currentPage === 1 ? "btn disabled" : "page-link"}
            >
              Previous
            </button>
          </li>
          {pages.map((page) => {
            return (
              <li
                className={
                  page === props.currentPage ? "page-item active" : "page-item"
                }
                key={page}
              >
                <button
                  className="page-link"
                  onClick={() => props.onPageChange(page)}
                >
                  {page}
                </button>
              </li>
            );
          })}

          <li className="page-item">
            <button
              onClick={props.onNext}
              className={
                props.currentPage === pagesCount ? "btn disabled" : "page-link"
              }
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      <pre>
        <a
          href="https://github.com/manishkatyan/react-toolkit/blob/master/src/components/pagination/paginationToDo.jsx"
          rel="noreferrer"
          target="_blank"
        >
          Source Code
        </a>
      </pre>
    </>
  );
};

PaginationV2.propTypes = {
  itemsCount: PropTypes.number,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};
