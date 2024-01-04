from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Menu(db.Model):
    __tablename__ = "menus"
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    visible = db.Column(db.String(3), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    section = db.relationship("Section", back_populates="menu", cascade="all, delete")
    user = db.relationship("User", back_populates="menu")
    
    def to_dict(self):
        return {
            'id': self.id,
            "user_id": self.user_id,
            "title": self.title,
            "price": self.price,
            "visible": self.visible,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }