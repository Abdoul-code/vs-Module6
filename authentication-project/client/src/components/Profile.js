import React from 'react'
import AddOfficerForm from './AddOfficerForm'

export default function Profile(){
    return(
        <div className='profile'>
             <h1>Welcome @{username}!</h1>
             <h3>Add Security Officer</h3>
             <AddOfficerForm/>
             <h3>Your Officer</h3>

        </div>
    )
}