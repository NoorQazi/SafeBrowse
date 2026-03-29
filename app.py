from flask import Flask, request, jsonify

app = Flask(__name__)

def check_url(url):
    if "login" in url or "bank" in url or "verify" in url:
        return "Phishing"
    else:
        return "Safe"

@app.route("/check", methods=["POST"])
def check():
    data = request.json
    url = data.get("url")
    result = check_url(url)
    return jsonify({"result": result})

if __name__ == "__main__":
    print("Server starting...")
    app.run(host="127.0.0.1", port=5000)