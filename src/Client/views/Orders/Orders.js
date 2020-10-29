import React, { useState } from 'react';

import MizaplusHeader from '../UI/Header/Header';
import MizaplusFooter from '../UI/Footer/Footer';

import "./Orders.css";
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Card } from '@material-ui/core';
import Loader from '../UI/Loader/Loader';
import Alert from '../UI/Alert/Alert';
import GridContainer from 'Client/components/Grid/GridContainer';
import GridItem from 'Client/components/Grid/GridItem';
import Button from 'Client/components/CustomButtons/Button';
import { Refresh, Update } from '@material-ui/icons';
import Backdrop from './Backdrop';

const Orders = ({user}) => {
    const [ data,setData ] = useState(null);
    const [ show,setShow ] = useState(false);
    const [ ui,setUi ] = useState({loading: false,error: null,success: null});
    const [ order,setOrder ] = useState(null);

    useEffect(() => {
        setUi({loading: true,error: null,success: null});
        Axios.get(`https://z7uebszilc.execute-api.us-east-2.amazonaws.com/prod/orders/${user}`)
        .then(res => {
            if(res.data.statusCode === 200) {
                const orders = res.data.data;
                setData(orders);
                setUi({loading: false,error: null,success: `You have ${orders.length} orders available`});
            } else {
                setUi({loading: false,error: res.data.error,success: null});
                console.log(res.data.error)
            }
        }).catch(err => setUi({loading: false,error: err.message,success: null}));
    },[]);

    const showModal = (order) => {
        setShow(true);
        setOrder(order);
    }
    return (
        <>
            <Backdrop show={show} setShow={(effect) => setShow(effect)} order={order}/>
            <MizaplusHeader/>
            <div className="Orders">
              <Card className="Box">
                <h4>Your Orders</h4>
                <hr/>
                { ui.success && <Alert text={ui.success} color="success"/> }
                { ui.error && <Alert text={ui.error} color="danger"/> }
                { ui.loading && <Loader text="Fetching Orders, Please Wait..."/> }
                <GridContainer>
                    { data && data.map(order => {
                        return <GridItem sm={12} md={6}>
                                    <div className="Order">
                                        <ul>
                                            <li>Order Id: <span>{order.id}</span></li>
                                            <li>Total Cost: <span>€{order.totalCost}</span></li>
                                            <li>Address: <span>{order.address}, {order.city}, {order.country}</span></li>
                                            <li>Total Items: <span>{order.cart.length}</span></li>
                                            <li>Time Placed: <span>{order.timeCreated}</span></li>
                                            <li>Placed On: <span>{order.date}</span></li>
                                            <li>Purchase Names: <span>{order.firstName} {order.lastName}</span></li>
                                            <li><span className="Refresh"><Refresh className="loading"/> In Progress...</span></li>
                                            <Button color="facebook" size="sm" round onClick={() => showModal(order)}>View Order Details</Button>
                                        </ul>
                                    </div>
                               </GridItem> 
                    }) }
                </GridContainer>
              </Card>
            </div>
            <MizaplusFooter/>
        </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps) (Orders);
