import React from 'react';

const Steps: React.FC = () => {
  const steps = [
    { title: 'Gather', image: 'path_to_your_image' },
    { title: 'Connect', image: 'path_to_your_image' },
    { title: 'Preparation', image: 'path_to_your_image' },
    { title: 'Delivery', image: 'path_to_your_image' },
  ];

  return (
    <section className="bg-blue-100 py-16 px-4 text-center">
      <h2 className="text-4xl font-bold text-blue-800 mb-2">Streamline Tax Returns in 4 Easy Steps</h2>
      <p className="text-xl text-gray-600 mb-12">E-Sign One is the end-to-end solution for tax and accounting professionals</p>
      <div className="flex flex-wrap justify-between max-w-6xl mx-auto">
        <div className="w-full md:w-1/2 text-left animate-fadeInLeft">
          <h3 className="text-2xl font-bold text-blue-700 mb-4">Automate Tax Intake</h3>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Engagement Letters</li>
            <li>eSignatures</li>
            <li>Document Sourcing</li>
            <li>Client Document Request Lists</li>
            <li>Custom Questionnaires</li>
            <li>Real-Time Completion Tracking</li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 overflow-hidden animate-fadeInRight">
          <div className="flex gap-4 animate-slideImages">
            {steps.map((step, index) => (
              <div key={index} className="min-w-xs bg-white p-4 rounded-lg shadow-lg text-center">
                <h4 className="font-bold text-blue-800 mb-2">{step.title}</h4>
                <img src={step.image} alt={`${step.title} step`} className="w-full h-auto rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
