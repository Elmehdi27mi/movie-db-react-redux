import React from 'react'

export default function Profile({userData}) {
  return <>
  <div>
    <h4>first name : {userData.firstName}</h4>
    <h4>last name : {userData.lastName}</h4>
    <h4>age : {userData.age}</h4>
    <h4>email : {userData.email}</h4>
  </div>
  </>
}
