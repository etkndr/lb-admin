from .db import db, environment, SCHEMA
from sqlalchemy.sql import func

class Item(db.Model):
    __tablename__ = "items"
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    desc = db.relationship("Desc", back_populates="item")
    section = db.relationship("Section", back_populates="item", cascade="all, delete")
    
    def to_dict(self):
        return {
            'id': self.id,
            "title": self.title,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }