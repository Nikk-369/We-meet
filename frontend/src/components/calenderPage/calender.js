// Calendar.js
import React, { useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from 'axios';

function Calendar() {
  const [eventData, setEventData] = useState(null);

  const handleOnClick = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/google"
      );
      console.log(data);
      setEventData(data); // Update state with the submitted data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      {/* Header displaying submitted data */}
      {eventData && (
        <div>
          <h2>Submitted Event Data</h2>
          <p>Title: {eventData.title}</p>
          <p>Description: {eventData.description}</p>
          {/* Add more fields as needed */}
        </div>
      )}

      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
      />
      <Link to="http://localhost:4000/google">
        <Button onClick={handleOnClick}>Add Events</Button>
      </Link>
    </div>
  );
}

export default Calendar;
