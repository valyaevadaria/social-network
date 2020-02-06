import React from 'react';
import reduceProfile, {addNewPostCreator, deletePost} from "./reduceProfile";

const state = {
    posts: [
        { id: 1, text: 'I will be good', likesCount: 5 },
        { id: 2, text: 'Hi, Friends!', likesCount: 10 },
        { id: 3, text: 'My English is getting better.', likesCount: 18 }
    ]
};

it('posts count should be increment', () => {
   const action = addNewPostCreator('it is a perfect day today!');
   const newState = reduceProfile(state, action);
   expect(newState.posts.length).toBe(4);
});

it('post text should be correct', () => {
    const action = addNewPostCreator('it is a perfect day today!');
    const newState = reduceProfile(state, action);
    expect(newState.posts[3].text).toBe('it is a perfect day today!');
});
/* added before developing*/
it('posts count should be decrement', () => {
    const action = deletePost(2);
    const newState = reduceProfile(state, action);
    expect(newState.posts.length).toBe(2);
});