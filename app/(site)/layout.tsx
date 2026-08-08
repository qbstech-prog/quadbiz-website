import Footer from "@/components/Footer";
import Header from "@/components/Header";

/**
 * Layout for all standard marketing pages: full site chrome (header + footer).
 * The (landing) group deliberately omits this so pages like Contact stay
 * navigation-free.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
