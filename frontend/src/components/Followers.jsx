import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/Followers.css";
const Followers = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${username}/followers`);
                const data = await response.json();
                setFollowers(data);
            } catch (error) {
                console.error('Error fetching followers:', error);
            }
        };

        fetchFollowers();
    }, [username]);

    return (
        <div className="followers-container">
            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
            <h2>Followers of {username}</h2>
            <ul className="followers-list">
                {followers.map((follower) => (
                    <li key={follower.id} className="follower-item">
                        <img
                            src={follower.avatar_url}
                            alt={follower.login}
                            className="follower-avatar"
                        />
                        <span className="follower-name">{follower.login}</span>
                    </li>
                ))}
            </ul>
        </div>


    );
};

export default Followers;
