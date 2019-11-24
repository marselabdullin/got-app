import React from 'react';
import './errorMessage.css';
import img from './error.jpg';

const ErrorMessage = () => {
    return (
        <div>
            <img src={img} alt='error'></img>
            <span className='error'>Something goes wrong</span>
        </div>
    ) 
}

export default ErrorMessage;