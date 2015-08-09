# Django Webapp project with auth module

## Setting up heroku with django
Setup local system by following the link at https://devcenter.heroku.com/articles/getting-started-with-python#introduction

###Things to be setup everytime are:

+ virtualvenv
+ heroku toolbelt: pip install django-toolbelt
+ specify dependecies with Pip: pip freeze > requirements.txt

### Once in your machine

+ Setup an environment variable DATABASE_URL : export DATABASE_URL=postgres:///$(whoami)

###Setups already handled by template:
#### Heroku Specific
- Procfile
web: gunicorn hellodjango.wsgi --log-file -
- Setting file to parse database configuration from $DATABASE_URL
- staticfile and other setups in heroku-django docs
- wsgi.py to enable configs done in app
- .gitignore

#### Webapp specific
- .bowerrc : file to specify where the bower components are stored
- .buildpacks : file to tell heroku which all frameworks need to be installed
- node essential packages as described in package.json and postScript to do various tasks
- bower installations
- gulp.js build to automate tasks like js minification etc.

### Heroku app creation and git
- $git init
- $git add .
- $git commit -m "initial commit"
- $heroku create
- $heroku ps:scale web=1 : To ensure atleast one dyno is running

### Now open the webapp in Pycharm/Sublibe/<your favorite editor>

## Miscellaneous
- $heroku run python manage.py syncdb : To run a command on heroku dyno
- $heroku run python manage.py shell : Django shell for executing arbitrary code against your deployed app

## References:
https://devcenter.heroku.com/articles/getting-started-with-django


