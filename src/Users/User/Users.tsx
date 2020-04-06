import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import User from "./User";
import Paginator from "../../common/Paginator/Paginator";
import {userType} from "../../redux/reduceUsers";

type PropsType = {
    users: Array<userType>
    followUnfollowFlow: (userId: number, isFollow: boolean) => void
    isFetching: boolean
    status: string
    followingInProgress: Array<number>
    onAddUsers: () => void
}

const Users: React.FC<PropsType> = (props) => {

    const usersList = props.users.map(element => {
        return <User id={element.id}
              name={element.name}
              photo={element.photos.small}
              followed={element.followed}
              userStatus={props.status}
              followingInProgress={props.followingInProgress}
              followUnfollowFlow={props.followUnfollowFlow}
        />
    });


    return (
        <div>
            <div className='users.showMore'>
                {props.isFetching ? <Preloader /> : null}
                <button onClick={props.onAddUsers}>Show more</button>
            </div>

            { usersList }

            {/*<Paginator*/}
            {/*    totalItemsCount={props.totalUsersCount}*/}
            {/*    currentPage={props.currentPage}*/}
            {/*    pageSize={props.pageSize}*/}
            {/*    onPageChanged={props.onAddUsers}*/}
            {/*/>*/}

        </div>
    );
};

export default Users;