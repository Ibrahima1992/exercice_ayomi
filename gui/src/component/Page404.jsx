import React from 'react'
import styled from 'styled-components'


const Page = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: aliceblue;

    h2{
        font-size: 52px;
        font-weight: 800;
    }


`

function Page404() {
  return (
    <Page>
      <h1>PAGE 404</h1>
    </Page>
  )
}

export default Page404