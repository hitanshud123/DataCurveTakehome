from pydantic import BaseModel


class Submission(BaseModel):
    code: str
    output: str
    userid: int


class User(BaseModel):
    username: str
    password: str


class CodeOutput(BaseModel):
    stdout: str
    stderr: str
    retval: int


class CodeInput(BaseModel):
    code: str
