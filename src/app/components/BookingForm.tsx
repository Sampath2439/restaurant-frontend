"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "./firebaseconfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import BookingSuccessModal from './BookingSuccessModal';
import usePageTitle from './usePageTitle';


const BookingForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<{ name: string; date: string; time: string; guests: number; } | null>(null);
  usePageTitle(selectedTime ? `Booking at ${selectedTime} - Restaurant Booking` : "Restaurant Booking");
  
  const timeSlots = [
    "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", 
    "16:00", "17:00", "18:00", "19:00", "20:00", "21:00",
  ];

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setValue("time", time); // Update the form value
  };


  const onSubmit = async (data: any) => {
    try {
      // Clear messages
      setErrorMessage("");
      setSuccessMessage("");

      // Check for existing bookings in the selected time slot
      const bookingsRef = collection(db, "bookings");
      const q = query(
        bookingsRef,
        where("date", "==", data.date),
        where("time", "==", data.time)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size >= 12) {
        setErrorMessage("All slots are booked for this time. Please choose another slot.");
        return;
      }

      const response = await fetch('http://localhost:5000/api/createBooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send booking data to the server.');
      }
  
      // Save booking to Firebase
     

      // Set the booking details and show the success modal
      setBookingDetails(data);
      setShowModal(true);
    } catch (error: any) {
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    }
  };

  const closeModal = () => {
    setShowModal(false);
    // Reset form and clear selected time when closing the modal
    reset();
    setSelectedTime(null); // Clear selected time
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center "
      style={{ backgroundImage: `url('img.jpg')` }}
    >
      <div className="bg-white bg-opacity-100 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Restaurant Booking
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="text"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">Name is required.</p>
            )}
          </div>

          {/* Date Field */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Date
            </label>
            <input
              {...register("date", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="date"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">Date is required.</p>
            )}
          </div>

          {/* Time Slot Selection */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Select Time *
            </label>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <button
                  type="button"
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedTime === time
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-700 border-gray-300"
                  } focus:outline-none hover:bg-blue-100`}
                >
                  {time}
                </button>
              ))}
            </div>
            {errors.time && (
              <p className="text-red-500 text-sm mt-1">Time is required.</p>
            )}
            <input
              {...register("time", { required: true })}
              type="hidden"
            />
          </div>

          {/* Guests Field */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Number of Guests
            </label>
            <input
              {...register("guests", { required: true, min: 1 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="number"
              placeholder="Enter the number of guests"
            />
            {errors.guests && (
              <p className="text-red-500 text-sm mt-1">
                Number of guests is required.
              </p>
            )}
          </div>

          {/* Contact Field */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Contact Number
            </label>
            <input
              {...register("contact", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="text"
              placeholder="Enter your contact number"
            />
            {errors.contact && (
              <p className="text-red-500 text-sm mt-1">
                Contact number is required.
              </p>
            )}
          </div>

          {/* Error and Success Messages */}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-4 text-center">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="text-green-500 text-sm mt-4 text-center">
              {successMessage}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Confirm Booking
          </button>
        </form>

        {/* Success Modal */}
        {showModal && bookingDetails && (
          <BookingSuccessModal bookingDetails={bookingDetails} closeModal={closeModal} />
        )}
      </div>
    </div>
  );
};

export default BookingForm;
