import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUser, fetchRepos } from '../services/api';
import RepoList from './RepoList';
import { useGlobalContext } from '../useGlobalContext';
import "../styles/HomePage.css";

const HomePage = () => {
    const [username, setUsername] = useState('');
    const { state, dispatch } = useGlobalContext();
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const userResponse = await saveUser(username);
            if (userResponse) {
                const repositories = await fetchRepos(username);
                localStorage.setItem('username', JSON.stringify(username));

                dispatch({ type: 'SET_USER_DATA', payload: userResponse.user.githubData });
                dispatch({ type: 'SET_REPOS', payload: repositories });
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const handleFollowersClick = () => {
        console.log(username);
        let name = JSON.parse(localStorage.getItem('username')) || username;
        navigate(`/followers/${name}`);
    };

    return (
        <div className="github-search-container">
            <div className='search-container'>

                <h1 className="title">GitHub User Search</h1>
                <div className="search-form">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter GitHub username"
                        className="search-input"
                    />
                    <button className="search-button" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>
            <div className='user-data-container'>

                {state.userData && (
                    <div className="user-data">
                        <h2 className="user-name">{state.userData.name || username}</h2>
                        <p className="user-bio">{state.userData.bio || 'No bio available'}</p>
                        <img
                            src={state.userData.avatar_url}
                            alt="avatar"
                            className="user-avatar"
                            width="100"
                        />
                        <button className="followers-button" onClick={handleFollowersClick}>
                            View Followers
                        </button>
                    </div>
                )}
            </div>
            {state.repos.length > 0 && <RepoList repos={state.repos} />}
        </div>
    );
};
export default HomePage;
