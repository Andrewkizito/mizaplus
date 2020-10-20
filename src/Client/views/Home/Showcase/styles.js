const styles = () => { 
    return {
        Showcase: {
            backgroundColor: "#fff",
            marginTop: "85px",
            display: "flex",
            flexFlow: "row",
            alignItems: "center",
            justifyContent: "center"
        },
        SliderImage: {
            height: "300px",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "0.4rem",
            "& img": {
                height: "100%",
                objectFit: "cover",
                width: "100%",
                objectPosition: "50% 50%"
            }
        }
    }
}

export default styles;
