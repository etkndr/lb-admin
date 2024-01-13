from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Item(db.Model):
    __tablename__ = "items"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("sections.id")), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    includes = db.Column(db.String(255), nullable=True)
    order_num = db.Column(db.Integer, nullable=False, default=1)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    desc = db.relationship("Desc", back_populates="item", cascade="all, delete")
    section = db.relationship("Section", back_populates="item")
    user = db.relationship("User", back_populates="item")

    def to_dict(self):
        return {
            'id': self.id,
            "user_id": self.user_id,
            "section_id": self.section_id,
            "title": self.title,
            "includes": self.includes,
            "order_num": self.order_num,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }