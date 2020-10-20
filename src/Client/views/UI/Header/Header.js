import React from 'react';

//Importing helper functions
import { makeStyles } from "@material-ui/core";

//Importing core components
import { List,ListItem,InputAdornment,TextField } from '@material-ui/core';
import Button from 'Client/components/CustomButtons/Button';
import Dropdown from 'Client/components/CustomDropdown/CustomDropdown';
import { Link } from "react-router-dom";
import Header from 'Client/components/Header/Header';
import { ShoppingCartOutlined,SearchOutlined,CardGiftcard,PersonOutline, Edit, ShoppingBasket, CreditCardOutlined, CallOutlined, InfoOutlined, ContactSupportOutlined } from '@material-ui/icons';

//Importing styles
import styles from 'Client/assets/jss/material-kit-pro-react/components/headerLinksStyle';

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1)
    },
}));

const MizaplusHeader = () => {
    const classes = useStyles();
    const classes2 = useStyles2();

    return (
        <Header
          fixed
          brand={<div className={classes.Brand}>
                <h4>Mizaplus</h4>
                <ShoppingCartOutlined/>
            </div>}
          links={
            <div className={classes.collapse}>
              <List className={classes.list + " " + classes.mlAuto}>
                <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    className={classes2.margin}
                    id="input-with-icon-textfield"
                    placeholder="Search Products"
                    margin="dense"
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchOutlined />
                        </InputAdornment>
                        ),
                    }}
                />
                <Button color="warning">Search</Button>
              </List>
              <List className={classes.list + " " + classes.mlAuto}>
                <ListItem className={classes.listItem}>
                    <Dropdown
                        noLiPadding
                        navDropdown
                        hoverColor={"warning"}
                        buttonText="Offers"
                        buttonProps={{
                            className: classes.navLink,
                            color: "transparent"
                        }}
                        buttonIcon={CardGiftcard}
                        dropdownList={[
                            <Link to="/login" className={classes.dropdownLink}>
                            <PersonOutline className={classes.dropdownIcons} /> Login
                            </Link>,
                            <Link to="/register" className={classes.dropdownLink}>
                            <Edit className={classes.dropdownIcons} /> Register
                            </Link>
                        ]}/>
                </ListItem>
                <ListItem className={classes.listItem} onClick={() => window.scrollTo({top: 0})}>
                   <Link to="/cart" className={classes.navLink}><ShoppingCartOutlined/> Cart</Link>
                </ListItem>
                <ListItem className={classes.listItem}>
                   <Dropdown
                        noLiPadding
                        navDropdown
                        hoverColor={"warning"}
                        buttonText="Help"
                        buttonProps={{
                            className: classes.navLink,
                            color: "transparent"
                        }}
                        buttonIcon={ContactSupportOutlined}
                        dropdownList={[
                            <Link to="/about-us" className={classes.dropdownLink}>
                              <InfoOutlined className={classes.dropdownIcons}/> About Us
                            </Link>,
                            <Link to="/support" className={classes.dropdownLink}>
                              <CallOutlined className={classes.dropdownIcons}/> Call
                            </Link>,
                            <Link to="/register" className={classes.dropdownLink}>
                              <ShoppingBasket className={classes.dropdownIcons} /> Track Order
                            </Link>,
                            <Link to="/register" className={classes.dropdownLink}>
                              <CreditCardOutlined className={classes.dropdownIcons} /> Payment Methods
                            </Link>
                        ]}/>
                </ListItem>
              </List>
            </div>
          }
        />
    )
}

export default MizaplusHeader;
