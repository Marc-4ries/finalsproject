import React, { useState } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';

const CreateEvent = () => {
    const [event, setEvent] = useState({
        eventName: '', location: '', date: '', organizer: '', description: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // 1. Save to MongoDB
            await axios.post('http://localhost:5000/api/events', event);
            
            // 2. Send Email via EmailJS
            emailjs.send(
                'service_e761yci', 
                'template_xaeuqza', 
                {
                    event_name: event.eventName,
                    organizer_name: event.organizer,
                    to_email: '20255221@s.ubaguio.edu'
                }, 
                'feahIeQ5KRf17OGTk'
            );

            alert("Event Created and Email Sent!");
        } catch (error) {
            console.error("Error saving event", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Create Community Event</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow">
                <div className="mb-3">
                    <label>Event Name</label>
                    <input type="text" className="form-control" onChange={(e) => setEvent({...event, eventName: e.target.value})} required />
                </div>
                <div className="mb-3">
                    <label>Location</label>
                    <input type="text" className="form-control" onChange={(e) => setEvent({...event, location: e.target.value})} required />
                </div>
                <div className="mb-3">
                    <label>Date</label>
                    <input type="date" className="form-control" onChange={(e) => setEvent({...event, date: e.target.value})} required />
                </div>
                <div className="mb-3">
                    <label>Organizer</label>
                    <input type="text" className="form-control" onChange={(e) => setEvent({...event, organizer: e.target.value})} required />
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea className="form-control" onChange={(e) => setEvent({...event, description: e.target.value})} required />
                </div>
                <button type="submit" className="btn btn-primary">Publish Event</button>
            </form>
        </div>
    );
};

export default CreateEvent;
