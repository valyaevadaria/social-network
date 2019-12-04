const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TUGGLE_FETCH = 'TUGGLE_FETCH';

const initialState = {
    users: [],
    totalUsersCount: 0,
    countOnPage: 5,
    currentPage: 1,
    isFetching: false
};

const reduceUsers = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
              ...state,
              users: state.users.map(user => {
                return (user.id === action.userId ? { ...user, followed: true } : user);
              })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    return (user.id === action.userId ? { ...user, followed: false } : user);
                })
            };
        case SET_USERS:
            return {
              ...state,
              users: [...state.users, ...action.users]
            };
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.count
            };
        case SET_CURRENT_PAGE:
            return {
              ...state,
              currentPage: action.current
            };
        case TUGGLE_FETCH:
            return {
                ...state,
                isFetching: action.flag
            }
        default:
            return state;
    };
};

export const follow = (userId) => ({ type: FOLLOW, userId });
export const unfollow = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users});
export const setTotalCount = (count) => ({ type: SET_TOTAL_COUNT, count});
export const setCurrentPage = (current) => ({ type: SET_CURRENT_PAGE, current});
export const tuggleFetch = (flag) => ({ type: TUGGLE_FETCH, flag});

export default reduceUsers;