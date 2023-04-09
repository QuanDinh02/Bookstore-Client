import DashboardChart from "./DashboardChart";
import './Dashboard.scss';
import { HiArchiveBox } from 'react-icons/hi2';
import { FaUsers, FaBook } from 'react-icons/fa';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { getDashboardInfo } from "../../Services/adminServices";
import React from "react";
import { TailSpin } from 'react-loader-spinner';

const Dashboard = (props) => {
    const date = new Date();
    const [data, setData] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);
    const { setTitle } = props;

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const fetchData = async (date) => {
        let result = await getDashboardInfo(date);
        if (result && result.EC === 0) {
            console.log(result.DT);
            setData(result.DT);
        }
    }

    React.useEffect(() => {
        setTitle('Dashboard');
        let date = `${day}/${month}/${year}`;
        fetchData(date);
    }, []);

    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <>
            {isLoading === true ?
                <TailSpin
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass="d-flex justify-content-center align-items-center tail-spin"
                    visible={true}
                />
                :
                <div className="dashboard-container">
                    <div className="statis d-flex justify-content-center gap-5">
                        <div className="statis-item align-items-center d-flex justify-content-center gap-5">
                            <div><RiMoneyDollarCircleFill className="icon green-icon" /></div>
                            <div className="content">
                                <span className="statis-title">Today Sale</span>
                                <span className="statis-value green-icon">{data?.today_sale} đ</span>
                            </div>
                        </div>
                        <div className="statis-item align-items-center d-flex justify-content-center gap-5">
                            <div><HiArchiveBox className="icon orange-icon" /></div>
                            <div className="content">
                                <span className="statis-title">Today Orders</span>
                                <span className="statis-value orange-icon">{data?.orders_count}</span>
                            </div>
                        </div>
                        <div className="statis-item align-items-center d-flex justify-content-center gap-5">
                            <div><FaUsers className="icon blue-icon" /></div>
                            <div className="content">
                                <span className="statis-title">Total Users</span>
                                <span className="statis-value blue-icon">{data?.users_count}</span>
                            </div>
                        </div>
                        <div className="statis-item align-items-center d-flex justify-content-center gap-5">
                            <div><FaBook className="icon red-icon" /></div>
                            <div className="content">
                                <span className="statis-title">Total Books</span>
                                <span className="statis-value red-icon">{data?.books_count}</span>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-chart">
                        <DashboardChart
                            year={year}
                        />
                    </div>
                </div>
            }
        </>

    )
}

export default Dashboard;