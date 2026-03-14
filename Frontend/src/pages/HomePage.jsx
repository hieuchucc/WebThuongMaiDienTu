import React from "react";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import PromoBanner from "../components/PromoBanner";
import Benefits from "../components/Benefits";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <Categories />
      <FeaturedProducts />
      <PromoBanner />
      <Benefits />
      <Testimonials />
      <Newsletter />
    </div>
  );
}

export default HomePage;