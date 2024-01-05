from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField

class SectionForm(FlaskForm):
    choice_desc = StringField("Section title")
    price = IntegerField("Price")
    submit = SubmitField("Submit")