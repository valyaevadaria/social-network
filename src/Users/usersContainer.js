import React from 'react';
import {connect} from "react-redux";
import {
    follow,
    unfollow,
    setCurrentPage,
    setTotalCount,
    setUsers,
    tuggleFetch
} from "../redux/reduceUsers";
import Users from "./User/Users";
import * as axios from "axios";

class UserContainer extends React.Component {

    componentDidMount() {
        this.props.tuggleFetch(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.countOnPage}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalCount(response.data.totalCount);
                this.props.tuggleFetch(false);
            });
    }

    onCurrentPageChanged(pageNumber) {
        this.props.tuggleFetch(true);
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.countOnPage}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.tuggleFetch(false);
            });
    }

    render() {
        return <>
            <Users
                users={this.props.users}
                deleteFriend={this.props.unfollow}
                addFriend={this.props.follow}
                isFetching={this.props.isFetching}
                onAddUsers={() => this.onCurrentPageChanged(this.props.currentPage + 1)}
            />
        </>
    }
};



const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        countOnPage: state.usersPage.countOnPage,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
};
const mapDispatchToProps = {
        follow,
        unfollow,
        setUsers,
        setTotalCount,
        setCurrentPage,
        tuggleFetch
    };

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UserContainer);

export default UsersContainer;
