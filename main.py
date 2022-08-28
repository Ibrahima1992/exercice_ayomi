from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from api.routes.user import router
from config import engine
import uvicorn
from api.models import models
from settings import get_settings


# models.Base.metadata.drop_all(bind=engine)
models.Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(router=router, prefix="/test-ayomi", tags=["Test"])

origins = [
    "http://localhost:3000",
    "http://192.168.1.35:3000",
    "http://localhost",
    "http://172.22.0.3:8000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/info")
async def info():
    return {"app_name": get_settings().database_url}


# if __name__ == "__main__":
#     uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
