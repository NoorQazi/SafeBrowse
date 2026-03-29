document.addEventListener("DOMContentLoaded", function () {

    let passwordInput = document.getElementById("password");
    let strengthText = document.getElementById("strength");
    let checkButton = document.getElementById("check");
    let resultText = document.getElementById("result");

    // Password checker
    passwordInput.addEventListener("input", () => {
        let password = passwordInput.value;

        if (password.length < 6) {
            strengthText.textContent = "Weak";
            strengthText.style.color = "red";
        } 
        else if (
            password.match(/[A-Z]/) &&
            password.match(/[0-9]/) &&
            password.match(/[!@#$%^&*]/) &&
            password.length >= 8
        ) {
            strengthText.textContent = "Strong";
            strengthText.style.color = "green";
        } 
        else {
            strengthText.textContent = "Medium";
            strengthText.style.color = "orange";
        }
    });

    // 🔥 AI + HTTPS Check
    checkButton.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            let url = tabs[0].url;

            // Basic HTTPS check
            let httpsStatus = url.startsWith("https") ? "Secure (HTTPS)" : "Not Secure";

            // AI API call
            fetch("http://127.0.0.1:5000/check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url: url })
            })
            .then(res => res.json())
            .then(data => {
                resultText.textContent = httpsStatus + " | AI: " + data.result;

                if (data.result === "Phishing") {
                    resultText.style.color = "red";
                } else {
                    resultText.style.color = "green";
                }
            })
            .catch(() => {
                resultText.textContent = "AI server not running!";
                resultText.style.color = "orange";
            });

        });
    });

});