import React from 'react';
import {connect} from "react-redux";
import {
    followUnfollowFlow,
    getUsers, userType
} from "../redux/reduceUsers";
import Users from "./User/Users";
import {AuthRedirect} from "../hoc/AuthRedirect";
import {compose} from "redux";
import {StateType} from "../redux/store";

type MapStatePropsType = {
    currentPage: number
    countOnPage: number
    totalUsersCount: number
    users: Array<userType>
    followingInProgress: Array<number>
    isFetching: boolean
}

type MapDispatchPropsType = {
    followUnfollowFlow: (userId: number, isFollow: boolean) => void
    getUsers: (currentPage: number, countOnPage: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class UserContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.countOnPage);
    }

    onCurrentPageChanged(pageNumber: number) {
        this.props.getUsers(pageNumber, this.props.countOnPage)
    }

    render() {
        return <>
            // @ts-ignore
            <Users
                users={this.props.users}
                followUnfollowFlow={this.props.followUnfollowFlow}
                isFetching={this.props.isFetching}
                followingInProgress={this.props.followingInProgress}
                // totalUsersCount = {this.props.totalUsersCount}
                // currentPage = {this.props.currentPage}
                // pageSize = {this.props.countOnPage}
                onAddUsers={() => this.onCurrentPageChanged(this.props.currentPage + 1)}
            />
        </>
    }
};



const mapStateToProps = (state: StateType): MapStatePropsType => {
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
    // @ts-ignore
    connect<MapStatePropsType, MapDispatchPropsType, StateType>(mapStateToProps, mapDispatchToProps),
    AuthRedirect
    // @ts-ignore
)(UserContainer);
