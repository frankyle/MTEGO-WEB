import React from "react"
import Heading from "../../common/Heading"
import "./price.css"
import PriceCard from "./PriceCard"

const Price = () => {
  return (
    <>
      <section className='price padding'>
        <div className='container'>
          <Heading title='As a Guesture of good thanks' subtitle='This is just like thanks in advance to different people in the company' />
          <PriceCard />
        </div>
      </section>
    </>
  )
}

export default Price
