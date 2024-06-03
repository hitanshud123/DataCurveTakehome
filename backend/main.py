from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
import schema
import models
import subprocess
import uuid
import os
from database import engine, localSession
from sqlalchemy.orm import Session
import boto3
import json

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://datacurve-takehome-hitanshu.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

schema.Base.metadata.create_all(bind=engine)


def get_db():
    db = localSession()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]

lambda_client = boto3.client(
    "lambda",
    region_name="us-east-1",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECREt_ACCESS_KEY"),
)


## Run Code
@app.post(
    "/run-code/",
    response_model=models.CodeOutput,
    status_code=status.HTTP_200_OK,
    summary="Run Python Code",
)
def run(code: models.CodeInput) -> models.CodeOutput:
    res = lambda_client.invoke(
        FunctionName="run-code", Payload=json.dumps({"code": code.code})
    )

    if res["StatusCode"] != 200:
        raise HTTPException(status_code=res["StatusCode"], detail="Failed to Run Code")

    payload = json.loads(json.loads(res["Payload"].read()))

    # res = run_code(code.code)
    return payload


## Submit Code
@app.post(
    "/submission/",
    response_model=None,
    status_code=status.HTTP_200_OK,
    summary="Create Submission",
)
async def create_submission(submission: models.Submission, db: db_dependency) -> None:
    db_submission = schema.Submission(**submission.model_dump())
    db.add(db_submission)
    db.commit()


@app.get(
    "/submissions",
    response_model=list[models.Submission],
    status_code=status.HTTP_200_OK,
    summary="Get All Submissions",
)
async def get_submission(db: db_dependency) -> list[models.Submission]:
    res = db.query(schema.Submission).all()
    return res


@app.get(
    "/submission/{submission_id}",
    response_model=models.Submission,
    status_code=status.HTTP_200_OK,
    summary="Get Submission",
)
async def get_submission(submission_id: int, db: db_dependency) -> models.Submission:
    res = (
        db.query(schema.Submission)
        .filter(schema.Submission.id == submission_id)
        .first()
    )
    if res == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Submission Not Found"
        )
    else:
        return res


@app.get(
    "/submissions-by-user/{user_id}",
    response_model=list[models.Submission],
    status_code=status.HTTP_200_OK,
    summary="Get Submissions by a User",
)
async def get_submission(user_id: int, db: db_dependency) -> list[models.Submission]:
    res = db.query(schema.Submission).filter(schema.Submission.userid == user_id).all()
    return res


# TODO: add endpoints for User
