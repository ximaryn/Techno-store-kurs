import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Реєстрація успішна!");
            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("User signed up: ", result.user);
            navigate("/");
        } catch (error) {
            setError("Помилка реєстрації через Google.");
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSignUp}>
                <h2>Реєстрація</h2>
                {error && <p className="error-message">{error}</p>}
                <input
                    type="email"
                    placeholder="Введіть email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Введіть пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Зареєструватися</button>
            </form>
            <button className="google-signin-btn" onClick={handleGoogleSignUp}>
                Зареєструватися через Google
            </button>
        </div>
    );
};

export default SignUp;
