/*eslint-disable*/
import React,{ useState,useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// Importing helper functions
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// @material-ui/icons
import { LocalShipping,VerifiedUser,ContactSupportOutlined } from "@material-ui/icons";

//Importing core components
import { Select,FormControl,MenuItem } from "@material-ui/core";
import Accordion from "Client/components/Accordion/Accordion";
import Button from "Client/components/CustomButtons/Button";
import GridContainer from "Client/components/Grid/GridContainer.js";
import GridItem from "Client/components/Grid/GridItem.js";
import InfoArea from "Client/components/InfoArea/InfoArea.js";
import CardBody from "Client/components/Card/CardBody.js";
import Slider from "react-slick";
import Info from "Client/components/Typography/Info";
import Danger from "Client/components/Typography/Danger";
import { Link } from "react-router-dom";


import productStyle from "Client/assets/jss/material-kit-pro-react/views/productStyle.js";
import { existenceCheck } from "Client/store/Actions/ActionTypes";

//Importing icons
import { ShoppingCartOutlined } from "@material-ui/icons";

const useStyles = makeStyles(productStyle);

const ProductPage = (props) => {
  const [product, setProduct] = useState(null);
  const [ similarProducts,setSimilar ] = useState(null);
  const [ amountSelect,selectAmout ] = useState(0);
  const [ amountAvailable,setAmounts ] = useState(null); 

  const settings = {
    dots: true, 
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true
  };
   
  const { id } = props.match.params;

  useEffect(() => {
    if(props.Products){
        const products = props.Products;
        const filtered = products.filter(pdt => pdt.id === id)[0];
        setProduct(filtered);
        const similar = products.filter(pdt => {
          if(pdt.id !== filtered.id){
            return pdt;
          }
        });
        let amounts = [];
        
        for(let index = 0;index < filtered.inStock + 1;index ++){
          amounts.push(index);
        }
        setAmounts(amounts);
        setSimilar(similar.splice(0,4));
    }
  },[id,props.Products]);

  const AddToCart = () => {
    const cartProduct = { id: product.id,name: product.name,vendor: product.vendor,image: product.image,price: product.price,quantity: amountSelect }
    props.PutToCart(cartProduct);
  }

  const updateProduct = (id) => {
    if(props.Products){
        const products = props.Products;
        const filtered = products.filter(pdt => pdt.id === id)[0];
        setProduct(filtered);
        const similar = products.filter(pdt => {
          if(pdt.id !== filtered.id){
            return pdt;
          }
        });
        window.scrollTo({top: 0});
        setSimilar(similar.splice(0,4));
    }
  }

  const classes = useStyles();
  return (
    <div className={classes.productPage}>
      <div className={classNames(classes.section)}>
        <div className={classes.container}>
          <div className={classNames(classes.main, classes.mainRaised)} id="product">
           { product && <GridContainer>
              <GridItem md={6} sm={6}>
                <div className={classes.imageBox}>
                  <img src={product.image}/>
                </div>
              </GridItem>
              <GridItem md={6} sm={6}>
                <h2 className={classes.title} id="pdt">{product.name}</h2>
                <h3 className={classes.mainPrice}><small>€</small>{product.price}</h3>
                <Accordion
                  active={0}
                  activeColor="rose"
                  collapses={[
                    {
                      title: `About ${product.name}`,
                      content: (
                        <div>
                          <p>{product.description}</p>
                          {product.inStock === 0 ? <Danger variant="h5">Out Of Stock</Danger> : <Info variant="h5">{product.inStock} Left In Stock</Info>}
                        </div>
                      )
                    }
                  ]}
                />
                <GridContainer className={classes.pickSize}>
                  <GridItem md={12} sm={12}><label>Pick Amount</label></GridItem>
                  <GridItem md={8} sm={8}>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                      >
                        <Select
                          variant="outlined"
                          style={{padding: "0.4rem",fontSize: "30px"}}
                          MenuProps={{
                            className: classes.selectMenu
                          }}
                          classes={{
                            select: classes.select
                          }}
                          defaultValue={0}
                          value={amountSelect}
                          onChange={event => selectAmout(event.target.value)}
                          inputProps={{
                            name: "amountSelect",
                            id: "amount-select"
                          }}
                        >
                         { amountAvailable && amountAvailable.map(amount => 
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value={amount}
                          >
                            {amount}
                          </MenuItem>) }
                        </Select>
                      </FormControl>
                  </GridItem>
                  <GridItem md={4} sm={4} style={{display: "flex",flexFlow: "row",alignItems: "center",justifyContent: "center"}}>
                    <Button color="warning" disabled={amountSelect === 0 && true} onClick={() => AddToCart()}>
                      Add to Cart &nbsp; <ShoppingCartOutlined />
                    </Button>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer> }
          </div>
          <div className={classNames(classes.features,classes.textCenter)}>
            <GridContainer>
              <GridItem md={4} sm={4}>
                <InfoArea
                  title="Quick Delivery"
                  description="All purchases are delivered safely as fast as possible. Be sure to get your purchases in one piece since we have a very wide team of experts to get the work done."
                  icon={LocalShipping}
                  iconColor="info"
                  vertical
                />
              </GridItem>
              <GridItem md={4} sm={4}>
                <InfoArea
                  title="Refund Policy"
                  description="We rarely encounter issues of supplying faulty equipment to our clients but all incase that happens, we don't push you out. We try to settle the issues with a refund."
                  icon={VerifiedUser}
                  iconColor="success"
                  vertical
                />
              </GridItem>
              <GridItem md={4} sm={4}>
                <InfoArea
                  title="Technical Support"
                  description="We offer full technical support on all our products since most of our clients prefer to worry less about the technical side of things. Be sure to contact us as soon as possible."
                  icon={ContactSupportOutlined}
                  iconColor="rose"
                  vertical
                />
              </GridItem>
            </GridContainer>
          </div>
          <div className={classes.relatedProducts}>
            { window.innerWidth > 600 ?
              <h3 className={classNames(classes.title, classes.textCenter)}>
                You may also be interested in:
              </h3> : 
              <h4 className={classNames(classes.title, classes.textCenter)}>
                You may also be interested in:
              </h4> }
                  { (similarProducts && window.innerWidth > 600) && 
                     <Slider {...settings}>
                     { similarProducts.map(pdt => {
                        return <div key={pdt.id}>
                                <Link to="#pdt" onClick={() => updateProduct(pdt.id)}>
                                    <div>
                                        <div className={classes.productCard}>
                                            <img src={pdt.image} alt="cardProduct" className={classes.pdtImage}/>
                                            <CardBody>
                                            <h4 className={classes.cardTitle}>{pdt.name}</h4>
                                            </CardBody>
                                        </div>
                                    </div>
                                </Link>
                               </div>
                            })}
                     </Slider>
                  } 
                  { (similarProducts && window.innerWidth <= 600) && 
                    <GridContainer>
                      { similarProducts.map(pdt => {
                      return <Link to="#pdt" onClick={() => updateProduct(pdt.id)}>
                              <div>
                                <div className={classes.productCard}>
                                  <img src={pdt.image} alt="cardProduct" className={classes.pdtImage}/>
                                  <CardBody>
                                    <h4 className={classes.cardTitle}>{pdt.name}</h4>
                                  </CardBody>
                                </div>
                              </div>
                            </Link>
                      })}
                    </GridContainer>
                 } 
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
    return {
        Products: state.Products,
        Cart: state.Cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        PutToCart: (cartItem) => dispatch(existenceCheck(cartItem))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ProductPage));
