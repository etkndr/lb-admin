from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Section(db.Model):
    __tablename__ = "sections"
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    menu_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("menus.id")), nullable=False)
    choice_desc = db.Column(db.String(255))
    price = db.Column(db.Integer)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    item = db.relationship("Item", back_populates="section", cascade="all, delete")
    menu = db.relationship("Menu", back_populates="section")
    user = db.relationship("User", back_populates="section")
    
    def to_dict(self):
        return {
            'id': self.id,
            "user_id": self.user_id,
            "menu_id": self.menu_id,
            "choice_desc": self.choice_desc,
            "price": self.price,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }