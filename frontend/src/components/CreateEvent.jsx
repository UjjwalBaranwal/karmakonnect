import React, { useState } from "react";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Created:", eventData);
    // You can now send the data to the server to create the event
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-zinc-200 dark:bg-zinc-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-4">Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-200">Event Title</label>
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-zinc-300 rounded-md dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-200">Event Date</label>
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleInputChange}
            className="w-full p-2 border border-zinc-300 rounded-md dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-200">Location</label>
          <input
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleInputChange}
            className="w-full p-2 border border-zinc-300 rounded-md dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-200">Description</label>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-zinc-300 rounded-md dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-200"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 dark:bg-teal-800 dark:hover:bg-teal-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
