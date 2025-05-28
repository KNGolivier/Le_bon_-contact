import HeroSection from '../components/Herosection';
import Header from '../components/Header';
import PopularCategories from '../components/PopularCategories';
import BecomeProBanner from '../components/BecomeProBanner';
import MetiersList from '../components/MetiersList';
import PromotionSection from '../components/PromotionSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    
   <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <PopularCategories />
      <BecomeProBanner />
      <PromotionSection />
      <Footer />
    </div>
    
  );
}
