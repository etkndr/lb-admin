from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class DescForm(FlaskForm):
    body = StringField("Description", validators=[DataRequired()])
    order_num = IntegerField("List order")
    submit = SubmitField("Submit")