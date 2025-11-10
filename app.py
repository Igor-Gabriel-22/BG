import os
from flask import Flask, render_template, request, redirect, url_for, session, flash
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "segredo-local")

def get_conn():
    return psycopg2.connect(os.getenv("DATABASE_URL"), sslmode="require")

@app.route("/Cad", methods=["GET", "POST"])
def Cad():
    if request.method == "POST":
        email = request.form.get("email", "").strip()
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "").strip()

        if not email or not password or not username:
            flash("Preencha todos os campos.", "warning")
            return render_template("Cad.html")

        try:
            with get_conn() as conn, conn.cursor() as cur:
                cur.execute(
                    "INSERT INTO usuarios (username, senha, email) VALUES (%s, %s, %s)",
                    (username, password, email),
                )
                conn.commit()
            flash("Cadastro realizado com sucesso!", "success")
            return redirect(url_for("Login"))
        except psycopg2.errors.UniqueViolation:
            flash("Usuário já existe.", "danger")
        except Exception as e:
            flash(f"Erro ao cadastrar: {e}", "danger")

    return render_template("Cad.html")

@app.route("/Login", methods=["GET", "POST"])
def Login():
    if request.method == "POST":
        username = request.form.get("email", "").strip()
        password = request.form.get("password", "").strip()

        if not username or not password:
            flash("Preencha todos os campos.", "warning")
            return render_template("Login.html")

        with get_conn() as conn, conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT id_user, senha FROM usuarios WHERE email = %s", (username,))
            user = cur.fetchone()

        if user and user["senha"] == password:
            session["user_id"] = user["id_user"]
            session["username"] = username
            flash(f"Bem-vindo, {username}!", "success")
            return redirect(url_for("areaAluno"))
        else:
            flash("Usuário ou senha incorretos.", "danger")

    return render_template("Login.html")

    
@app.route('/p')
def p():
    return render_template('p.html')

@app.route('/index1')
def index1():
    return render_template('index1.html')

@app.route('/areaAluno')
def areaAluno():
    return render_template('areaAluno.html')

@app.route('/certificado')
def certificado():
    return render_template('certificado.html')

@app.route('/curso1')
def curso1():
    return render_template('curso1.html')

@app.route('/curso2')
def curso2():
    return render_template('curso2.html')

@app.route('/curso3')
def curso3():
    return render_template('curso3.html')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/na')
def na():
    return render_template('na.html')

@app.route('/quizNA')
def quizNA():
    return render_template('quizNA.html')

@app.route('/quizNP')
def quizNP():
    return render_template('quizNP.html')

@app.route('/quizP')
def quizP():
    return render_template('quizP.html')

if __name__ == "__main__":
    app.run(debug=True)
