const BASE_URL = 'http://20.191.154.156:8081'; 

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
