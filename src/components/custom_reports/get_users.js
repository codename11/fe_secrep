import {connect} from "react-redux";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useEffect } from 'react';

function GetUsers(props){
    console.log("GetUsers: ", props);
    
    useEffect(() => {
        
        props.get_users();
        //Mora array kao dodatni argument da se ne bi ponavljalo.
    }, []);

    const chart = ()=> {
        
        let list_users = props && props.users && props.users.list_users && props.users.list_users.length && props.users.list_users.length>0 ? props.users.list_users.map((item, i) => {
            
            /*let createdAtYear = new Date(item.created_at).getFullYear();
            let createdAtMonth = new Date(item.created_at).getMonth();
            let createdAtDay = new Date(item.created_at).getDate();
            
            let updatedAtYear = new Date(item.updated_at).getFullYear();
            let updatedAtMonth = new Date(item.updated_at).getMonth();
            let updatedAtDay = new Date(item.updated_at).getDate();

            item.createdAt = createdAtDay+"/"+createdAtMonth+"/"+createdAtYear;
            item.updatedAt = updatedAtDay+"/"+updatedAtMonth+"/"+updatedAtYear;
            */
            item.createdAt = new Date(item.created_at).getTime();
            item.updatedAt = new Date(item.updated_at).getTime();

            return item;

        }) : null;

        return <div className="chart1">
            <div>
                <h6 className="pagination">Users Chart</h6>
                <AreaChart
                    width={500}
                    height={400}
                    data={list_users}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="createdAt" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </div>
        </div>;

    };

    return chart();

}

const mapStateToProps = (state) =>{ 
    
    return ({
        users: state.users,
    });

};

export default connect(mapStateToProps, {})(GetUsers);