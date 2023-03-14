import { Link, useHistory, useRouteMatch } from "react-router-dom";

const AdminHomepage = () => {

    const { url } = useRouteMatch();
    const history = useHistory();

    const handleTest = () => {
        history.push(`${url}/manager`);
    }

    return (
        <>
            <div>
                Admin Homepage
            </div>
            <ul>
                <li>
                    {/* <Link to={{
                        pathname: `${url}/manager`,
                        state: { id: 'test', name: 'Quan' }
                    }}
                    >
                        Manager
                    </Link> */}

                    <button className="btn btn-warning" onClick={handleTest}>Manager</button>
                </li>
            </ul>
        </>


    )
}

export default AdminHomepage;