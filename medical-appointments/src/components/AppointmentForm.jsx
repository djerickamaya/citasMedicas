import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function AppointmentForm({ fetchAppointments }) {
    const [patientName, setPatientName] = useState('');
    const [appointmentDateTime, setAppointmentDateTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'appointments'), {
                patientName,
                appointmentDateTime,
            });
            setPatientName('');
            setAppointmentDateTime('');
            alert('Cita registrada con éxito');
            fetchAppointments(); // Llama a fetchAppointments para actualizar la lista
        } catch (error) {
            console.error('Error al registrar la cita:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre del Paciente:</label>
                <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Fecha y Hora de la Cita:</label>
                <input
                    type="datetime-local"
                    value={appointmentDateTime}
                    onChange={(e) => setAppointmentDateTime(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Registrar Cita</button>
        </form>
    );
}

export default AppointmentForm;
