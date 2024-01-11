from app.models import db, User, Menu, Section, Item, Desc
from app.forms import MenuForm, SectionForm
from flask import Blueprint, request
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from sqlalchemy import and_

menu_routes = Blueprint("menu", __name__)

# GET VISIBLE MENUS
@menu_routes.route("/visible")
def vis_menus():
    user = User.query.filter(User.username == "lbadmin").one()

    menus = Menu.query.filter(and_(
        Menu.visible == "visible",
        Menu.user_id == user.id)).all()

    if len(menus) == 0:
        return {"message": "No visible menus"}

    return [menu.to_dict() for menu in menus]


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
    
    menu_dict = menu.to_dict()
    sections = Section.query.filter(Section.menu_id == id)
    section_list = [section.to_dict() for section in sections]
    
    for section in section_list:
        items = Item.query.filter(Item.section_id == section["id"])
        item_list = [item.to_dict() for item in items]
        
        for item in item_list:
            descs = Desc.query.filter(Desc.item_id == item["id"])
            desc_list = [desc.to_dict() for desc in descs]
            item["descs"] = desc_list
        
        section["items"] = item_list
    
    menu_dict["sections"] = section_list

    return menu_dict

# CREATE NEW MENU
@menu_routes.post("/")
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
@menu_routes.put("/<int:id>")
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
@menu_routes.delete("/<int:id>")
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

# GET ALL SECTIONS FOR MENU BY ID
@menu_routes.route("/<int:id>/sections")
def menu_sections(id):
    menu = Menu.query.get(id)

    if not menu:
        return {"errors": "Menu not found"}, 404

    sections = Section.query.filter(Section.menu_id == menu.id).all()

    return [section.to_dict() for section in sections]

# CREATE NEW SECTION
@menu_routes.post("/<int:id>/sections")
@login_required
def new_section(id):
    menu = Menu.query.get(id)

    if not menu:
        return {"errors": "Menu not found"}, 404
    if menu.user_id != current_user.id:
        return {"errors": "Sections can only be added by menu creator"}, 400

    form = SectionForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        section = Section(
            menu_id = id,
            user_id = current_user.id,
            choice_desc = form.data["choice_desc"],
            price = form.data["price"]
        )

        db.session.add(section)
        db.session.commit()

        return section.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401