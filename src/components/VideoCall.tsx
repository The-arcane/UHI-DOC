import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

function VideoCall() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showSecondVideo, setShowSecondVideo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnecting(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Show second video 5 seconds after video is turned on
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isVideoOn) {
      timeout = setTimeout(() => setShowSecondVideo(true), 6000);
    } else {
      setShowSecondVideo(false);
    }
    return () => clearTimeout(timeout);
  }, [isVideoOn]);

  const handleEndCall = () => {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updatedAppointments = appointments.map((apt: any) => {
      if (apt.id.toString() === appointmentId) {
        return { ...apt, status: 'completed' };
      }
      return apt;
    });
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

    const activities = JSON.parse(localStorage.getItem('adminActivities') || '[]');
    activities.push({
      id: Date.now(),
      type: 'appointment',
      action: 'completed',
      details: `Video consultation completed for appointment ID: ${appointmentId}`,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('adminActivities', JSON.stringify(activities));

    toast.info('Call ended. Please provide your feedback.');
    navigate('/feedback');
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">Video Consultation</h2>
      {isConnecting ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-blue-100 p-4 rounded-md"
        >
          <p className="text-blue-800">Connecting to your appointment...</p>
          <p className="text-blue-600">Waiting for patient to join...</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* User video */}
            <div className="bg-gray-800 aspect-video rounded-lg overflow-hidden">
              {isVideoOn ? (
                <Webcam className="w-full h-full object-cover" audio={!isMuted} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  Camera Off
                </div>
              )}
            </div>

            {/* Second video appears with animation after 5 seconds */}
            <div className="bg-gray-800 aspect-video rounded-lg overflow-hidden">
              {isVideoOn && showSecondVideo ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full"
                >
                  <Webcam className="w-full h-full object-cover" mirrored audio={false} />
                </motion.div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  Patient's camera off
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-500'}`}
            >
              {isMuted ? <MicOff className="text-white" /> : <Mic className="text-white" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-4 rounded-full ${!isVideoOn ? 'bg-red-500' : 'bg-gray-500'}`}
            >
              {isVideoOn ? <VideoIcon className="text-white" /> : <VideoOff className="text-white" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleEndCall}
              className="bg-red-500 p-4 rounded-full"
            >
              <PhoneOff className="text-white" />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoCall;
