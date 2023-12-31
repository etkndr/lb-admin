from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, BooleanField
from wtforms.validators import DataRequired

class MenuForm(FlaskForm):
    title = StringField("Menu title", validators=[DataRequired()])
    price = IntegerField("Price", validators=[DataRequired()])
    visible = BooleanField("Visible", validators=[DataRequired()])
    submit = SubmitField("Submit")