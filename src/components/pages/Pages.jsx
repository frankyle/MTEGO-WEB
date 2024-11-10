import React from "react"
import Header from "../common/header/Header"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "../home/Home"
import Footer from "../common/footer/Footer"
import About from "../about/About"
import Pricing from "../pricing/Pricing"
import Blog from "../blog/Blog"
import Services from "../services/Services"
import Contact from "../contact/Contact"
import Login from "../Auth/Login"
import Register from "../Auth/Register"
import Dashboard from "../dashboard/Dashboard"
import AddTradeDetailsForm from "../dashboard/TradeDetails/AddTradeDetailsForm"
import EditTradeDetailsForm from "../dashboard/TradeDetails/EditTradeDetailsForm"
import ProfileForm from "../dashboard/Profile/ProfileForm"
import TradeDetailsPage from "../blog/TradeDetails/TradeDetailsPage"
import SinglePairDetails from "../blog/TradeDetails/SinglePairDetails"
import CandleImageDetail from "../dashboard/CandlesImages/CandleImageDetail"
import Signals from "../blog/Signals"

const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/services' component={Services} />
          <Route exact path='/pricing' component={Pricing} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/profile' component={ProfileForm} />
          <Route exact path='/mtego' component={Dashboard} />


          <Route exact path='/blog' component={Blog} />
          <Route exact path='/signals' component={Signals} />
          <Route path="/trade-details/:id" component={TradeDetailsPage} />
          <Route path="/trade-all-details/:id" component={SinglePairDetails} />
          <Route path="/candleimages/:id" component={CandleImageDetail} />

     
          <Route exact path="/mtego/add-trade" element={<AddTradeDetailsForm />} />
          <Route exact path="/mtego/edit-trade/:tradeId" element={<EditTradeDetailsForm />} />
          
        </Switch>
        <Footer />
      </Router>
    </>
  )
}

export default Pages
