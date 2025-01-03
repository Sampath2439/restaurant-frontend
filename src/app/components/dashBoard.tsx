"use client"
import React, { useEffect, useState } from "react";

interface Booking {
  name: string;
  date: string;
  time: string;
  guests: number;
  contact: string;
  id: string;
}

const Dashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('https://database.sampath.cloud/api/getAllBookings');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings.');
        }
        const data = await response.json();
        setBookings(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5001/api/deleteBooking/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete booking.');
      }
      setBookings(bookings.filter(booking => booking.id !== id));
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div
      className="p-8 min-h-screen"
      style={{
        backgroundImage: `url('img.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-2xl font-bold mb-6 text-center text-white">All Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden ">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4">Guests</th>
              <th className="py-2 px-4">Contact</th>
              <th className="py-2 px-4">Action</th> {/* Added action column */}
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{booking.name}</td>
                <td className="py-2 px-4">{booking.date}</td>
                <td className="py-2 px-4">{booking.time}</td>
                <td className="py-2 px-4">{booking.guests}</td>
                <td className="py-2 px-4">{booking.contact}</td>
                <td className="py-2 px-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(booking.id)} // Assuming booking has an id field
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default Dashboard;