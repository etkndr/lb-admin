from app.models import db, Menu, Section, Item, Desc
from app.forms import MenuForm, SectionForm, ItemForm, DescForm
from flask import Blueprint, request
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages

menu_routes = Blueprint("menu", __name__)

# GET ALL MENUS FOR USER
@menu_routes.route("/")
@login_required
def user_menus():
    if not current_user:
        return {"errors": "Please log in to continue"}
    
    menus = Menu.query.filter(Menu.user_id == current_user.id).all()
    
    return [menu.to_dict() for menu in menus]

# GET MENU BY ID
@menu_routes.route("/<int:id>")
def get_menu(id):
    menu = Menu.query.get(id)
    if not menu:
        return {"errors": "Menu not found"}, 404
    
    return menu.to_dict()

# CREATE NEW MENU
@menu_routes.route("/", methods=["POST"])
@login_required
def new_menu():
    form = MenuForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        menu = Menu(
            user_id = current_user.id,
            title = form.data["title"],
            price = form.data["price"],
            visible = form.data["visible"]
        )
        
        db.session.add(menu)
        db.session.commit()
        
        return menu.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

# SAVE MENU UPDATES
@menu_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_menu(id):
    form = MenuForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    menu = Menu.query.get(id)
    if not menu:
        return {"errors": "Menu not found"}, 404
    if menu.user_id != current_user.id:
        return {"errors": "Menu can only be edited by creator"}, 400

    if form.validate_on_submit():
        menu.user_id = current_user.id
        menu.title = form.data["title"]
        menu.price = form.data["price"]
        menu.visible = form.data["visible"]
        
        db.session.commit()
        
        return menu.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401



# DELETE MENU
@menu_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_menu(id):
    menu = Menu.query.get(id)  
    if not menu:
        return {"errors": "Menu not found"}, 404
    if menu.user_id != current_user.id:
        return {"errors": "Menus can only be deleted by creator"}, 400

    db.session.delete(menu)
    db.session.commit()
    
    return {"message": "Menu successfully deleted"}