import React,{useState} from 'react'

function AddOfficerForm(props){
    const initInputs = {firstName: props.firstName || " ", lastName: props.lastName || " ", status: props.status || " ", contact: props.contact || " "}
    const [inputs , setInputs] = useState(initInputs)

    function handleChange(e){
        const {name,value} = e.target
        setInputs( prevInputs => ({...prevInputs, [name]:value}))
    }

    function handleSubmit(e){
        e.preventDefault()
        props.submit(inputs , props._id)
        setInputs(initInputs)

    }
    return(
        <form onSubmit={handleSubmit} className="form">
            <input
            type = "text"
            name = "firstName"
            value = {inputs.firstName}
            onChange = {handleChange}
            placeholder="First Name"
            />

           <input
            type = "text"
            name = "lastName"
            value = {inputs.lastName}
            onChange = {handleChange}
            placeholder="Last Name"
            />
            <input
            type = "text"
            name = "status"
            value = {inputs.status}
            onChange = {handleChange}
            placeholder="Status"
            />

          <input
            type = "number"
            name = "contact"
            value = {inputs.contact}
            onChange = {handleChange}
            placeholder="Number"
            />
            <button className='button'>{ props.btnText }</button>

        </form>
    )
}
export default AddOfficerForm