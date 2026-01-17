'use client'
import React, { useState } from 'react'
import UserDetailsContainer from './detailsChange/container/UserDetailsContainer'
import UserDataShow from './detailsChange/common/UserDataShow'

const Settings = () => {
        const [edit,setEdit]=useState(false)
  return (
 <section>
         <div className='container mx-auto'>
              {edit ? <UserDetailsContainer /> : <UserDataShow onSetEdit={setEdit} edit={edit} />

              }
         </div>
    </section>
  )
}

export default Settings