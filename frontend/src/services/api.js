const BASE_URL = 'https://www.khaliqansari.live'; 
// const BASE_URL='http://localhost:8081'

export const fetchUserData = async (username) => {
  const response = await fetch(`${BASE_URL}/users/${username}`);
  return response.json();
};

export const saveUser = async (username) => {
  const response = await fetch(`${BASE_URL}/users/${username}`, {
    method: 'POST',
  });
  return response.json();
};


export const fetchRepos = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  return response.json();
};


export const fetchFollowers = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}/followers`);
  return response.json();
};

export const updateUser = async (username, data) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result; 
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
export const fetchUser = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const deleteUser = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to delete user');
    }
    return result;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
