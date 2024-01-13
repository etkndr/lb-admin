from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class ItemForm(FlaskForm):
    title = StringField("Item title", validators=[DataRequired()])
    includes = StringField("Includes")
    order_num = IntegerField("List order")
    submit = SubmitField("Submit")