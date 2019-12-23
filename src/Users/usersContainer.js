import React from 'react';
import {connect} from "react-redux";
import {
    follow,
    tuggleFollowProgress,
    getUsers
} from "../redux/reduceUsers";
import Users from "./User/User";
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
                follow={this.props.follow}
                isFetching={this.props.isFetching}
                followingInProgress={this.props.followingInProgress}
                tuggleFollowProgress={this.props.tuggleFollowProgress}
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
        follow,
        getUsers
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthRedirect
)(UserContainer);
