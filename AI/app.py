from flask import Flask

app = Flask(__name__)
@app.route('/')
def home():
    return 'Hello, World!1212343'

@app.route('/translate')
def translate():
    return 'qwer'

@app.route('/keyword_extract')
def keyword_extract(title,description):
    return (title,description)

if __name__ == '__main__':
    app.run(debug=True)
