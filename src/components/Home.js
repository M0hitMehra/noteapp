import React from 'react'
import Notes from "./Notes"

export const Home = (props) => {


let {showAlert} = props

  return (
    <div>
     <div className ="container">
       <Notes showAlert={showAlert} mode = {props.mode} /> 
     </div>

    </div>
  )
}
