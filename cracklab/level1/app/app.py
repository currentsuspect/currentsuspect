from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

# VULNERABILITY: robots.txt leaks internal paths
@app.route('/robots.txt')
def robots():
    return app.response_class(
        response="""User-agent: *
Disallow: /admin
Disallow: /backup
Disallow: /dev
Disallow: /staff-portal
Disallow: /.git
""",
        mimetype='text/plain'
    )

# VULNERABILITY: /backup exposes a readable directory with sensitive files
@app.route('/backup/')
@app.route('/backup')
def backup():
    return render_template('backup.html')

@app.route('/backup/db_export.sql')
def backup_sql():
    return send_from_directory('static/secret', 'db_export.sql')

@app.route('/backup/config.bak')
def backup_config():
    return send_from_directory('static/secret', 'config.bak')

# VULNERABILITY: /dev page left accessible with debug info
@app.route('/dev')
def dev():
    return render_template('dev.html')

# VULNERABILITY: /staff-portal hints at credentials in HTML comments
@app.route('/staff-portal')
def staff_portal():
    return render_template('staff_portal.html')

# VULNERABILITY: exposed .git directory (simulate with a fake objects response)
@app.route('/.git/config')
def git_config():
    return app.response_class(
        response="""[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
[remote "origin"]
	url = https://github.com/nexacore-internal/nexacore-website
	fetch = +refs/heads/*:refs/remotes/origin/*
[user]
	name = deploy-bot
	email = deploy@nexacore.internal
	password = deploy_P@ssw0rd_2023
""",
        mimetype='text/plain'
    )

@app.route('/.git/COMMIT_EDITMSG')
def git_commit():
    return app.response_class(
        response="removed hardcoded credentials from config - see vault instead\n",
        mimetype='text/plain'
    )

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=False)
