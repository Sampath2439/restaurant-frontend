"use client"


interface BookingSuccessModalProps {
  bookingDetails: {
    name: string;
    date: string;
    time: string;
    guests: number;
  };
  closeModal: () => void;
}

const BookingSuccessModal = ({ bookingDetails, closeModal }: BookingSuccessModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96 text-center">
        <div className="mb-4">
          {/* Animation for Success */}
          <div className="animate-pulse text-5xl text-green-500">✅</div>
        </div>
        <h2 className="text-xl font-bold mb-2">Booking Successful!</h2>
        <p className="mb-4">Your booking details are as follows:</p>
        <div className="mb-4">
          <p><strong>Name:</strong> {bookingDetails.name}</p>
          <p><strong>Date:</strong> {bookingDetails.date}</p>
          <p><strong>Time:</strong> {bookingDetails.time}</p>
          <p><strong>Guests:</strong> {bookingDetails.guests}</p>
        </div>
        <button
          onClick={closeModal}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BookingSuccessModal;
