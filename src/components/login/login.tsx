import React, { useState } from "react";
import "./login.css";
import Button from "../button/button.tsx";
import InputComponent from "../input/input.tsx";
import Link from "../link/link.tsx";

type LoginProps = object;

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const validateEmail = (email: string): boolean => {
    return email.includes("@");
  };

  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError("Bitte eine gültige E-Mail-Adresse eingeben.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (!validatePassword(value)) {
      setPasswordError(
        "Passwort muss mindestens 8 Zeichen, Groß- und Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid) {
      setEmailError("Bitte eine gültige E-Mail-Adresse eingeben.");
    }

    if (!isPasswordValid) {
      setPasswordError(
        "Passwort muss mindestens 8 Zeichen, Groß- und Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten."
      );
    }

    if (isEmailValid && isPasswordValid) {
      console.log("Email:", email);
      console.log("Password:", password);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login into 2Do</h2>
        <div className="input-group">
          <InputComponent
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            error={emailError}
          />
        </div>
        <div className="input-group">
          <InputComponent
            value={password}
            onChange={handlePasswordChange}
            placeholder="Passwort"
            type="password"
            error={passwordError}
          />
        </div>
        <div className="input-group">
          <Button
            label="Login"
            icon="login.svg"
            onClick={() => console.log("Button clicked")}
            customClass="login-button"
          />

          <Link
            label="Passwort vergessen?"
            href="/reset-password"
            customClass="reset-password-link"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
