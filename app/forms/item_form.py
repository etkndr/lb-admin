from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class ItemForm(FlaskForm):
    title = StringField("Item title", validators=[DataRequired()])
    submit = SubmitField("Submit")