from typing import List
from fastapi import APIRouter, HTTPException, Depends, status
from config import SessionLocal, get_db
from sqlalchemy.orm import Session
from models.models import User, Hasher
from schema import user
from sqlalchemy import and_
from sqlalchemy.sql import exists
from settings import Settings, get_settings

router = APIRouter()


@router.get("/users", response_model=List[user.UserOut])
async def users(db: Session = Depends(get_db)):
    """retrieve all users in database

    Args:
        db (Session, optional): connecting database. Defaults to Depends(get_db).

    Returns:
        list user: get all users
    """
    return db.query(User).all()


@router.post("/users", response_model=user.UserOut)
async def user_add(data: user.UserCreate, db: Session = Depends(get_db)):
    """add a new user and check before user exist or not inside database

    Args:
        data (user.UserCreate): input model
        db (Session, optional): connecting to the database. Defaults to Depends(get_db).

    Raises:
        HTTPException: 200 if success
        HTTPException:  404 if error to adding

    Returns:
        a new user
    """
    user_in = (
        db.query(User)
        .filter(and_(User.login == data.login, User.email.like(str(data.email))))
        .first()
    )
    if user_in:
        raise HTTPException(
            status_code=status.HTTP_201_CREATED,
            detail=f" user already exist with login:{data.login} and email:{data.email}",
        )

    data.password = Hasher.get_password_hash(data.password)
    user = User.add_user(db=db, data=data)
    if user is None:
        raise HTTPException(status_code=404, detail="not can be register")
    return user


@router.post("/users/", response_model=bool)
async def login(user: user.UserLogin, db: Session = Depends(get_db)):
    """checking if login and password is already exist or not

    Args:
        user (user.UserLogin): schema input
        db (Session, optional): database connection. Defaults to Depends(get_db).

    Returns:
        old_user: return user updated
    """
    user_in = User.user_by_name(db=db, login=user.login)
    if user_in is not None and Hasher.verify_password(user.password, user_in.password):
        return True
    else:
        return False


@router.put("/users/{id}")
async def user_update(user: user.UserUpdate, id: int, db: Session = Depends(get_db)):
    """update user with id in param

    Args:
        user (user.UserUpdate): specifie user update schema
        id (int): for user who's can be updated
        db (Session, optional): connecting database. Defaults to Depends(get_db).

    Raises:
        HTTPException: 404 error to updated
        HTTPException: 500 if user already exist

    Returns:
        user: a new user
    """
    user_in = (
        db.query(User)
        .filter(and_(User.login == user.login, User.email.like(str(user.email))))
        .first()
    )
    if user_in and user_in.id == id:
        old_user = User.update_user(db=db, id=id, data=user)
        if old_user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="not updated or user does not exist",
            )
        return old_user
    else:
        raise HTTPException(
            status_code=status.HTTP_204_NO_CONTENT, detail="can't updated this user"
        )


@router.get("/users/{id}", response_model=user.UserOut)
async def user_get_by_id(id: int, db: Session = Depends(get_db)):
    """retrieve user by id

    Args:
        id (int): user id
        db (Session, optional): connecting database. Defaults to Depends(get_db).

    Raises:
        HTTPException: 404 error

    Returns:
        user: return user who's in database
    """
    user = User.user_by_id(db=db, id=id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="user not found"
        )
    return user


@router.get("/users/{mail}/", response_model=user.UserOut)
async def user_by_mail(mail: str, db: Session = Depends(get_db)):
    """retrieve user by his email

    Args:
        mail (str): user email in database, email is unique on database
        db (Session, optional): connecting database. Defaults to Depends(get_db).

    Raises:
        HTTPException: 404

    Returns:
        user: a user owner this email
    """
    user = User.get_user_by_mail(db=db, mail=mail)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"user with {mail} does'nt exist",
        )
    return user


async def check_password_user(id: int, password: str, db: Session = Depends(get_db)):
    user = User.user_by_id(db=db, id=id)
    return Hasher.verify_password(password, user.password)
