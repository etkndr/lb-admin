from api.models import db, Section, Item
from api.forms import SectionForm, ItemForm
from flask import Blueprint, request
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages

section_routes = Blueprint("section", __name__)

# GET SECTION BY ID
@section_routes.route("/<int:id>")
def get_section(id):
    section = Section.query.get(id)
    if not section:
        return {"errors": "Section not found"}, 404
    
    return section.to_dict()

# SAVE SECTION UPDATES
@section_routes.put("/<int:id>")
@login_required
def edit_section(id):
    form = SectionForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    section = Section.query.get(id)
    
    if not section:
        return {"errors": "Section not found"}, 404
    if section.user_id != current_user.id:
        return {"errors": "Section can only be edited by creator"}, 400

    if form.validate_on_submit():
        section.choice_desc = form.data["choice_desc"]
        section.price = form.data["price"]
        
        db.session.commit()
        
        return section.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

# DELETE SECTION
@section_routes.delete("/<int:id>")
@login_required
def delete_section(id):
    section = Section.query.get(id)  
    
    if not section:
        return {"errors": "Section not found"}, 404
    if section.user_id != current_user.id:
        return {"errors": "Section can only be deleted by creator"}, 400

    db.session.delete(section)
    db.session.commit()
    
    return {"message": "Section successfully deleted"}

# GET ALL ITEMS FOR SECTION BY ID
@section_routes.route("/<int:id>/items")
def section_items(id):
    section = Section.query.get(id)
    
    if not section:
        return {"errors": "Section not found"}, 404
    
    items = Item.query.filter(Item.section_id == section.id).all()
    
    return [item.to_dict() for item in items]

# CREATE NEW ITEM
@section_routes.post("/<int:id>/items")
@login_required
def new_item(id):
    section = Section.query.get(id)
    
    if not section:
        return {"errors", "Section not found"}, 404
    if section.user_id != current_user.id:
        return {"errors": "Items can only be added by menu creator"}, 400
    
    form = ItemForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        item = Item(
            section_id = id,
            user_id = current_user.id,
            title = form.data["title"]
        )
        
        db.session.add(item)
        db.session.commit()
        
        return item.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401