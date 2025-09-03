import Image from "next/image";
import HeroSection from "./sections/HeroSection";
import BrandsSection from "./sections/BrandSection";
import RekomendasiKameraSection from "./sections/RekomendasiKameraSection";
import RekomendasiLensaSection from "./sections/RekomendasiLensaSection";

export default function Home() {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 flex flex-col items-center">
      <HeroSection />
      <main className="font-sans flex flex-col space-y-10 mb-24 min-h-screen w-full max-w-7xl">
        <BrandsSection />
        <RekomendasiKameraSection />
        <RekomendasiLensaSection />
      </main>
    </div>
  );
}
