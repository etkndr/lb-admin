from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Desc(db.Model):
    __tablename__ = "descs"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("items.id")), nullable=False)
    body = db.Column(db.String(255), nullable=False)
    order_num = db.Column(db.Integer, nullable=False, default=1)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    item = db.relationship("Item", back_populates="desc")
    user = db.relationship("User", back_populates="desc")

    def to_dict(self):
        return {
            'id': self.id,
            "user_id": self.user_id,
            "item_id": self.item_id,
            "body": self.body,
            "order_num": self.order_num,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }