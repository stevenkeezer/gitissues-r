import React from "react";
import RepoCard from "../components/RepoCard";
import Pagination from "react-bootstrap/Pagination";

export default function RepoPage(props) {

  const handleOnChange = (page) => {
    props.setCurrentPage(Number(page))
    console.log("CurrentPage", page)
    props.search(page)
  }
  
  let active = props.currentPage;
  let items = [];
  for (let number = props.currentPage; number <= props.currentPage+5; number++) {
    if(props.currentPage>0 && number<=props.totalSearchResult){
      items.push(
        <Pagination.Item key={number} onClick={() => handleOnChange(number)} active={number === active}>
          {number}
        </Pagination.Item>,
      );
    }
  }
  if(!props.repo) return "We cant found any search result for this"
  return (
    <div>
      <h1 className="total-results-text">🛸 Current have {props.totalSearchResult} pages 🛸</h1>
      <Pagination>
        <Pagination.First onClick={() => handleOnChange(1)} />
        <Pagination.Prev onClick={() => {if(props.currentPage !== 1) handleOnChange(props.currentPage-1)}} />
        {items}
        <Pagination.Next onClick={() => {if(props.currentPage !== props.totalSearchResult) handleOnChange(props.currentPage+1)}} />
        <Pagination.Last onClick={() => handleOnChange(props.totalSearchResult-1)} />
      </Pagination>

      {props.repo.map((repo,idx) => {
        // console.log('repo',repo);
        return <RepoCard 
          repo={repo}
          idx={idx}
          setIssueName={props.setIssueName}
          setShowIssues={props.setShowIssues}
          setShowRepo={props.setShowRepo}
        />
      })}
      <Pagination>
        <Pagination.First onClick={() => handleOnChange(1)} />
        <Pagination.Prev onClick={() => {if(props.currentPage !== 1) handleOnChange(props.currentPage-1)}} />
        {items}
        <Pagination.Next onClick={() => {if(props.currentPage !== props.totalSearchResult) handleOnChange(props.currentPage+1)}} />
        <Pagination.Last onClick={() => handleOnChange(props.totalSearchResult-1)} />
      </Pagination>
    </div>
  );
}
