import React from "react";
import RepoCard from "../components/RepoCard";
import Pagination from "react-bootstrap/Pagination";

export default function RepoPage(props) {
  const handleOnChange = page => {
    props.setCurrentPage(Number(page));
    console.log("CurrentPage", page);
    props.search(page);
  };

  let active = props.currentPage;
  let items = [];
  for (
    let number = props.currentPage - 1;
    number <= props.currentPage + 5;
    number++
  ) {
    items.push(
      <Pagination.Item
        key={number}
        onClick={() => handleOnChange(number)}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      {props.repo.map(repo => (
        <RepoCard repo={repo} />
      ))}
      <Pagination className="pagination">
        <Pagination.First onClick={() => handleOnChange(1)} />
        <Pagination.Prev
          onClick={() => handleOnChange(props.currentPage - 1)}
        />
        {items}
        <Pagination.Next
          onClick={() => handleOnChange(props.currentPage + 1)}
        />
        <Pagination.Last
          onClick={() => handleOnChange(props.totalSearchResult)}
        />
      </Pagination>
    </div>
  );
}
