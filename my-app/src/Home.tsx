import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <p></p>
            <div>
                新規登録は<Link to={`/register/`}>こちら</Link>
            </div>
        </>
    );
};

export default Home;
