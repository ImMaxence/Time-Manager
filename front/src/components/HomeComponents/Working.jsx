import React, { useEffect, useState, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { UserIdContext } from '../../context/UserIdProvider';


const Working = ({ role }) => {
  const [events, setEvents] = useState([]);
  const [selectedEventInfo, setSelectedEventInfo] = useState(null);
  const [UpdateInfo, setUpdateInfo] = useState(null);
  const [newStartTime, setNewStartTime] = useState('');
  const [newEndTime, setNewEndTime] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);


  const { selectedUserId, setSelectedUserId } = useContext(UserIdContext);

  useEffect(() => {
    // if (typeof selectedUserId !== 'object') {
    //   return;
    // }

    axios
      .get(`http://localhost:4000/api/workingtimes/${selectedUserId}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` } })
      .then((res) => {
        const events = dataProcessing(res.data.data);
        setEvents(events);
        console.log(events);
      })
      .catch((err) => {
        setEvents([]);
        console.log(err);
      });
  }, [selectedUserId]);



  //   const dataProcessing = (data) => {
  //     const events = [];
  //     data.forEach((item) => {
  //       const startTime = new Date(Date.parse(item.start_time));
  //       const endTime = new Date(Date.parse(item.end_time));


  //       events.push({
  //         id: item.id,
  //         title: 'Working Time',
  //         start: startTime,
  //         end: endTime,
  //         workingTimeData: item, // Gardez les données de l'heure de travail pour afficher les détails
  //       });
  //     });
  //     return events;
  //   };

  const dataProcessing = (data) => {
    const events = [];
    data.forEach((item) => {
      const startTime = parseISO(item.start_time);
      const endTime = parseISO(item.end_time);
      const zonedStartTime = utcToZonedTime(startTime, 'UTC');
      const zonedEndTime = utcToZonedTime(endTime, 'UTC');

      events.push({
        id: item.id,
        // title: 'Working 2Time',
        start: zonedStartTime,
        end: zonedEndTime,
        workingTimeData: item, // Gardez les données de l'heure de travail pour afficher les détails
      });
    });
    return events;
  };

  const renderEventContent = (eventInfo) => {
    const workingTimeData = eventInfo.event.extendedProps.workingTimeData;
    const startTime = utcToZonedTime(parseISO(workingTimeData.start_time), 'UTC');
    const endTime = utcToZonedTime(parseISO(workingTimeData.end_time), 'UTC');
    const formattedStartTime = format(startTime, 'HH:mm');
    const formattedEndTime = format(endTime, 'HH:mm');

    return (
      <div>
        <p> {formattedStartTime}-{formattedEndTime}</p>
      </div>
    );
  };







  //   const handleEventClick = (eventClickInfo) => {
  //     // Lorsqu'un événement est cliqué, affichez ses détails
  //     const workingTimeData = eventClickInfo.event.extendedProps.workingTimeData;
  //     setSelectedEventInfo(workingTimeData);
  //     console.log(workingTimeData);

  // };

  // const handleEventClick = (eventClickInfo) => {

  //     const workingTimeData = eventClickInfo.event.extendedProps.workingTimeData;
  //     const formattedStartTime = workingTimeData.start_time;
  //     const formattedEndTime = workingTimeData.end_time;
  //     // const formattedStartTime = format(parseISO(workingTimeData.start_time), 'dd MMM yyyy HH:mm');
  //     // const formattedEndTime = format(parseISO(workingTimeData.end_time), 'dd MMM yyyy HH:mm');

  //     setSelectedEventInfo({ ...workingTimeData, formattedStartTime, formattedEndTime });
  //     console.log(workingTimeData.start_time);
  //     setUpdateInfo(workingTimeData.id);
  //   };

  const handleEventClick = (eventClickInfo) => {
    const workingTimeData = eventClickInfo.event.extendedProps.workingTimeData;
    const formattedStartTime = format(utcToZonedTime(parseISO(workingTimeData.start_time), 'UTC'), 'dd MMM yyyy HH:mm');
    const formattedEndTime = format(utcToZonedTime(parseISO(workingTimeData.end_time), 'UTC'), 'dd MMM yyyy HH:mm');

    setSelectedEventInfo({ ...workingTimeData, formattedStartTime, formattedEndTime });
    console.log(workingTimeData.start_time);
    setUpdateInfo(workingTimeData.id);
    setShowDeleteModal(true);
    setShowUpdateModal(true);
  };

  const calendarRef = React.createRef();

  const handleUpdate = () => {

    const updatedStartTime = format(parseISO(newStartTime), "yyyy-MM-dd'T'HH:mm:ss'Z'");
    const updatedEndTime = format(parseISO(newEndTime), "yyyy-MM-dd'T'HH:mm:ss'Z'");


    const updatedData = {
      working_time: {
        start_time: updatedStartTime,
        end_time: updatedEndTime,
      },
    };


    axios
      .put(`http://localhost:4000/api/workingtimes/${UpdateInfo}`, updatedData, { headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` } })
      .then((res) => {
        setShowUpdateModal(false);
        const updatedEvent = {
          id: UpdateInfo,
          title: 'Working Time',
          start: new Date(Date.parse(updatedStartTime)),
          end: new Date(Date.parse(updatedEndTime)),
          workingTimeData: res.data.data,
        };

        setEvents((prevEvents) => {
          return prevEvents.map((event) =>
            event.id === UpdateInfo ? updatedEvent : event
          );
        }); console.log('Working time updated:', res.data);
      })
      .catch((err) => {
        console.error('Erreur lors de la mise à jour du working time :', err);
        console.log(updatedStartTime);
        console.log(updatedEndTime);
      });
  };


  const handleDelete = () => {
    if (UpdateInfo) {
      axios
        .delete(`http://localhost:4000/api/workingtimes/${UpdateInfo}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` } })
        .then((res) => {
          setShowDeleteModal(false);
          console.log('Working time deleted:', res.data);

          // Mettez à jour la liste des événements en supprimant l'événement supprimé
          setEvents((prevEvents) => prevEvents.filter((event) => event.id !== UpdateInfo));

          // Effacez les informations sélectionnées
          setSelectedEventInfo(null);

        })
        .catch((err) => {
          console.error('Erreur lors de la suppression du working time :', err);
        });
    }
  };


  const handleCreate = () => {
    // Créez un nouvel événement et envoyez-le au serveur pour la création
    const updatedData = {
      working_time: {
        start_time: newStartTime,
        end_time: newEndTime,
      },
    };

    axios
      .post(`http://localhost:4000/api/workingtimes/${selectedUserId}`, updatedData, { headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` } })
      .then((res) => {
        setShowCreateModal(false);
        // Mettez à jour la liste des événements dans le calendrier avec le nouvel événement créé
        const createdEvent = {
          id: res.data.data.id,
          title: 'Working Time',
          start: new Date(Date.parse(res.data.data.start_time)),
          end: new Date(Date.parse(res.data.data.end_time)),
          workingTimeData: res.data.data,
        };

        setEvents((prevEvents) => [...prevEvents, createdEvent]);

        console.log('Working time created:', res.data);



      })
      .catch((err) => {
        console.error('Erreur lors de la création du working time :', err);
      });
  };


  return (
    <>
      <Modal show={selectedEventInfo !== null} onHide={() => setSelectedEventInfo(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Working Time Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEventInfo ? (
            <div>
              <p>Start Time: {selectedEventInfo.formattedStartTime}</p>
              <p>End Time: {selectedEventInfo.formattedEndTime}</p>

              <Form.Group>
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={newStartTime}
                  onChange={(e) => setNewStartTime(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={newEndTime}
                  onChange={(e) => setNewEndTime(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleUpdate}>
                Update
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          ) : (
            <p>Cliquez sur un événement pour afficher les détails.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedEventInfo(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal for Create Event */}
      <Modal centered show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Working Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={newStartTime}
              onChange={(e) => setNewStartTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={newEndTime}
              onChange={(e) => setNewEndTime(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <div className={`container_main_component wtis ${role === 'employee' ? 'employeeClass' : ''}`}>
        <div className="contain_title_component">
          <h1>Working Times</h1>
          <div className="container_btn_create_wts">
            {/* <Button variant="success" onClick={() => setShowCreateModal(true)}>
              Create
            </Button> */}
            <button onClick={() => setShowCreateModal(true)}>Create</button>
          </div>
          <hr />
        </div>

        <div className="container_full_calendar">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            height="400px"
            eventColor="green"
            dayMaxEventRows={2}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
          />
        </div >
      </div>
    </>
  );



};

export default Working;