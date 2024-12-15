
const style = document.createElement('style');
style.innerHTML = `
    body, html {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: Arial, sans-serif;
    }

    .main-container {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #6a1b9a, #9c27b0); /* Purple gradient */
        padding: 20px;
    }

    h1 {
        font-size: 2.5rem;
        color: white;
        text-align: center;
    }

    p {
        font-size: 1.2rem;
        color: white;
        text-align: center;
        margin-bottom: 20px;
    }

    .info {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        width: 80%;
        max-width: 500px;
        margin-top: 30px;
    }

    .info h3 {
        font-size: 1.6rem;
        margin-bottom: 10px;
        color: #333;
    }

    .info p {
        font-size: 1.1rem;
        color: #555;
    }

    .login-button-container {
        margin-top: 20px;
    }

    .login-button-container a {
        padding: 15px 30px;
        background-color: #00bcd4; /* Cyan Blue */
        color: white;
        text-decoration: none;
        border-radius: 4px;
        font-size: 1.1rem;
        cursor: pointer;
    }

    .login-button-container a:hover {
        background-color: #0097a7; /* Darker cyan blue on hover */

    }
`;




document.head.appendChild(style);  // Append the style to the head section
