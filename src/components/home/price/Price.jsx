import React from "react"
import Heading from "../../common/Heading"
import "./price.css"
import PriceCard from "./PriceCard"

const Price = () => {
  return (
    <>
      <section className='price padding'>
        <div className='container'>
        <Back name='As a Guesture of good thanks' title='This is lke thanks in advance to different people in the company' cover={img} />
        <PriceCard />
        </div>
      </section>
    </>
  )
}

export default Price
