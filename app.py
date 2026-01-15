from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
@app.route('/1.html')
def home():
    return render_template("1.html")


@app.route('/2.html')
def about():
    return render_template("2.html")


@app.route('/index.html')
def index():
    return render_template("index.html")


@app.route('/user/<string:name>/<int:id>')
def user(name, id):
    return("user page" + " - " + name + " - " + str(id))

if __name__ == "__main__":
    app.run(debug = True)

# 13 минута - шаблоны для сайтов 