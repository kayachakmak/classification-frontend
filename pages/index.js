// pages/index.js
import React, { useState } from "react";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ip_adress: "",
    classifier_name: "",
    class_name1: "",
    class_name2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { ip_adress, classifier_name, class_name1, class_name2 } = formData;

    // Assuming input validation is handled elsewhere
    router.push({
      pathname: "/create_classifier",
      query: { ip_adress, classifier_name, class_name1, class_name2 },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 px-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Parameters:
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label
              htmlFor="ip_adress"
              className="block text-sm font-medium text-gray-700"
            >
              The IP adress of your computer :
            </label>
            <input
              type="text"
              id="ip_adress"
              name="ip_adress"
              value={formData.ip_adress}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-300"
              required
            />
          </div>
          <div>
            <label
              htmlFor="classifier_name"
              className="block text-sm font-medium text-gray-700"
            >
              Classifier Name:
            </label>
            <input
              type="text"
              id="classifier_name"
              name="classifier_name"
              value={formData.input1}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-300"
              required
            />
          </div>
          <div>
            <label
              htmlFor="class_name1"
              className="block text-sm font-medium text-gray-700"
            >
              Class Name 1:
            </label>
            <input
              type="text"
              id="class_name1"
              name="class_name1"
              value={formData.class_name1}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-300"
              required
            />
          </div>
          <div>
            <label
              htmlFor="class_name2"
              className="block text-sm font-medium text-gray-700"
            >
              Class Name 2:
            </label>
            <input
              type="text"
              id="class_name2"
              name="class_name2"
              value={formData.class_name2}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-300"
              required
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-300 mx-auto"
          >
            <img
              src="/arrow-right.svg"
              alt="Submit"
              className="w-6 h-6 text-white"
            />
          </button>
        </form>
      </div>
    </div>
  );
 }

export default HomePage;