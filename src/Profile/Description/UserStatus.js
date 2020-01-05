import React from 'react';
//import profile from '../Profile.module.css';

class UserStatus extends React.Component {
    state = {
      editMode: false,
      status: this.props.status
    };

    activateEditMode = () => {
        this.setState({
            editMode: true
        });
    };

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    };

    onStatusChange = v => {
      this.setState({
        status: v.currentTarget.value
      });
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status){
            this.setState({
               status: this.props.status
            });
        }
    }

    render() {
        return (
            <div>
                { !this.state.editMode ?
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                    </div> :
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={ this.deactivateEditMode } value={this.state.status}/>
                    </div>
                }
            </div>
        )
    };
}

export default UserStatus;