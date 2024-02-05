from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import Optional

class SectionForm(FlaskForm):
    choice_desc = StringField("Section title")
    price = IntegerField("Price", validators=[Optional()])
    submit = SubmitField("Submit")