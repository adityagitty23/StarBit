import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingCart from "../components/FloatingCart";
import CartDrawer from "../components/CartDrawer";
import BackgroundGlow from "../components/BackgroundGlow";

export default function MainLayout({
  children,
}) {
  return (
    <div className="min-h-screen bg-[#FFF7F0] flex justify-center">
      <div
        className="
          w-full
          max-w-[1280px]
          min-h-screen
          px-4
          py-4
          relative
        "
      >
        <BackgroundGlow />

        <Navbar />

        <main>{children}</main>

        <Footer />

        <FloatingCart />

        <CartDrawer />
      </div>
    </div>
  );
}