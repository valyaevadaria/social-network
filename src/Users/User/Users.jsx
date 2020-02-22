import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import User from "./User";
import Paginator from "../../common/Paginator/Paginator";

const Users = (props) => {

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