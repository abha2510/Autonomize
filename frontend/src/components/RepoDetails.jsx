import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../useGlobalContext';
import "../styles/RepoDetails.css";


const RepoDetails = () => {
  const { state } = useGlobalContext();
  const location = useLocation();
  const navigate = useNavigate();

  const repoName = location.pathname.split('/').pop();
  const repo = state.repos.find((r) => r.name === repoName);

  if (!repo) {
    return <p>Error: No repository data found.</p>;
  }

  return (
    <div className="repo-details">
    <h1>{repo.name}</h1>
    <p>{repo.description || 'No description available'}</p>
    <p>Stars: {repo.stargazers_count}</p>
    <p>Forks: {repo.forks_count}</p>
    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
      View on GitHub
    </a>
    <br />
    <button onClick={() => navigate(-1)}>← Back</button>
  </div>
  
  );
};
export default RepoDetails;
