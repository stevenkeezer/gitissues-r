import React from "react";
import RepoCard from "../components/RepoCard";
import Pagination from 'react-bootstrap/Pagination'

export default function RepoPage(props) {

  const handleOnChange = (page) => {
    props.setCurrentPage(page)
    props.search()
  }

  let active = props.currentPage;
  let items = [];
  for (let number = props.currentPage-1; number <= props.currentPage+5; number++) {
    items.push(
      <Pagination.Item key={number} onClick={() => handleOnChange(number)} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <div>
      {props.repo.map(repo => (
        <RepoCard repo={repo} />
      ))}
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        {items}
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </div>
  );
}
