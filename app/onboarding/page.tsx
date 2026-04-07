'use client';
import { submitOnboarding } from "@/lib/api/auth";
import { brands } from "@/lib/dummyData";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Category = "Beverages" | "Sports" | "Technology" | "Food";

const categories: Category[] = [
  "Beverages",
  "Sports",
  "Technology",
  "Food",
];



export default function Onboarding() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Submit handler
  const handleSubmit = async () => {
    if (selectedBrands.length === 0) {
      toast.error("Please select at least one brand");
      return;
    }

    setLoading(true);

    try {
      const data = await submitOnboarding(selectedBrands);

      if (data.success) {
        // ✅ Save ONLY codes
        localStorage.setItem(
          "public_pages",
          JSON.stringify({
            brands: selectedBrands,
          })
        );

        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Onboarding error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Toggle using code
  const toggleBrand = (code: string) => {
    setSelectedBrands((prev) =>
      prev.includes(code)
        ? prev.filter((c) => c !== code)
        : [...prev, code]
    );
  };

  const handleStepClick = (targetStep: number) => {
    if (targetStep === 1) setStep(1);
    if (targetStep === 2 && selectedCategory) setStep(2);
  };

  const filteredBrands = selectedCategory
    ? brands.filter((b) => b.category === selectedCategory)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">

        {/* Stepper */}
        <div className="flex justify-between mb-6 text-sm font-medium">
          <button
            onClick={() => handleStepClick(1)}
            className={`${
              step === 1
                ? "text-[#25D366]"
                : "text-gray-400"
            } cursor-pointer`}
          >
            Step 1
          </button>

          <button
            onClick={() => handleStepClick(2)}
            className={`flex-1 text-right ${
              step === 2
                ? "text-[#25D366]"
                : "text-gray-400"
            } ${!selectedCategory ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Step 2
          </button>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
              Select Your Interest
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Choose a niche that interests you the most
            </p>

            <div className="grid grid-cols-2 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedBrands([]);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedCategory === cat
                      ? "bg-[#25D366] text-white border-[#25D366]"
                      : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              disabled={!selectedCategory}
              onClick={() => setStep(2)}
              className="mt-6 w-full bg-[#25D366] hover:bg-[#20BA5A] disabled:bg-gray-300 text-white font-medium py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Continue
            </button>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
              Select Brands
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Pick brands you want to follow
            </p>

            <div className="space-y-3">
              {filteredBrands.map((brand) => (
                <label
                  key={brand.code}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition ${
                    selectedBrands.includes(brand.code)
                      ? "bg-[#25D366] text-white border-[#25D366]"
                      : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                  }`}
                >
                  <span className="font-medium">{brand.name}</span>

                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand.code)}
                    onChange={() => toggleBrand(brand.code)}
                    className="hidden"
                  />
                </label>
              ))}
            </div>

            <button
              disabled={selectedBrands.length === 0 || loading}
              onClick={handleSubmit}
              className="mt-6 w-full bg-[#25D366] hover:bg-[#20BA5A] disabled:bg-gray-300 text-white font-medium py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? "Saving..." : "Finish"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}