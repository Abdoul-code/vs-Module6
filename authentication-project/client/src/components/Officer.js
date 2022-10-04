import React,{useState} from 'react'
import AddOfficerForm from './AddOfficerForm'

function Officer(props){
    const {firstName , lastName, status, contact , Email,_id} = props
    const [editToggle , setEditToggle] = useState(false)
    return(
        <div className='officer'>
            { !editToggle ?
            <>
                    <h2>Fistname: {firstName}</h2>
                    <h2>Lastname: {lastName}</h2>
                    <h3>Status: {status}</h3>
                    <h3>contact: {contact}</h3>
                    <h3>Email: {Email}</h3>
                    <button className='delete-btn'
                    onClick={()=>props.deleteOfficer(_id)}>
                        Delete
                    </button>
                    <button 
                    className='edit-btn'
                    onClick={()=>setEditToggle(prevToggle => !prevToggle)}
                    >
                        Edit
                    </button>
            </>
                :
                <>
                    <AddOfficerForm
                    firstName={firstName}
                    lastName={lastName}
                    status={status}
                    _id = {_id}
                    contact={contact}
                    btnText = "SUBMIT EDIT"
                    submit = {props.editOfficer}
                    />
                    <button onClick={()=>setEditToggle(prevToggle => !prevToggle)}>
                        Close
                    </button>
                </>
            }

        </div>

    )
}
export default Officer