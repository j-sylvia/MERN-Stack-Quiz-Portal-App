import React, {useState} from 'react';
import axios from 'axios';

const API_URL = "http://localhost:4000/users";

export default function Createuser(){
    const [users,setUsers] = useState([]);
    const [newUser,setNewUser] = useState({username:'', userpassword:'', useremail:'', userphone:''});

    const createPost = async ()=>{
        try{
            const createdUser = await createUser(newUser);
            setUsers([...users,createdUser]);
            setNewUser({username:'',userpassword:'',useremail:'', userphone:''});
        }
        catch(error){
            console.error("Error creating user:", error);  
        }
    };

    async function createUser (userData){
        try{            
            const response = await axios.post(API_URL, userData);
            return response.data;
        }
        catch(error){
            console.error("Error creating user:", error);
            return null;  
        }
    };

    //Render the fetched data
    return (
        <div>
            <input type="text" value={newUser.username} onChange={(e)=>setNewUser({...newUser, username:e.target.value})} placeholder='UserName'/>
            <br />
            <input type="password" value={newUser.userpassword} onChange={(e)=>setNewUser({...newUser, userpassword:e.target.value})} placeholder='Password'/>
            <br />
            <input type="email" value={newUser.useremail} onChange={(e)=>setNewUser({...newUser, useremail:e.target.value})} placeholder='Email'/>
            <br />
            <input type="number" value={newUser.userphone} onChange={(e)=>setNewUser({...newUser, userphone:e.target.value})} placeholder='Phone'/>
            <br />
            <button onClick={createPost}>Create User</button>
        </div>
    );
}
