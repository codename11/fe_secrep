import {connect} from "react-redux";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useEffect } from 'react';

function GetUsers(props){
    
    const { get_users } = props;
    useEffect(() => {
        
        get_users();
        //Mora array kao dodatni argument da se ne bi ponavljalo.
    }, [get_users]);

    const chart = ()=> {
        
        let list_users = props && props.users && props.users.list_users && props.users.list_users.length && props.users.list_users.length>0 ? props.users.list_users.map((item, i) => {

            item.createdAt = new Date(item.created_at).getTime();
            item.updatedAt = new Date(item.updated_at).getTime();

            return item;

        }) : null;

        if(list_users){

            return <div className="chart1">
                <div>
                    <h6 className="pagination">Users Chart</h6>
                    <AreaChart
                        width={500}
                        height={400}
                        data={list_users ? list_users : ""}
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

        }
        else{
            return "";
        }
        
    };

    return chart();

}

const mapStateToProps = (state) =>{ 
    
    return ({
        users: state.users,
    });

};

export default connect(mapStateToProps, {})(GetUsers);