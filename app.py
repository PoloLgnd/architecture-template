from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mail.db' #здесь подключаем бд
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, default = datetime.utcnow)

    def __repr__(self):
        return "<Article %r>" % self.id




@app.route('/', methods=['POST', 'GET'])
@app.route('/1.html', methods=['POST', 'GET'])
def home():
    if request.method == "POST":
        if 'userEmail' not in request.form:
            return "Поле email не найдено в запросе"
        
        userEmail = request.form['userEmail']
        
        if not userEmail:
            return "Email не может быть пустым"
        
        mail_entry = Article(email=userEmail)
        
        try:
            db.session.add(mail_entry)
            db.session.commit()
            return redirect('/')
        except Exception as e:
            app.logger.error(f'Ошибка при добавлении почты: {e}')
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


@app.route('/admin')
def admin():
    articles = Article.query.order_by(Article.date).all()
    return render_template("admin.html", articles = articles)


@app.route('/admin/<int:id>')
def admin_detail(id):
    article = Article.query.get(id)
    return render_template("admin-detail.html", article = article)


@app.route('/test')
def test():
    return render_template("12.html")


@app.errorhandler(404)
def page_not_found(error):
    return render_template('error404.html'), 404


if __name__ == "__main__":
    with app.app_context():
        db.create_all()


    app.run(debug = True)

# 13 минута - шаблоны для сайтов 