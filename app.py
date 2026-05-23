from flask import Flask

app = Flask (__name__)

@app.route('/copycrafter', methods=['GET','POST'])
def generate_copy():
    return "it works"

if __name__ == '__main__':
    app.run(debug=True) 