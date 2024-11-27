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

  return (<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-500 px-4">
  <div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full border border-gray-200">
    <h1 className="text-4xl font-bold text-center text-indigo-900 mb-6">
      Parameters
    </h1>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="ip_adress"
          className="block text-sm font-semibold text-purple-800"
        >
          The IP address of your computer:
        </label>
        <input
          type="text"
          id="ip_adress"
          name="ip_adress"
          value={formData.ip_adress}
          onChange={handleChange}
          placeholder="e.g., http://192.168.1.1"
          className="mt-2 block w-full rounded-md border-gray-600 text-gray-600 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300"
          required
        />
      </div>
      <div>
        <label
          htmlFor="classifier_name"
          className="block text-sm font-semibold text-purple-800"
        >
          Classifier Name:
        </label>
        <input
          type="text"
          id="classifier_name"
          name="classifier_name"
          value={formData.input1}
          onChange={handleChange}
          className="mt-2 block w-full rounded-md border-gray-600 text-gray-600 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300"
          required
        />
      </div>
      <div>
        <label
          htmlFor="class_name1"
          className="block text-sm font-semibold text-purple-800"
        >
          Class Name 1:
        </label>
        <input
          type="text"
          id="class_name1"
          name="class_name1"
          value={formData.class_name1}
          onChange={handleChange}
          className="mt-2 block w-full rounded-md border-gray-600 text-gray-600 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300"
          required
        />
      </div>
      <div>
        <label
          htmlFor="class_name2"
          className="block text-sm font-semibold text-purple-800"
        >
          Class Name 2:
        </label>
        <input
          type="text"
          id="class_name2"
          name="class_name2"
          value={formData.class_name2}
          onChange={handleChange}
          className="mt-2 block w-full rounded-md border-gray-600 text-gray-600 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300"
          required
        />
      </div>
      <button
        type="submit"
        className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300 mx-auto shadow-lg"
      >
        <img
          src="/arrow-right.svg"
          alt="Submit"
          className="w-6 h-6 text-white"
        />
      </button>
    </form>
  </div>
</div>)
 }

export default HomePage;