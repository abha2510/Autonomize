import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RepoList.css";
const RepoList = ({ repos }) => {
  const navigate = useNavigate();

  const handleRepoClick = (repo) => {
    navigate(`/repo/${repo.name}`, { state: { repo } });
  };

  return (
    <div className="repo-list-container">
      <h2>Repositories</h2>
      <div className="repo-list">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="repo-card"
            onClick={() => handleRepoClick(repo)}
          >
            <div className="repo-icon">
              <img
                src={`https://github.com/${repo.owner.login}.png`}
                alt={repo.name}
                className="repo-image"
              />
            </div>
            <div className="repo-info">
              <h3>{repo.name}</h3>
              <p>{repo.description || "No description available"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepoList;
