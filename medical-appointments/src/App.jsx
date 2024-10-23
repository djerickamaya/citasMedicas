import React, { useState, useEffect } from 'react';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

function App() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const querySnapshot = await getDocs(collection(db, 'appointments'));
    const appointmentsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setAppointments(appointmentsData);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
      <h1>Registro de Citas Médicas</h1>
      <AppointmentForm fetchAppointments={fetchAppointments} />
      <AppointmentList appointments={appointments} fetchAppointments={fetchAppointments} />
    </div>
  );
}

export default App;
