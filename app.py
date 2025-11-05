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

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/areaAluno")
def area_aluno():
    if "user_id" not in session:
        flash("Você precisa fazer login primeiro.", "warning")
        return redirect(url_for("login"))
    return render_template("areaAluno.html")

@app.route("/register", methods=["GET", "POST"])
def register():
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
            return redirect(url_for("login"))
        except psycopg2.errors.UniqueViolation:
            flash("Usuário já existe.", "danger")
        except Exception as e:
            flash(f"Erro ao cadastrar: {e}", "danger")

    return render_template("Cad.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "").strip()

        if not username or not password:
            flash("Preencha todos os campos.", "warning")
            return render_template("Login.html")

        with get_conn() as conn, conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT id_user, senha FROM usuarios WHERE username = %s", (username,))
            user = cur.fetchone()

        if user and user["senha"] == password:
            session["user_id"] = user["id_user"]
            session["username"] = username
            flash(f"Bem-vindo, {username}!", "success")
            return redirect(url_for("area_aluno"))
        else:
            flash("Usuário ou senha incorretos.", "danger")

    return render_template("Login.html")

@app.route("/logout")
def logout():
    session.clear()
    flash("Você saiu da conta.", "info")
    return redirect(url_for("login"))

if __name__ == "__main__":
    app.run(debug=True)
@app.route('/p')

def p():
    return render_template('p.html')