// import HomePage from "../../HomePage/HomePage";

const Hero = () => {
  return (
    <section
      id="methodology"
      className="relative py-12 lg:py-20 bg-gradient-to-br from-white via-blue-50 to-purple-50 overflow-hidden min-h-screen"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col items-center justify-center h-full min-h-screen lg:min-h-[80vh]">
          {/* Full Width HomePage Component */}
          <div className="w-full animate-fade-in-up h-full relative">
            <div className="relative h-full">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse hidden lg:block"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse delay-1000 hidden lg:block"></div>
              {/* HomePage Component Container - Full Width */}
              <div className="relative z-10 w-full h-full min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] rounded-2xl shadow-2xl overflow-auto bg-white border border-gray-200">
                {/* Component wrapper with proper scaling */}
                <div className="w-full h-full transform-gpu">
                  {/* <HomePage /> */}
                  <h1>Home Page</h1> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
