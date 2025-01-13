import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUser, fetchRepos, updateUser, fetchUser, deleteUser } from '../services/api';
import RepoList from './RepoList';
import { useGlobalContext } from '../useGlobalContext';
import Modal from './Modal';
import "../styles/HomePage.css";

const HomePage = () => {
    const [username, setUsername] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [location, setLocation] = useState('');
    const [blog, setBlog] = useState('');
    const [bio, setBio] = useState('');
    const { state, dispatch } = useGlobalContext();
    const navigate = useNavigate();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        if (state.userData) {
            setLocation(state.userData.location || '');
            setBlog(state.userData.blog || '');
            setBio(state.userData.bio || '');
        }
    }, [state.userData]);  
    

    const handleSearch = async (e) => {
        e.preventDefault(); 
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
        let name = JSON.parse(localStorage.getItem('username')) || username;
        navigate(`/followers/${name}`);
    };

    const openUpdateModal = () => {
        setLocation(state.userData.location || '');
        setBlog(state.userData.blog || '');
        setBio(state.userData.bio || '');
        setIsModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updateResponse = await updateUser(username, { location, blog, bio });;
    
            const updatedUserData = await fetchUser(username);
            if (updatedUserData) {
                dispatch({ type: 'SET_USER_DATA', payload: updatedUserData });
            }
    
            setIsModalOpen(false);  
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    
    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        try {
            const deleteResponse = await deleteUser(username); 
            console.log('User deleted:', deleteResponse);
            alert('User deleted successfully');
            setIsDeleteModalOpen(false);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
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
               <div className="profile-header">
                   <div className="profile-left">
                       <img
                           src={state.userData.avatar_url || state.userData.githubData.avatar_url}
                           alt="avatar"
                           className="user-avatar"
                           width="100"
                       />
                   </div>
                   <div className="profile-right">
                       <h2 className="user-name">{state.userData.name || username}</h2>
                       <p>Location: {state.userData.location || 'Not provided'}</p>
                       <button className="edit-button" onClick={openUpdateModal}>
                           Edit Details
                       </button>
                       <button className="delete-button" onClick={openDeleteModal}>
                                    Delete
                                </button>
                   </div>
               </div>
             
                   <div className="profile-bio">
                       <p>{state.userData.bio || 'No bio available'}</p>
                   </div>
                   <div className="profile-blog">
                       <h3>Blog:</h3>
                       <p style={{"margin-top": "23px"}}>{state.userData.blog || 'Not provided'}</p>
                     
                   </div>
                   <button className="followers-button" onClick={handleFollowersClick}>
                           View Followers
                       </button>
              
           </div>
           
                )}
            </div>
            {state.repos.length > 0 && <RepoList repos={state.repos} />}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleUpdate}
                location={location}
                setLocation={setLocation}
                blog={blog}
                setBlog={setBlog}
                bio={bio}
                setBio={setBio}
            />
             {isDeleteModalOpen && (
                <div className="delete-modal">
                    <div className="delete-modal-content">
                        <h3>Are you sure you want to delete the {username}?</h3>
                        <button onClick={handleDelete}>Yes, Delete</button>
                        <button onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;