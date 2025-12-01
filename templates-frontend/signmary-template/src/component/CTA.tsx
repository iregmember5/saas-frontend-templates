// CTA Component with hardcoded defaults

// // const CTA = () => {
// //   return (
// //     <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
// //       <div className="absolute inset-0 bg-black/10"></div>
// //       <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
// //         <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
// //           Ready to Transform Your Workflow?
// //         </h2>
// //         <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
// //           Join thousands of tax and legal professionals who trust My Powerly for their document signing needs
// //         </p>
// //         <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //           <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-lg flex items-center justify-center">
// //             Start Free Trial
// //             <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
// //           </button>
// //           <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200">
// //             Schedule Demo
// //           </button>
// //         </div>
// //         <div className="mt-8 text-blue-100 text-sm">
// //           No credit card required • 14-day free trial • Cancel anytime
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };
// const CTA = () => {
//   return (
//     <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
//       <div className="absolute inset-0 bg-black/10"></div>
//       <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
//         <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
//           Ready to Transform Your Workflow?
//         </h2>
//         <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//           Join thousands of tax and legal professionals who trust My Powerly for their document signing needs
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-lg flex items-center justify-center">
//             Start Free Trial
//             <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
//           </button>
//           <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200">
//             Schedule Demo
//           </button>
//         </div>
//         <div className="mt-8 text-blue-100 text-sm">
//           No credit card required • 14-day free trial • Cancel anytime
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CTA;

// CTA Component with dynamic data
import React from "react";
import type { SectionProps } from "../component/types";
const CTA: React.FC<SectionProps> = ({ data }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
      <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          {data?.cta_head || "Ready to Transform Your Workflow?"}
        </h2>
        <p className="text-xl text-blue-100 dark:text-blue-200 mb-8 max-w-2xl mx-auto">
          {data?.cta_introduction || "Join thousands of professionals"}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-lg flex items-center justify-center">
            {data?.cta_primary_text || "Start Free Trial"}
            <span className="ml-2">→</span>
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200">
            {data?.cta_secondary_text || "Schedule Demo"}
          </button>
        </div>
        <div className="mt-8 text-blue-100 dark:text-blue-200 text-sm">
          {data?.cta_offer || "No credit card required • 14-day free trial"}
        </div>
      </div>
    </section>
  );
};
export default CTA;
