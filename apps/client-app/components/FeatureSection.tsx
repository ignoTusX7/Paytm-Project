import React from 'react';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Secure Payments</h3>
            <p className="text-gray-700">We ensure the security of your transactions using the latest encryption technologies.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Convenient Interface</h3>
            <p className="text-gray-700">Our user-friendly interface makes payments quick and hassle-free.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
            <p className="text-gray-700">Our support team is available round the clock to assist you with any queries or issues.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
