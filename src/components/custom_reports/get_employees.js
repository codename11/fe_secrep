import {connect} from "react-redux";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { useEffect } from 'react';

function GetEmployees(props){
    //console.log("GetEmployees: ", props);
    
    useEffect(() => {
        
        props.get_employees();
        //Mora array kao dodatni argument da se ne bi ponavljalo.
    }, []);

    const chart = ()=> {
        
        let list_employees = props && props.employees && props.employees.list_employees && props.employees.list_employees.length && props.employees.list_employees.length>0 ? props.employees.list_employees.map((item, i) => {
            
            item.createdAt = new Date(item.created_at).getTime();
            item.updatedAt = new Date(item.updated_at).getTime();

            return item;

        }) : null;

        return <div className="chart1">
            <div>
                <h6 className="pagination">Employees Chart</h6>
                <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={600} data={list_employees}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="firstName" />
                    <PolarRadiusAxis />
                    <Radar name="Employees" dataKey="id" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                </RadarChart>
            </div>
        </div>;

    };

    return chart();

}

const mapStateToProps = (state) =>{ 
    
    return ({
        employees: state.employees,
    });

};

export default connect(mapStateToProps, { 
    
})(GetEmployees);