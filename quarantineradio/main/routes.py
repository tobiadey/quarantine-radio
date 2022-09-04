from flask import render_template, request, Blueprint,url_for
from quarantineradio.models import Room
from flask_login import login_required, current_user


main =  Blueprint('main', __name__)


@main.route('/')
def index():
    return render_template('index.html')

@main.route('/home')
@login_required
def home():
    page = request.args.get('page',1,type=int)
    rooms = Room.query.order_by(Room.date_posted.desc()).paginate(page=page, per_page=4)
    image_file = url_for('static', filename= 'img/'+ current_user.image_file)

    return render_template('home.html',title='Home', rooms=rooms, image_file=image_file)


# page 222

@main.route('/index')
def homee():
    page = request.args.get('page',1,type=int)
    posts = Room.query.order_by(Room.date_posted.desc()).paginate(page=page, per_page=4)
    return render_template('tuthome.html', posts=posts)
