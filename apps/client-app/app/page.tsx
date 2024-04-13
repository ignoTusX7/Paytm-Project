
import { Footer } from "@ignotus/ui";
import FeaturesSection from "../components/FeatureSection";
import HeroSection from "../components/HeroSection";

export default function Page(): JSX.Element {
  return (
    <div className="">
      <HeroSection />
      <FeaturesSection/>
      <Footer/>
    </div>
  );
}
