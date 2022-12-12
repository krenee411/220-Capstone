import React, { useState, useContext, useEffect } from 'react'; 
import {UserContext} from '../Context/UserProvider';

function Profile() { 
    const { setUserState } = useContext(UserContext)
    const localState = localStorage.getItem('user')
    const [profilePic, setProfilePic] = useState(''); 
    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState(''); // 
    
    useEffect(() => {
        async function fetchProfilePic() {
            const user = JSON.parse(localStorage.getItem('user'))
            if(user){
                console.log(user)
                setProfilePic(user.profimg)
                setUsername(user.username)
                setEmail(user.email)
                setUserState(prevState => ({
                    ...prevState,
                    user
                  }))
            }
        }
        fetchProfilePic();
     }, [localState, setUserState])
    
    if (localState){
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
                <img src="https://p.kindpng.com/picc/s/24-248253_user-profile-default-image-png-clipart-png-download.png" alt="profile" width="250" height="200"/> 
                <h2>Username: username123</h2>
                <h2>Email: email123@hotmail.com</h2>
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