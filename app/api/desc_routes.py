from app.models import db, Item, Desc
from app.forms import DescForm
from flask import Blueprint, request
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages

desc_routes = Blueprint("desc", __name__)

# GET DESC BY ID
@desc_routes.route("/<int:id>")
def get_desc(id):
    desc = Desc.query.get(id)
    if not desc:
        return {"errors": "Desc not found"}, 404
    
    return desc.to_dict()

# SAVE DESC UPDATES
@desc_routes.put("/<int:id>")
@login_required
def edit_desc(id):
    form = DescForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    desc = Desc.query.get(id)
    
    if not desc:
        return {"errors": "Desc not found"}, 404
    if desc.user_id != current_user.id:
        return {"errors": "Desc can only be edited by creator"}, 400

    if form.validate_on_submit():
        desc.body = form.data["body"]
        desc.order_num = form.data["order_num"]
        
        db.session.commit()
        
        return desc.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

# DELETE DESC
@desc_routes.delete("/<int:id>")
@login_required
def delete_desc(id):
    desc = Desc.query.get(id)  
    
    if not desc:
        return {"errors": "Desc not found"}, 404
    if desc.user_id != current_user.id:
        return {"errors": "Desc can only be deleted by creator"}, 400

    db.session.delete(desc)
    db.session.commit()
    
    return {"message": "Desc successfully deleted"}