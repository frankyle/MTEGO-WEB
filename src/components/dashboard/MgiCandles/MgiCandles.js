import React from 'react'
import TradingIndicatorsTable from '../TradingIndicators/TradingIndicatorsTable'
import TradeDetailsTable from '../TradeDetails/TradeDetailsTable'
import CandleImagesTable from '../CandlesImages/CandelsImagesTable'

const MgiCandles = () => {
  return (
    <div>
        <TradeDetailsTable/>
        <TradingIndicatorsTable/>
        <CandleImagesTable/>

    </div>
  )
}

export default MgiCandles