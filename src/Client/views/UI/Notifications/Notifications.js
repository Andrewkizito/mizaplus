import React,{ useEffect } from 'react';

import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { connect } from 'react-redux';

const Notifications = ({Notifications}) => {
    useEffect(() => {
            if(Notifications){
                Notifications.map(notification => {
                    store.addNotification({
                        title: notification.title,
                        message: notification.message,
                        type: notification.type,
                        insert: "bottom",
                        container: "bottom-right",
                        animationIn: ["animate__animated", "animate__slideInRight"],
                        animationOut: ["animate__animated", "animate__slideOutDown"],
                        dismiss: {
                          duration: 8000,
                          onScreen: true,
                          showIcon: true,
                          pauseOnHover: true
                        }
                    });
                });
            }
    },[Notifications])

    return (
        <ReactNotification />
    );
}

const mapStateToProps = state => {
    return {
        Notifications: state.Notifications
    }
}

export default connect(mapStateToProps)(Notifications);
