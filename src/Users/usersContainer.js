import React from 'react';
import {connect} from "react-redux";
import {
    tuggleFollowProgress,
    followUnfollowFlow,
    getUsers
} from "../redux/reduceUsers";
import Users from "./User/Users";
import {AuthRedirect} from "../hoc/AuthRedirect";
import {compose} from "redux";


class UserContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.countOnPage);
    }

    onCurrentPageChanged(pageNumber) {
        this.props.getUsers(pageNumber, this.props.countOnPage)
    }

    render() {
        return <>
            <Users
                users={this.props.users}
                followUnfollowFlow={this.props.followUnfollowFlow}
                isFetching={this.props.isFetching}
                followingInProgress={this.props.followingInProgress}
                tuggleFollowProgress={this.props.tuggleFollowProgress}
                // totalUsersCount = {this.props.totalUsersCount}
                // currentPage = {this.props.currentPage}
                // pageSize = {this.props.countOnPage}
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
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
};

const mapDispatchToProps = {
        followUnfollowFlow,
        getUsers
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthRedirect
)(UserContainer);
