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

const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/services' component={Services} />
          <Route exact path='/blog' component={Blog} />
          <Route exact path='/pricing' component={Pricing} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/mtego' component={Dashboard} />
          <Route exact path="/mtego/add-trade" element={<AddTradeDetailsForm />} />
          <Route exact path="/mtego/edit-trade/:tradeId" element={<EditTradeDetailsForm />} />
          
        </Switch>
        <Footer />
      </Router>
    </>
  )
}

export default Pages
