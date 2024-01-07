from app.models import db, Item, Desc
from app.forms import ItemForm, DescForm
from flask import Blueprint, request
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages

item_routes = Blueprint("item", __name__)

# GET ITEM BY ID
@item_routes.route("/<int:id>")
def get_item(id):
    item = Item.query.get(id)
    if not item:
        return {"errors": "Item not found"}, 404

    return item.to_dict()

# SAVE ITEM UPDATES
@item_routes.put("/<int:id>")
@login_required
def edit_item(id):
    form = ItemForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    item = Item.query.get(id)

    if not item:
        return {"errors": "Item not found"}, 404
    if item.user_id != current_user.id:
        return {"errors": "Item can only be edited by creator"}, 400

    if form.validate_on_submit():
        item.title = form.data["title"]

        db.session.commit()

        return item.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

# DELETE ITEM
@item_routes.delete("/<int:id>")
@login_required
def delete_item(id):
    item = Item.query.get(id)

    if not item:
        return {"errors": "Item not found"}, 404
    if item.user_id != current_user.id:
        return {"errors": "Item can only be deleted by creator"}, 400

    db.session.delete(item)
    db.session.commit()

    return {"message": "Item successfully deleted"}

# GET ALL DESCS FOR ITEM BY ID
@item_routes.route("/<int:id>/descs")
def item_descs(id):
    item = Item.query.get(id)

    if not item:
        return {"errors": "Item not found"}, 404

    descs = Desc.query.filter(Desc.item_id == item.id).all()

    return [desc.to_dict() for desc in descs]

# CREATE NEW DESC
@item_routes.post("/<int:id>/descs")
@login_required
def new_desc(id):
    item = Item.query.get(id)

    if not item:
        return {"errors": "Item not found"}, 404
    if item.user_id != current_user.id:
        return {"errors": "Descs can only be added by menu creator"}, 400

    form = DescForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        desc = Desc(
            item_id = id,
            user_id = current_user.id,
            body = form.data["body"]
        )

        db.session.add(desc)
        db.session.commit()

        return desc.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401