from sqlalchemy import Column, Integer, String, Date, Text, ForeignKey
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(25), unique=True)
    password = Column(String(25))


class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    # timestamp = Column(Date)
    code = Column(Text)
    output = Column(Text)
    userid = Column(Integer, ForeignKey("users.id"))



