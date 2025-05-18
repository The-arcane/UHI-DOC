import React, { useState } from 'react';
import { Calendar, Clock, User, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function DoctorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Updated appointment details
  const appointments = [
    {
      id: 1,
      patientName: 'Raunaq Adlakha',
      time: '10:00 AM',
      type: 'Video Consultation',
      status: 'upcoming'
    }
  ];

  // Set next appointment to tomorrow at 10:00 AM
  const nextAppointment = {
    patientName: 'Raunaq Adlakha',
    time: '10:00 AM',
    date: new Date(new Date().setDate(new Date().getDate() + 1))
  };

  const handleStartCall = (appointmentId) => {
    navigate(`/videocall/${appointmentId}`);
  };

  const handleDownloadPrescription = () => {
    const link = document.createElement('a');
    link.href = '/prescription.pdf';
    link.download = 'prescription.pdf';
    link.click();
  };

  const handleUpdateSettings = () => {
    alert('Settings updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Doctor Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-lg shadow-md">
          <Calendar className="w-8 h-8 text-blue-500 mb-2" />
          <h3 className="text-xl font-semibold mb-2">Today's Appointments</h3>
          <p className="text-3xl font-bold">{appointments.length}</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-lg shadow-md">
          <Clock className="w-8 h-8 text-green-500 mb-2" />
          <h3 className="text-xl font-semibold mb-2">Next Appointment</h3>
          <p className="font-semibold">{nextAppointment.time} - {nextAppointment.patientName}</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-lg shadow-md">
          <User className="w-8 h-8 text-purple-500 mb-2" />
          <h3 className="text-xl font-semibold mb-2">Total Patients</h3>
          <p className="text-3xl font-bold">40</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Upcoming Appointments</h3>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-semibold">{appointment.patientName}</p>
                  <p className="text-sm text-gray-600">{appointment.time} - {appointment.type}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleStartCall(appointment.id)}
                    className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                  >
                    Start
                  </button>
                  <button
                    onClick={handleDownloadPrescription}
                    className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
                  >
                    Prescription
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Patient Records</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-blue-500 mr-2" />
                <div>
                  <p className="font-semibold">Raunaq Adlakha</p>
                  <p className="text-sm text-gray-600">Last visit: May 1, 2024</p>
                </div>
              </div>
              <button className="text-blue-500 hover:text-blue-700">View</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Consultation Hours</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., Mon-Fri, 9 AM - 5 PM"
            />
          </div>
          <div>
            <label className="block mb-1">Consultation Fee</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter amount in ₹"
            />
          </div>
        </div>
        <button
          onClick={handleUpdateSettings}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Update Settings
        </button>
      </div>
    </div>
  );
}

export default DoctorDashboard;
