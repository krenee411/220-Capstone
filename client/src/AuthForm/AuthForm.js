import React from 'react';

export default function AuthForm({submit}){

    return(
        <form>
            <div className=''>
            <input
            type={'text'}
            // value={username}
            name='username'
            placeholder='Username'
            />
            </div>
            <input
            type={'text'}
            // value={password}
            name='password'
            placeholder='Password'
            />
            <div>
                <button className=''>{submit}</button>
            </div>
        </form>
    )
}