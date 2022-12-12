import React, { useState, useContext, useEffect } from 'react'; 
import {UserContext} from '../Context/UserProvider';

function Profile() { 
    const { user } = useContext(UserContext)
    const [profilePic, setProfilePic] = useState(''); 
    const [username, setUsername] = useState(user.username); 
    const [email, setEmail] = useState(user.email); // 
    
    useEffect(() => {
        async function fetchProfilePic() {
            const src = await user.profimg
            setProfilePic(src)
        }
        fetchProfilePic();
     }, [user])
    
    if (user){
        return (
            <div>
                <h1>Your Profile</h1>
                <img src={profilePic} alt="profile" width="250" height="200"/> 
                <h2>Username: {username}</h2>
                <h2>Email: {email}</h2>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Your Profile</h1>
                <img src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc=" alt="Girl in a jacket" width="250" height="150"/> 
            </div>
        )
    }
    

    
    
        
       
             
        
        // <form> <label htmlFor="profilePic">Change Profile Pic</label> 
        // <input type="text" placeholder="profilepic"/> 
        // <label htmlFor="username">Change Username</label> 
        // <input type="text" placeholder="username"/> 
        // <label htmlFor="email">Change Email</label>
        // <input type="email"/> 
        // <label htmlFor="password">Change Password</label> 
        // <input type="password"/> </form> </> : <h1>hello</h1>
    
    

    }     
    
     
       
    export default Profile;