import React from "react";
import Hero from "../components/Hero";
import Features from "../components/features";
import StartSection from "../components/StartSection";
import CTA from "../components/CTA";
import CarShowcase from "../components/CarShowcase";

const Home = () => {
    return (
        <div>
            <Hero />
            <Features />
            <StartSection />
            <CarShowcase/>
            <CTA />
        </div>
    );
};
export default Home;