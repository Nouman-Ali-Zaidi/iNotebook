import React from 'react'

const Alert = (props) => {
    return (
        <div style={{ height: "60px" }}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert" >
                <b>{props.alert.type === "danger" ? "Error" : props.alert.type}</b>: {props.alert.msg}
            </div>}
        </div>


    )
}

export default Alert