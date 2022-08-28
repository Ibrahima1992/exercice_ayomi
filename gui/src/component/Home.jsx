import React, { useContext } from 'react'
import styled from 'styled-components'
import AuthContext from './AuthProvider'
import Edit from './Edit'




const HomeContainer = styled.div`
  position: relative;
  display:flex ;
  justify-content: center;
  align-items: center;

  background-color: #406b8f;
  width: 100vw;
  height: 100vh;


  .home-info{
    width: 30%;
    height: 80%;
    background-color: #ffffff;
  }

  .profile-info{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 65%;
  }

`

const ProfileContainer = styled.div`
  position: relative;
  width: 100%;
  height: 35%;

  .img-couverture, .img-profile{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile{
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: #fff;
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto; 
    bottom: -60px;
    border-radius: 50%;
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    
  }

  .img-profile{
    border-radius: 50%;
  }
  
`

function Home() {
  const { auth, setAuth } = useContext(AuthContext)
  return (
    <HomeContainer>
      <div className='home-info'>
        <ProfileContainer>
          <img src="./assets/img/back.jpg" alt="couverture" className='img-couverture' />
          <div className='profile'>
            <img src="./assets/img/profil.jpg" alt="profile" className='img-profile' />
          </div>
        </ProfileContainer>
        <div className='profile-info'>
          <h2>{auth.lastname} {auth.firstname}</h2>
          <p>{auth.email}</p>
          <Edit auth={auth} setAuth={setAuth} />
        </div>

      </div>
    </HomeContainer>
  )
}

export default Home