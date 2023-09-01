from flask import Flask, render_template, request, jsonify
import pytesseract
from PIL import Image

app = Flask(__name__)

# ... Other routes ...

@app.route('/perform_ocr', methods=['POST'])
def perform_ocr():
    try:
        image = request.files['image']
        image = Image.open(image)
        text = pytesseract.image_to_string(image)
        return jsonify({'status': 'success', 'text': text})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

# ... Rest of your Flask app ...

if __name__ == '__main__':
    app.run()
