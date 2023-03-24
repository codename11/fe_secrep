import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Component } from 'react'
import {connect} from "react-redux";
import { list_work_organizations } from "../../actions/work_organizations/workOrganizationsActions";
import { update_work_organization } from "../../actions/work_organizations/workOrganizationsActions";
import UpdateWorkOrgs from '../work_organizations/update_work_organization';
import { modalShow } from "../../actions/modalActions";
import { modalHide } from "../../actions/modalActions";
import CustomModal from '../subcomponents/CustomModal';
import { select_option } from "../../actions/custom_actions/selectOptionActions";
import DeleteWorkOrgs from '../work_organizations/delete_work_organization';
import PropTypes from "prop-types";
import CreateWorkOrgs from '../work_organizations/create_work_organization';
import Accordion from 'react-bootstrap/Accordion';
import { useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import {setPageNumber} from "../../actions/custom_reports/customReportsActions";

function WorkOrgs(props){

    const { list_work_organizations } = props;
    useEffect(() => {
            
        list_work_organizations();
        //Mora array kao dodatni argument da se ne bi ponavljalo.
    }, [list_work_organizations]);

    const firstPage = (pagination) => {
        props.setPageNumber(1, 0);//Poziva se sa props u nekoj funkciji, dok u useEffect bez props-a.
        props.list_work_organizations({page: 1});      
    }


    const lastPage = (pagination) => {

        let last = pagination.last_page;
        props.list_work_organizations({page: last});
        props.setPageNumber(last, last-1);

    }

    const prevPage = (pagination) => {

        let last = pagination.last_page;
        let index = pagination.index;

        if(index>0){
            index = index-1;
        }
        else if(index<=0){
            index = last-1;
        }
        props.list_work_organizations({page: index+1});
        props.setPageNumber(index+1, index);
        
    }

    const nextPage = (pagination) => {

        let first = 0;
        let last = pagination.last_page;
        let index = pagination.index;

        if(index+1<last){
            index = index+1;
        }
        else{
            index = first;
        }
        
        props.list_work_organizations({page: index+1});
        props.setPageNumber(index+1, index);

    }

    const setActive = (e, i) => {

        props.setPageNumber(e, i);
        props.list_work_organizations({page: i+1});

    }

    const handleChange = (event) => {

        let target = event.target;

        if(target.value){
            let obj = JSON.parse(target.value);

            let data = {
                value: obj.id,
                name: obj.name,
                purpose: this.props.modal_purpose,
            };
            
            props.select_option(data);
        }

    }

    let workOrgs = props.work_organizations.list_work_organizations;
    let workOrg_thead = <tr>
        <th>name</th>
        <th>created_at</th>
        <th>updated_at</th>
        <th>actions</th>
    </tr>;

    let thead = <thead>{workOrg_thead}</thead>;

    let workOrgs_tbody = workOrgs ? workOrgs.map((item, i) => {

        let x1 = new Date(item.created_at);
        let d1Day = x1.getDate();
        let d1Month = x1.getMonth();
        let d1Year = x1.getFullYear();
        let created_at = d1Day+"/"+d1Month+"/"+d1Year;

        let x2 = new Date(item.updated_at);
        let d2Day = x2.getDate();
        let d2Month = x2.getMonth();
        let d2Year = x2.getFullYear();
        let updated_at = d2Day+"/"+d2Month+"/"+d2Year;

        return <tr key={item.id}>
        <td>{item.name}</td>
        <td>{created_at}</td>
        <td>{updated_at}</td>
        <td className="grid-container">
            
            {props && props.auth && props.auth.access_token ? 
            <Button variant="outline-warning m-1" itemID={item.id} onClick={() => props.modalShow([true, item.id, "update"])}>Update</Button>
            : null}
            
            {props && props.auth && props.auth.access_token ? 
            <Button variant="outline-danger m-1" itemID ={item.id} onClick={() => props.modalShow([true, item.id, "delete"])}>Delete</Button>
            : null}

        </td>
        </tr>

    }) : null;

    let tbody = <tbody>{workOrgs_tbody}</tbody>;

    let workOrgs_table = <Table striped bordered hover size="sm" responsive="md">
        {thead}
        {tbody}
    </Table>

    let modalHeaderText = "";
    let modalBodyText = "";
    let modalFooterText = "";
    let form = null;
    let work_organizationList = props && props.work_organizations && props.work_organizations.list_work_organizations ? props.work_organizations.list_work_organizations : null;

    let option2 = [<option key={""} value={""}>None</option>];
    let work_Orgs = work_organizationList ? work_organizationList.map((item, i) => {
        let obj = JSON.stringify({id: item.id, name: item.name});
        return <option key={item.id} value={obj}>{item.name}</option>
    }) : null;
    
    if(work_Orgs && work_Orgs.length > 0){

        option2.push(...work_Orgs);

    }

    if(props && props.modal_purpose){

        if(props.modal_purpose === "delete"){

            modalHeaderText = <h5>Delete work organization</h5>;
            modalFooterText = <p className="foot1">You are about to delete</p>;

            form = props && props.modal_purpose && props.modal_purpose==="delete" ? <DeleteWorkOrgs sec_id={props.auth.user.id}/> : null;

        }

        if(props.modal_purpose === "update"){

            modalHeaderText = <h5>Update work organization</h5>;
            modalFooterText = <p className="foot1">You are about to update</p>;

            form = props && props.modal_purpose && props.modal_purpose==="update" ? <UpdateWorkOrgs sec_id={props.auth.user.id}/> : null;

        }

    }

    let myModal = props && props.auth && props.auth.access_token ? 
        <CustomModal modalheadertext={modalHeaderText} modalbodytext={modalBodyText} modalfootertext={modalFooterText} form={form} show={props.modalState} purpose={props.modal_purpose} onHide={() => props.modalHide([false])}/> 
    : null;
    console.log("workorg: ", props);

    let linkovi = props && props.work_organizations && props.work_organizations.linkovi ? <div dangerouslySetInnerHTML={{ __html: props.work_organizations.linkovi }} /> : null;
    let pagination = props && props.pagination ? props.pagination : null;
    console.log("pagination: ", pagination);

    const setVisiblePages = (paginacija) =>{
        
        let pageIndex = null;
        let last_page = null;
        let siblings = 1;
        
        pageIndex = pagination && pagination.index ? pagination.index : 0;
        last_page = paginacija && paginacija.last_page && paginacija.last_page ? paginacija.last_page : null;
        
        let myPages = [];

        if(pageIndex===0 && pageIndex<=last_page && pageIndex+siblings<=last_page && pageIndex+(siblings*2)<=last_page){
            
            myPages = [
                <Pagination.Item key={pageIndex} active={true} page={pageIndex+1} onClick={(e)=>{setActive(e, pageIndex)}}>
                    {pageIndex+1}
                </Pagination.Item>,
    
                <Pagination.Item key={pageIndex+siblings} page={pageIndex+1+siblings} onClick={(e)=>{setActive(e, pageIndex+siblings)}}>
                    {pageIndex+1+siblings}
                </Pagination.Item>,
    
                <Pagination.Item key={pageIndex+(2*siblings)} page={pageIndex+1+(2*siblings)} onClick={(e)=>{setActive(e, pageIndex+(siblings*2))}}>
                    {pageIndex+1+(2*siblings)}
                </Pagination.Item>,

                <Pagination.Ellipsis key={"elip"+(pageIndex+3)}/>].filter(Boolean);

        }
        
        if(pageIndex>=0 && pageIndex<=last_page && pageIndex-siblings>=0 && pageIndex+siblings<=last_page){
            
            let ellipsis1 = pageIndex-siblings> 0 ? <Pagination.Ellipsis key={"elip"+(pageIndex+3)}/> : null;
            let ellipsis2 = (pageIndex+siblings)<last_page-1 ? <Pagination.Ellipsis key={"elip"+(pageIndex+4)}/> : null;
            myPages = [

                ellipsis1,

                <Pagination.Item key={pageIndex-siblings} page={pageIndex+1-siblings} onClick={(e)=>{setActive(e, pageIndex-siblings)}}>
                    {pageIndex+1-siblings}
                </Pagination.Item>,
    
                <Pagination.Item key={pageIndex} active={true} page={pageIndex+1} onClick={(e)=>{setActive(e, pageIndex)}}>
                    {pageIndex+1}
                </Pagination.Item>,
    
                <Pagination.Item key={pageIndex+siblings} page={pageIndex+1+siblings} onClick={(e)=>{setActive(e, pageIndex+siblings)}}>
                    {pageIndex+1+siblings}
                </Pagination.Item>,

                ellipsis2].filter(Boolean);

        }
        
        if(pageIndex+1===last_page && pageIndex-(2*siblings)>=0){

            myPages = [
                <Pagination.Ellipsis key={"elip"+(pageIndex+3)}/>,

                <Pagination.Item key={pageIndex-(2*siblings)} page={pageIndex+1-(2*siblings)} onClick={(e)=>{setActive(e, pageIndex-(siblings*2))}}>
                    {pageIndex+1-(2*siblings)}
                </Pagination.Item>,
    
                <Pagination.Item key={pageIndex-siblings} page={pageIndex+1-siblings} onClick={(e)=>{setActive(e, pageIndex)}}>
                    {pageIndex+1-siblings}
                </Pagination.Item>,
    
                <Pagination.Item key={pageIndex} active={true} page={pageIndex+1} onClick={(e)=>{setActive(e, pageIndex-siblings)}}>
                    {pageIndex+1}
                </Pagination.Item>].filter(Boolean);

        }

        if(pageIndex>=0 && pageIndex<=last_page && last_page<=3){
            
            let pages = [];
            for(let i=0;i<last_page;i++){

                pages.push(
                    <Pagination.Item key={i} active={i===pageIndex} page={i+1} onClick={(e)=>{setActive(e, i)}}>
                        {i+1}
                    </Pagination.Item>
                );
                
            }
            myPages = [...pages].filter(Boolean)

        }
        
        return myPages;

    };

    return (
        <div>
            <Accordion defaultActiveKey="0">

                <Accordion.Item eventKey="0">
                    <Accordion.Header>Create new work organization</Accordion.Header>
                    <Accordion.Body>

                        <CreateWorkOrgs/>

                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>List work organizations</Accordion.Header>
                    <Accordion.Body>
                        {workOrgs_table}
                        
                        <Pagination className="pagination">
                            <Pagination.First onClick={()=>firstPage(pagination)}/>
                            <Pagination.Prev onClick={()=>prevPage(pagination)}/>
                                {setVisiblePages(pagination)}
                            <Pagination.Next  onClick={()=>nextPage(pagination)}/>
                            <Pagination.Last  onClick={()=>lastPage(pagination)}/>
                        </Pagination>

                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>
            {myModal}
        </div>
    )
}

list_work_organizations.propTypes = {
    list_work_organizations: PropTypes.func.isRequired,
};

modalShow.propTypes = {
    modalShow: PropTypes.func.isRequired,
};
  
modalHide.propTypes = {
    modalHide: PropTypes.func.isRequired,
};

select_option.propTypes = {
    select_option: PropTypes.func.isRequired,
};

update_work_organization.propTypes = {
    update_work_organization: PropTypes.func.isRequired,
};

setPageNumber.propTypes = {
    setPageNumber: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
    
    return ({
        auth: state.auth.auth,
        work_organizations: state.list_work_organizations,
        modalState: state.modalState.modalState,
        tabKey: state.key.tabKey,
        modal_purpose: state.modalState.modal_purpose,
        select_option: state.form.select_option,
        pagination: state.list_work_organizations.pagination
    });

};

export default connect(mapStateToProps, { 
    list_work_organizations,
    modalShow,
    modalHide,
    select_option,
    setPageNumber
})(WorkOrgs);