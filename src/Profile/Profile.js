import React from 'react';
import Description from "./Description/Description";
import MyPostsContainer from "./MyPosts/MyPoststContainer";
import {connect} from "react-redux";
import {setUserProfile} from "../redux/reduceProfile";
import {withRouter} from "react-router";
import {AuthRedirect} from "../hoc/AuthRedirect";
import {compose} from "redux";

class Profile  extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        this.props.setUserProfile(userId);
    }

    render() {
        return (
            <div>
                <Description profile={this.props.userData}/>
                <MyPostsContainer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state.profilePage.userData,
    };
};

/*
const AuthRedirectComponent = AuthRedirect(Profile)
const withURLDataContainer = withRouter(AuthRedirectComponent);
const ProfileContainer = connect(mapStateToProps, {setUserProfile})(withURLDataContainer);
*/
export default compose(
    connect(mapStateToProps, {setUserProfile}),
    withRouter,
    AuthRedirect
)(Profile);
