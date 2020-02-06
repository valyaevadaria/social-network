import React from 'react';
import Description from "./Description/Description";
import MyPostsContainer from "./MyPosts/MyPoststContainer";
import {connect} from "react-redux";
import {setUserProfile, getStatus, updateUserStatus} from "../redux/reduceProfile";
import {withRouter} from "react-router";
import {AuthRedirect} from "../hoc/AuthRedirect";
import {compose} from "redux";
import {getUserData, changedUserStatus, getUserId} from "../redux/selectors/profile-selectors";

class Profile  extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authUserId;
        }
        this.props.setUserProfile(userId);
        this.props.getStatus(userId);
    }

    /*shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    }*/

    render() {
        return (
            <div>
                <Description
                    profile={this.props.userData}
                    userStatus={this.props.userStatus}
                    updateStatus={this.props.updateUserStatus}
                />
                <MyPostsContainer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userData: getUserData(state),
        userStatus: changedUserStatus(state),
        authUserId: getUserId(state)
    };
};

/*
const AuthRedirectComponent = AuthRedirect(Profile)
const withURLDataContainer = withRouter(AuthRedirectComponent);
const ProfileContainer = connect(mapStateToProps, {setUserProfile})(withURLDataContainer);
*/
export default compose(
    connect(mapStateToProps, {setUserProfile, getStatus, updateUserStatus}),
    withRouter,
    AuthRedirect
)(Profile);
