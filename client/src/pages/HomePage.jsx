import React from 'react'
import "../css/HomePage.css";
import homeBG from "../assets/homeBG.png"
import Navbar from '../components/navbar';
import Hero from '../components/hero';
import HeroStats from '../components/herostats';
import Features from '../components/features';
import HowItWorks from '../components/howitworks';
import ActionSection from '../components/actionsection';

export default function Homepage() {
  return (
    <div className="homepage">
  
    
    <Hero/>
    <Features/>
    <HowItWorks/>
    <ActionSection/>
    
</div>
  )
}
