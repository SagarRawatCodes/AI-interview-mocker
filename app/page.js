import { Button } from "@/components/ui/button";

export default function Home() {
  return (

    <div className="bg-gray-200 h-screen flex items-center justify-center">
    <div className="bg-white p-10 rounded-lg shadow-xl text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4 hover-scale">
            Ai-interview-Mocker
        </h1>
        <p className="text-lg text-gray-700 mb-6">
            Practice for your dream job!
        </p>
        <div className="mt-8">
          <a href="/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fdashboard">
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full hover-scale">
                Start Practicing Now
            </button></a>
            <p className="mt-4 text-sm text-gray-500">
                Powered by AI for realistic interview simulations.
            </p>
        </div>
    </div>
</div>
    
  );
}