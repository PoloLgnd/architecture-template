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
    

class ProcessedEmail(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    original_id = db.Column(db.Integer)
    processed_date = db.Column(db.DateTime, default = datetime.utcnow)


    def __repr__(self):
        return f"<ProcessedEmail {self.id}>"


# здесь мы начинает кодить ту часть сайта, что отвечает за сбор почт на БД

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


@app.route('/2.html/', methods=['POST', 'GET'])
@app.route('/2.html', methods=['POST', 'GET'])
def second_home():
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
            return redirect('/2.html')
        except Exception as e:
            app.logger.error(f'Ошибка при добавлении почты: {e}')
            return "При добавлении почты возникла ошибка :("
    
    return render_template("2.html")


@app.route('/3.html')
def article():
    return render_template("3.html")


@app.route('/index.html')
def index():
    return render_template("index.html")


@app.route('/admin')
@app.route('/admin/')
def admin():
    articles = Article.query.order_by(Article.date).all()
    return render_template("admin.html", articles = articles)


@app.route('/admin/<int:id>')
def admin_detail(id):
    article = Article.query.get(id)
    return render_template("admin-detail.html", article = article)


@app.route('/admin/<int:id>/del')
def admin_detail_delete(id):
    article = Article.query.get_or_404(id)

    try:
        db.session.delete(article)
        db.session.commit()
        return redirect('/admin')
    except:
        return("При удалении произошла ошибка(")
    

@app.route('/admin/<int:id>/ready')
def admin_detail_ready(id):
    article = Article.query.get_or_404(id)

    try:
        processed_email = ProcessedEmail (
            email = article.email,
            original_id = article.id
        )

        db.session.add(processed_email)
        db.session.delete(article)
        db.session.commit()
        return redirect('/admin')
    except Exception as e:
        app.logger.error('При добавлении в готовое произошла ошибка {e}')
        return("Произошла ошибка при переносе")


@app.route('/admin/ready')
def admin_ready():
    processed_email = ProcessedEmail.query.get(id)
    return render_template("admin-ready-emails.html", email = processed_email)


@app.route('/admin/ready/<int:id>/del')
def admin_ready_del():
    processed_email = ProcessedEmail.query.get(id)

    try:
        db.session.delete(processed_email)
        db.session.commit()
        return redirect('/admin/ready')
    except:
        return("При удалении готовой почты произошла ошибка(")



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
