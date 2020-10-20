import React from 'react';

//Importing helper fucntions
import { makeStyles } from '@material-ui/core';

//Importing core components
import Footer from 'Client/components/Footer/Footer';
import { List,ListItem } from '@material-ui/core';
import { Favorite } from '@material-ui/icons';

//Importing styles
import styles from 'Client/assets/jss/material-kit-pro-react/components/footerStyle';

const useStyles = makeStyles(styles);

const MizaplusFooter = () => {
    const classes = useStyles();
    return (
        <Footer
          content={
            <div>
              <div className={classes.left}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="#"
                      target="_blank"
                      className={classes.block}
                    >
                      Mizaplus
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="#"
                      target="_blank"
                      className={classes.block}
                    >
                      About us
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="#"
                      className={classes.block}
                    >
                      Blog
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="#"
                      target="_blank"
                      className={classes.block}
                    >
                      Licenses
                    </a>
                  </ListItem>
                </List>
              </div>
              <div className={classes.right}>
                &copy; {1900 + new Date().getYear()} ,developed {" "}
                <Favorite className={classes.icon} /> by{" "}
                <a
                  href="#"
                  target="_blank"
                  className={classes.aClasses}
                >
                  Andrew Kizito
                </a>{" "}
                for a better web.
              </div>
            </div>
          }
        />
    )
}

export default MizaplusFooter;
