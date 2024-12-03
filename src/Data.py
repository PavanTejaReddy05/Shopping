from fastapi import FastAPI, Depends, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import Secretkey as SK
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timedelta
from jose import jwt, JWTError
from pydantic import BaseModel
from typing import List
from passlib.context import CryptContext

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)


class Reg(BaseModel):
    First_name:str
    Last_Name:str
    User_Name:str
    Phone_Number:str
    Password: str

class log(BaseModel):
    Username:str
    Password:str

client=AsyncIOMotorClient("mongodb+srv://bogireddyptr5:Bogireddyptr5@cluster0.uq0feuh.mongodb.net/TokenAuth")
db=client.get_database("TokenAuth")
col=db.get_collection("Fashion")
col1=db.get_collection("userdtls")

Pwd_Context=CryptContext(schemes=["bcrypt"],deprecated="auto")
ALGORITHM="HS256"
secret_key=SK.secret_key_login
Bearer=HTTPBearer()

async def hash(password:str):
    return Pwd_Context.hash(password)

async def Vrfy_Tkn(token:str):
    try:
        payload=jwt.decode(token,secret_key,algorithms=[ALGORITHM])
        print(f"Token payload: {payload}")
        return payload
    except JWTError as e:
        print(f"Token verification error: {e}")
        return None

def serialize_document(document):
    document["_id"]=str(document["_id"])
    return document

@app.get("/data")
async def Get_Details(request:Request, credentials:HTTPAuthorizationCredentials=Depends(Bearer)):
    headers = dict(request.headers)
    print(f"Headers received: {headers}")
    token=credentials.credentials
    print(f"Received token: {token}")
    payload=await Vrfy_Tkn(token)
    if payload and datetime.utcnow()<datetime.fromtimestamp(payload.get("exp",0)):
        print("Token is valid and not expired.")
        dtls=await col.find().to_list(length=100)
        serialized_dtls = [serialize_document(doc) for doc in dtls]
        return JSONResponse(content=serialized_dtls)
    return JSONResponse(content={"error": "Token verification failed or expired"}, status_code=403)
    if not payload:
        raise HTTPException(status_code=403, detail="Token verification failed")
    raise HTTPException(status_code=403, detail="Token verification failed or expired")


@app.post("/register")
async def Reg_Details(r:Reg):
    hashed_Pwd=await hash(r.Password)
    r.Password=hashed_Pwd
    dtls=await col1.insert_one(r.dict())
    if dtls:
        return JSONResponse(content={"Message":"Registration Successfull..."})
    else:
        return JSONResponse(content={"Message":"Registration Failure !!!"})

@app.post("/login")
async def Valid_Cred(l:log):
    dt=await col1.find_one({"User_Name":l.Username})
    Hash_Pwd=dt.get("Password")
    if dt and Pwd_Context.verify(l.Password,Hash_Pwd):
        now=datetime.utcnow()
        exp=now+timedelta(minutes=5)
        payload={"sub":l.Username,"iat":now,"exp":exp}
        token=jwt.encode(payload,secret_key,algorithm=ALGORITHM)
        print(f"Generated token: {token}")
        return{"AccessToken":token,"Message":"Login Successfull"}
    else:
        return{"Message":"Invalid Credentials"}
