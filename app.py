import os 
from flask import Flask, render_template, request, redirect, url_for, session, flash
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY","segredo-local")

def get_conn():
    return psycopg2.connect(os.getenv("DATABASE_URL"), sslmode="require")


@app.route("/register", methods=["GET","POST"])
def register():
    if request.method == "POST":
        email = request.form.get("email", "").strip()
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "").strip()
    
        if not email  or not password or not username:
            flash("preencha todos os campos.", "warning")
            return render_template("Cad.html")

        try:
            with get_conn() as conn, conn.cursor() as cur:
                cur.execute("INSERT INTO cadastro (username, senha, email) VALUES (%s, %s, %s)", (username, password, email))
                conn.commit()
            flash("cadastro rea lizado com sucesso", "success")
            return redirect(url_for("login"))
        except psycopg2.errors.UniqueViolation:
            flash("Usuário já existe.", "danger") 
        except Exception as e:
            flash(f"Erro ao cadastrar: {e}", "danger")
    return render_template("Cad.html")





@app.route("/login", methods=["GET","POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email", "").strip()
        password = request.form.get("password", "").strip()
    
        if not email  or not password:
            flash("preencha todos os campos.", "warning")
            return render_template("Login.html")

        with get_conn() as conn, conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT id_user, senha FROM usuarios WHERE username = %s", (username,))  
                user = cur.fetchone()

        if user and user ["senha"] == password:
            session["user_id"] = user["id_user"]
            session["username"] = username
            flash(f"bem vindo {username}", "success")

    return render_template("login.html")


