from flask import Flask, render_template, request
import cohere
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

COHERE_API_KEY = os.getenv("COHERE_API_KEY")
co = cohere.Client(COHERE_API_KEY)

@app.route("/", methods=["GET", "POST"])
def index():
    cultural_note = ""
    user_input = ""

    if request.method == "POST":
        user_input = request.form["transcript"]

        prompt = f"""
        You are a cultural expert. Analyze the following transcript or keywords and write a concise cultural note (3-4 sentences). 
        Focus on cultural behaviors, values, or references. Do not simply repeat the input.

        Transcript or Keywords:
        {user_input}

        Cultural Note:
        """

        try:
            response = co.generate(
                model='command-r-plus',
                prompt=prompt,
                max_tokens=150,
                temperature=0.7
            )
            cultural_note = response.generations[0].text.strip()
        except Exception as e:
            cultural_note = f"Error calling Cohere API: {str(e)}"

    return render_template("index.html", note=cultural_note, input_text=user_input)
if __name__ == "__main__":
    print("Starting Flask app...")
    app.run(debug=True)

