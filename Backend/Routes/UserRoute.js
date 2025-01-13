const express = require('express');
const userRouter = express.Router();
const { UserModel } = require("../Model/UserModel");
const axios = require('axios');

userRouter.post('/users/:username', async (req, res) => {
    const { username } = req.params;

    try {
        let user = await UserModel.findOne({ username });
        if (user) {
            return res.status(200).json({ message: 'User already exists in the database' });
        }
        const githubData = await fetchGitHubData(username);
        user = new UserModel({ username, githubData });
        await user.save();

        res.status(201).json({ message: 'User data saved', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const fetchGitHubData = async (username) => {
    const url = `https://api.github.com/users/${username}`;

    try {
        console.log("before fetch api call")
        const response = await axios.get(url, { timeout: 10000 } ,{
            headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching GitHub data');
    }
};


userRouter.get('/users/:username', async (req, res) => {
    const { username } = req.params;
  
    try {
      const user = await UserModel.findOne({ username });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

userRouter.patch('/users/:username', async (req, res) => {
    const { username } = req.params;
    const { location, blog, bio } = req.body; 

    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { username },
            { $set: { location, blog, bio } },
            { new: true } 
        );
        

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRouter.post('/users/:username/add-friends', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { followers, following } = await fetchFollowersAndFollowing(username);
        const mutualFriends = followers.filter(follower => following.includes(follower));
        user.friends = mutualFriends;
        await user.save();

        res.status(200).json({ message: 'Friends added successfully', friends: mutualFriends });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const fetchFollowersAndFollowing = async (username) => {
    try {
        const followersUrl = `https://api.github.com/users/${username}/followers`;
        const followingUrl = `https://api.github.com/users/${username}/following`;

        const [followersResponse, followingResponse] = await Promise.all([
            axios.get(followersUrl),
            axios.get(followingUrl),
        ]);

        const followers = followersResponse.data.map(follower => follower.login);
        const following = followingResponse.data.map(following => following.login);

        return { followers, following };
    } catch (error) {
        throw new Error('Error fetching followers or following');
    }
};
userRouter.delete('/users/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await UserModel.findOneAndDelete({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User soft deleted successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { userRouter }