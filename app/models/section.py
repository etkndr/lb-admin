from .db import db, environment, SCHEMA
from sqlalchemy.sql import func

class Instrument(db.Model):
    __tablename__ = "sections"
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    choice_desc = db.Column(db.String(255))
    price = db.Column(db.Integer)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    menu = db.relationship("Menu", back_populates="section")
    
    def to_dict(self):
        return {
            'id': self.id,
            "choice_desc": self.choice_desc,
            "price": self.price,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }