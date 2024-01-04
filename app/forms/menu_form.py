from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, AnyOf

class MenuForm(FlaskForm):
    title = StringField("Menu title", validators=[DataRequired()])
    price = IntegerField("Price", validators=[DataRequired()])
    visible = StringField("Visible", validators=[DataRequired(), AnyOf(values=["visible", "hidden"])])
    submit = SubmitField("Submit")