import React from "react"
import Back from "../common/Back"
import "../home/recent/recent.css"
import img from "../images/BTCUSD_Tp.JPG"
import UsersViewTrades from "./UsersViewTrades"

const Blog = () => {
  return (
    <>
      <section className='blog-out mb'>
        <Back name='Blog' title='PREMIUM VIEW FOR TRADES' cover={img} />
        <UsersViewTrades/>

      </section>
    </>
  )
}

export default Blog
