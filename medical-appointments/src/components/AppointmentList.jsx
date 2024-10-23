import React, { useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function AppointmentList({ appointments, fetchAppointments }) {
    const [editingId, setEditingId] = useState(null);
    const [editingData, setEditingData] = useState({ patientName: '', appointmentDateTime: '' });

    const handleEdit = (appointment) => {
        setEditingId(appointment.id);
        setEditingData({ patientName: appointment.patientName, appointmentDateTime: appointment.appointmentDateTime });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const appointmentRef = doc(db, 'appointments', editingId);
        await updateDoc(appointmentRef, editingData);
        setEditingId(null);
        setEditingData({ patientName: '', appointmentDateTime: '' });
        fetchAppointments();
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, 'appointments', id));
        fetchAppointments();
    };

    return (
        <div>
            <h2>Listado de Citas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre del Paciente</th>
                        <th>Fecha y Hora de la Cita</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            {editingId === appointment.id ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            value={editingData.patientName}
                                            onChange={(e) => setEditingData({ ...editingData, patientName: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="datetime-local"
                                            value={editingData.appointmentDateTime}
                                            onChange={(e) => setEditingData({ ...editingData, appointmentDateTime: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={handleUpdate}>Guardar</button>
                                        <button onClick={() => setEditingId(null)}>Cancelar</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{appointment.patientName}</td>
                                    <td>{new Date(appointment.appointmentDateTime).toLocaleString()}</td>
                                    <td>
                                        <button onClick={() => handleEdit(appointment)}>Editar</button>
                                        <button onClick={() => handleDelete(appointment.id)}>Eliminar</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AppointmentList;
