import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AssessmentPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0c1b30] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="section-title mb-4">
            Assessment <span className="text-[#cdfe71]">Coming Soon</span>
          </h1>
          <p className="text-white/50 text-lg">This page is under construction.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
