#!flask/bin/python
from flask import Flask
app = Flask(__name__)

from flask import send_from_directory
from flask import request
from flask import render_template



@app.route('/jobs')
def showjobs():
  return render_template('content.html')


@app.route('/')
def login():
  return render_template('login.html')


@app.route('/post')
def postjob():
  return render_template('postjob.html')


@app.route('/images/<path:filename>')
def staticimages(filename):
    return send_from_directory(app.root_path + '/images/', filename)


@app.route('/resources/<path:filename>')
def staticresources(filename):
    return send_from_directory(app.root_path + '/resources/', filename)





if __name__ == '__main__':
  app.run(debug=True)