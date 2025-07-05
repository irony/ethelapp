from fastapi import FastAPI
from pydantic import BaseModel

class FullNameResponse(BaseModel):
    available: bool
    fullname: str | None = None

app = FastAPI()

@app.get("/app/user/fullname", response_model=FullNameResponse)
async def get_user_fullname():
    # TODO: hook up real auth + lookup
    return FullNameResponse(available=True, fullname="Zaphod Beeblebrox")

