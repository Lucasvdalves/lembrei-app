import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Container, Typography, Dialog, TextField, Button, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Navbar from '../Navbar/Navbar';
import ptLocale from '@fullcalendar/core/locales/pt-br';
import axios from 'axios';

const MyAppointmentsPage = () => {
  const [events, setEvents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventStart, setNewEventStart] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  };

  const handleDateClick = (arg) => {
    setNewEventStart(arg.date);
    setDialogOpen(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setNewEventTitle(event.title);
    setNewEventStart(event.start);
    setDialogOpen(true);
  };

  const handleRemoveEvent = async (event) => {
    try {
      await axios.delete(`http://localhost:8080/api/events/${event.id}`);
      setEvents(events.filter((e) => e.id !== event.id));
      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
    }
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null);
    setNewEventTitle('');
    setNewEventStart(null);
    setDialogOpen(false);
  };

  const handleAddOrUpdateEvent = async () => {
    const eventData = {
      title: newEventTitle,
      start: newEventStart,
    };

    try {
      if (selectedEvent) {
        await axios.put(`http://localhost:8080/api/events/${selectedEvent.id}`, eventData);
        setEvents(events.map((e) => (e.id === selectedEvent.id ? { ...e, ...eventData } : e)));
      } else {
        const response = await axios.post('http://localhost:8080/api/events/add', eventData);
        setEvents([...events, response.data]);
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao adicionar ou atualizar evento:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '30px',
          backgroundImage: 'url(https://wallpapercave.com/wp/wp7111933.jpg)', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'white', 
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontFamily: 'cursive' }}>
          Meus Compromissos
        </Typography>
        <Container maxWidth="md" sx={{ height: '90vh', color: 'white' }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={handleDateClick}
            eventClick={(event) => handleEditEvent(event.event)}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            height="100%"
            locale={ptLocale} // Define o idioma para português
          />
        </Container>
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <Box sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              {selectedEvent ? 'Editar Evento' : 'Novo Evento'}
            </Typography>
            <TextField
              fullWidth
              label="Título do Evento"
              variant="outlined"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              sx={{ marginBottom: '20px' }}
            />
            <TextField
              fullWidth
              type="datetime-local"
              label="Horário do Evento"
              variant="outlined"
              value={newEventStart ? new Date(newEventStart).toISOString().slice(0, 16) : ''}
              onChange={(e) => setNewEventStart(e.target.value)}
              sx={{ marginBottom: '20px' }}
              InputLabelProps={{ shrink: true }}
            />
            <Button onClick={handleAddOrUpdateEvent} variant="contained" color="primary" sx={{ marginRight: '10px' }}>
              {selectedEvent ? 'Atualizar' : 'Adicionar'}
            </Button>
            {selectedEvent && (
              <IconButton onClick={() => handleRemoveEvent(selectedEvent)} sx={{ color: 'error.main', marginLeft: '5px' }}>
                <Delete />
              </IconButton>
            )}
          </Box>
        </Dialog>
      </Box>
    </>
  );
};
export default MyAppointmentsPage;
