from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mail.db' #здесь подключаем бд
app.config['SQLALCHEMY_TRCK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, default = datetime.utcnow)

    def __repr__(self):
        return "<Article %r>" % self.id


@app.route('/')
@app.route('/1.html')
def home():
    if request.methos =="POST":
        userEmail = resuest.form('userEmail')

        mails = Mail(userEmail=userEmail)

        try:
            db.session.add(article)
            db.session.commit()
            return redirect('/')
        except:
            return "При добавлении почты возникла ошибка :("


    return render_template("1.html")


@app.route('/2.html')
def about():
    return render_template("2.html")


@app.route('/3.html')
def article():
    return render_template("3.html")


@app.route('/index.html')
def index():
    return render_template("index.html")


@app.route('/test')
def test():
    return render_template("12.html")


@app.errorhandler(404)
def page_not_found(error):
    return render_template('error404.html'), 404


if __name__ == "__main__":
    app.run(debug = True)

# 13 минута - шаблоны для сайтов 