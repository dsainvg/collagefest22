// import React, { useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
const encoder = new TextEncoder();


function Signup() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const userid = event.target.userid.value;
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;
        const phoneNumber = event.target.phoneNumber.value;
        const collegeName = event.target.collegeName.value;
        const passwordStrength = checkPasswordStrength(password);
        if (passwordStrength < 3) {
            console.log(passwordStrength,password);
            alert("Password is weak. Please use a stronger password.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }
        
        let user = null;
        fetch('/passwordsdata.json') // Update the path to the correct location of the file
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            user = data.users.find(user => user.userid === userid);
            if(data.users.find(user => user.phone === phoneNumber)){
                alert("Phone Number already exists. Try Resetting Your Password. Your ID is :",user.userid);
                return;
            }
            if(data.users.find(user => user.email === email)){
                alert("Email already exists. Try Resetting Your Password. Your ID is :",user.userid);
                return;
            }
            let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
            if (!user) {
                user = users.find(user => user.userId === userid);
            }
            if (user) {
                alert("User already exists. Please try again with a different User ID.");
                return;}
            if(users.find(user => user.phone === phoneNumber)){
                    alert("Phone Number already exists. Try Resetting Your Password. Your ID is :",user.userid);
                    return;
                }
            if(users.find(user => user.email === email)){
                    alert("Email already exists. Try Resetting Your Password. Your ID is :",user.userid);
                    return;
                }
            const salt = saltgen();
            const hashedPassword = hash(hash(password, salt),"000");
            const userData = {
                userid: userid,
                name : name,
                email: email,
                hash : salt,
                password: hashedPassword,
                phone: phoneNumber,
                college: collegeName
            };
            users.push(userData);
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("userData", JSON.stringify(userData));
            window.location.href = '/Profile';
            
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert("Failed to fetch user data. Please try again later.");
        });

    }
    function sortByNthElement(arr, n) {
        let result = new Uint8Array(arr.length);
        let index = 0;
        let arrCopy = Array.from(arr.slice());
    
        for (let i = 0; i < arr.length; i++) {
            index = (index + n - 1) % arrCopy.length;
            result[i] = arrCopy.splice(index, 1)[0];
        }
    
        return result;
    }
    
    function saltgen() {
        let result = String.fromCharCode(Math.floor(Math.random() * 26) + (Math.random() < 0.5 ? 65 : 97));
        for (let i = 0; i < 7; i++) {
            result += String.fromCharCode(Math.floor(Math.random() * 90)+37);
        }
        return result;
    }
    
    function hash(password,salt){
        console.log("Salt: " + salt);
        let pass = salt + "$" + password;
        const passlen = pass.length;
        let hash1 ='';
        let codStr = encoder.encode(pass);
        let voila = codStr[0];
        let voil = 0;
        if (voila > 96) {voila-=70;}
        else {voila-=64;}
        for (let i = 0; i < passlen; i++) {
            voil = voila*128;
            voil += codStr[i];
            voila+=2;
            if(voila > 48){voila -= 20;}
            hash1 += String.fromCharCode((voil%90)+37);
            hash1 += String.fromCharCode(((Math.floor(voil/90)))+37);
        }
        
        let codedStrHash = encoder.encode(hash1);
        let hash2 = '';
        voil = 0;
        let sortedArrayHash = sortByNthElement(codedStrHash, (voila%5));
    
        for (let i = 0; i < sortedArrayHash.length; i++) {
            voil*=500;
            voil += sortedArrayHash[i];
            while(voil > 128){
                hash2 += String.fromCharCode((voil%90)+37);
                voil = Math.floor(voil/90);
            }
        }
        hash2 += String.fromCharCode((voil%90)+37);
        hash2 = "$" + salt +"$/$"+ hash2;
    
    return hash2;
    
    }
    
    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/)) strength++;
        if (password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
        return strength;
    }
    return (
        <div className="signup-container">
            <h1 className="signup-title">Sign Up</h1>
            <form onSubmit={handleSubmit} className="signup-form">  
                <input type="text" name="name" placeholder="Name" className="signup-input" required />
                <input type="text" name="userid" placeholder="Userid" className="signup-input" required />
                <input type="email" name="email" placeholder="Email" className="signup-input" required />
                <input type="password" name="password" placeholder="Password" className="signup-input" required />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" className="signup-input" required />
                <input type="number" name="phoneNumber" placeholder="Phone Number" className="signup-input" required />
                <input type="text" name="collegeName" placeholder="College Name" className="signup-input" required />
                <button type="submit" name="submitButton" className="signup-button">Sign Up</button>
            </form>
            <p className="signup-footer">Already have an account?</p>
            <div className="signup-footer-link">
                <Link to="/login" name="loginLink" className="button">Login</Link>
            </div>
        </div>);

}
export default Signup;