import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // in redux we do not modify state directly, but with redux toolkit, it handles that itself under the hood
        // using Immer library it simplify the update logic
        setMode: (state) => {
            state.mode = state.mode === 'light' ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if(state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.log("user friends non-existent");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPost = state.posts.map((post) => {
                if (post._id === action.payload.post_id) {
                    return action.payload.post;
                }
                return post;
            });
            state.posts = updatedPost;
        }
    }
});

export const {setMode, setFriends, setLogin, setLogout, setPost, setPosts} = authSlice.actions;
export default authSlice.reducer;