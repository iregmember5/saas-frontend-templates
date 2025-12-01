// Testimonials Component with hardcoded data

// const Testimonials = () => {
//   const testimonials = [
//     {
//       quote: "I could not imagine staff picking up these manual tasks and having to click through these screens ever again. We're not going back.",
//       name: "Bob Fink",
//       title: "Chief Information Officer",
//       company: "Honkamp, P.C.",
//       rating: 5,
//     },
//     {
//       quote: "The process is so much easier. For our team to be able to see what we asked for and what clients submitted, it's going to increase our efficiency by quite a bit. It's a gamechanger.",
//       name: "Cindy Owens",
//       title: "Software Analyst",
//       company: "Rehmann",
//       rating: 5,
//     },
//     {
//       quote: "If you're even slightly thinking about SignMary, I would jump in the deep end of the pool with no life vest. It's super easy to learn, the team walks you through everything, and customer service is amazing.",
//       name: "Melody Young",
//       title: "Admin Operations Manager",
//       company: "BMS LLC Advisors & CPAs",
//       rating: 5,
//     },
//   ];

//   return (
//     <section id="testimonials" className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
//             Trusted by Industry Leaders
//           </h2>
//           <p className="text-xl text-gray-600">
//             SignMary saves firms thousands of hours every year
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {testimonials.map((testimonial, index) => (
//             <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
//               <div className="flex mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <span key={i} className="text-yellow-400 text-lg">★</span>
//                 ))}
//               </div>
//               <blockquote className="text-gray-600 mb-6 italic">
//                 "{testimonial.quote}"
//               </blockquote>
//               <div className="flex items-center">
//                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
//                   {testimonial.name.split(' ').map(n => n[0]).join('')}
//                 </div>
//                 <div className="ml-4">
//                   <div className="font-semibold text-gray-900">{testimonial.name}</div>
//                   <div className="text-gray-600 text-sm">{testimonial.title}</div>
//                   <div className="text-blue-600 text-sm font-medium">{testimonial.company}</div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
// export default Testimonials;

// Testimonials Component with dynamic data
import React from "react";
import type { SectionProps } from "../component/types";

const Testimonials: React.FC<SectionProps> = ({ data }) => {
  const defaultTestimonials = [
    {
      quote:
        "I could not imagine staff picking up these manual tasks ever again.",
      name: "Bob Fink",
      title: "Chief Information Officer",
      company: "Honkamp, P.C.",
      rating: 5,
    },
    {
      quote: "The process is so much easier. It's a gamechanger.",
      name: "Cindy Owens",
      title: "Software Analyst",
      company: "Rehmann",
      rating: 5,
    },
    {
      quote: "It's super easy to learn and customer service is amazing.",
      name: "Melody Young",
      title: "Admin Operations Manager",
      company: "BMS LLC",
      rating: 5,
    },
  ];
  const testimonials = (
    data?.testimonials?.length ? data.testimonials : defaultTestimonials
  ) as {
    quote: string;
    name: string;
    title: string;
    company: string;
    rating: number;
  }[];

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            {data?.testimonials_head || "Trusted by Industry Leaders"}
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-300">
            {data?.testimonials_introduction || "See what our clients say"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <span
                    key={i}
                    className="text-yellow-400 dark:text-yellow-300 text-lg"
                  >
                    ★
                  </span>
                ))}
              </div>
              <blockquote className="text-gray-600 dark:text-slate-400 mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900 dark:text-slate-100">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 dark:text-slate-400 text-sm">
                    {testimonial.title}
                  </div>
                  <div className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
