import {connect} from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useEffect } from 'react';

function GetDeliveries(props){
    console.log("props: ", props);
    
    useEffect(() => {
        
        props.get_deliveries();
        //Mora array kao dodatni argument da se ne bi ponavljalo.
    }, []);

    const chart = ()=> {
        
        let list_deliveries = props && props.deliveries && props.deliveries.list_deliveries && props.deliveries.list_deliveries.length && props.deliveries.list_deliveries.length>0 ? props.deliveries.list_deliveries.map((item, i) => {
            
            item.timeIn = new Date(item.time_in).getTime();
            item.timeOn = new Date(item.time_out).getTime();

            return item;

        }) : null;

        return <div className="chart1">
            <div>
                <h6 className="pagination">Deliveries Chart</h6>
                <LineChart
                    width={500}
                    height={300}
                    data={list_deliveries}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="comment" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="timeIn" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="timeOut" stroke="#82ca9d" />
                </LineChart>
            </div>
        </div>;

    };

    return chart();

}

const mapStateToProps = (state) =>{ 
    
    return ({
        deliveries: state.deliveries,
    });

};

export default connect(mapStateToProps, { 
    
})(GetDeliveries);