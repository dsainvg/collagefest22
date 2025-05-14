import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
const encoder = new TextEncoder();


function Login() {
    const navigate = useNavigate();
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
    const handleSubmit = (event) => {
        event.preventDefault();
        const userid = event.target.UserId.value;
        console.log(userid)
        const password = event.target.password.value;
        let user = 0;
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
            if (!user) {
                const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
                console.log(users);
                user = users.find(user => user.userid === userid);
            }

            console.log(user);
            if (!user) {
                alert("User not found.");
                return;
            }
            const hashedPassword = hash(hash(password, user.hash),"000");
            console.log(hashedPassword);
            if (user.password !== hashedPassword) {
                alert("Incorrect Password");
                return;
            } else {
                localStorage.setItem('userData', JSON.stringify(user));
                navigate('/Profile');       
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert("Failed to fetch user data. Please try again later.");
        });
    
    };

    return (
        <div>
            <div className="login-container">
                <h1 className="login-heading">Login</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    <input type="UserId" name="UserId" placeholder="UserId" required className="login-input" />
                    <input type="password" name="password" placeholder="Password" required className="login-input" />
                    <button type="submit" className="button">Login</button>
                </form>
                <p className="signup-info">Don't have an account?</p>
                <div className='signup-link-container'>
                    <Link to="/Signup" className="button">Sign up here</Link>
                </div>
                <p className="forgot-password">Forgot your password?</p>
                <div className='reset-password-link-container'>
                    <Link to="/Resetpassword" className="button">Reset Password</Link>
                </div>
            </div>
        </div>
    );
}
export default Login;