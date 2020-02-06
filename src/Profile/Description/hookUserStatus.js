import React from 'react';

const UserStatus = React.memo((props) => {
    const [editMode, setEditMode] = React.useState(false);
    const [status, setStatus] = React.useState(props.status);

    React.useEffect( () => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };

    const onStatusChange = v => {
        setStatus(v.currentTarget.value);
    };
    console.log('render');
    return (

        <div>
            { !editMode ?
                <div>
                    <span onDoubleClick={activateEditMode}>{status}</span>
                </div> :
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={ deactivateEditMode } value={status}/>
                </div>
            }
        </div>
    );
});

export default UserStatus;