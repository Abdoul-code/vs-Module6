import React,{useState , useEffect} from 'react'
import axios from 'axios'
import { Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Auth from './components/Auth.js'
import Officer from './components/Officer'
import AddOfficerForm from './components/AddOfficerForm'
import './css/styles.css'

function App(){
    const [security , setSecurity] = useState([])
    return(
        <div className='app'>
            <Navbar />
            <Routes>
                <Route 
                path="/"
                element = {<Auth/>}
                />
                <Route 
                path="/profile"
                element = {<Profile/>}
                />
               <Route 
                path="/officer"
                element = {<Officer/>}
                />

            </Routes>
        </div>
    )
//Get Officer
    function getOfficer(){
        axios.get("/security")
        .then(res => setSecurity(res.data))
        .catch(err => console.log(err))
    }
//Post Officer
    function addOfficer(newOfficer){
        axios.post("/security", newOfficer)
        .then(res => {
            setSecurity(prevSecurity => [...prevSecurity,res.data])
        })
        .catch(err => console.log(err))
    }
//Delete Officer
    function deleteOfficer(officerId){
        axios.delete(`/security/${officerId}`)
        .then(res => {
            setSecurity(prevSecurity => prevSecurity.filter(offic => offic._id !== officerId))
        })
        .catch(err => console.log(err))
    }
// Update Officer
    function editOfficer(updates , officerId){
        axios.put(`/security/${officerId}`, updates)
        .then(res =>{
            setSecurity(prevSecurity => prevSecurity.map(agents => agents._id !== officerId ? agents : res.data ))
        })
        .catch(err => console.log(err))

    }


    useEffect(()=>{
        getOfficer()
    }, [])
    return(
        <div>
            <div className='officer-container'>
                <AddOfficerForm
                submit = {addOfficer}
                btnText = "SUBMIT DOCUMENTS"
                />
              {security.map(agent => <Officer 
              {...agent} 
              key={agent.firstName}
              deleteOfficer = {deleteOfficer}
              editOfficer = {editOfficer}
              />)}
            </div>
        </div>
    )
}



export default App