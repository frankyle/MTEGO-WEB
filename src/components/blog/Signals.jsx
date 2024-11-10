import React from "react"
import Back from "../common/Back"
import "../home/recent/recent.css"
import img from "../images/USOIL_SELLS_Entry.JPG"
import SignalTrades from "./SignalsTrades/SignalTrades"

const Signals = () => {
  return (
    <>
      <section className='blog-out mb'>
        <Back name='Blog' title='PREMIUM VIEW FOR TRADES' cover={img} />   
        <SignalTrades/>
      </section>
    </>
  )
}

export default Signals
