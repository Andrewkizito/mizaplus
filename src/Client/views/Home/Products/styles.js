const styles = () => {
    return {
        Products: {
            height: "auto",
            padding: "40px 0.3rem",
            backgroundColor: "#fff",
            "& h5": {
                textAlign: "center",
                color: "#5a5a5a",
                "&:after": {
                    content: "' '",
                    display: "block",
                    height: "3px",
                    width: "100px",
                    backgroundColor: "#5a5a5a",
                    margin: "0.2rem auto"
                }
            }
        },
        Product: {
            height: "200px",
            width: "auto",
            objectFit: "scale-down"
        }
    }
}

export default styles;