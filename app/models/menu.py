from .db import db, environment, SCHEMA
from sqlalchemy.sql import func

class Instrument(db.Model):
    __tablename__ = "menus"
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer(), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    
    def to_dict(self):
        return {
            'id': self.id,
            "title": self.title,
            "price": self.price,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }