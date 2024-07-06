import { useEffect, useRef, useState } from "react";

import Page from "components/ui/PageLayout";
import { Box, Dialog, useMediaQuery } from "@mui/material";
import CalendarStyled from "components/third-party/calendar/CalendarStyled";

// third-party
import FullCalendar from "@fullcalendar/react";
import { EventInput } from "@fullcalendar/common";
import {
  DateSelectArg,
  EventClickArg,
  EventDropArg,
  EventSourceInput,
} from "@fullcalendar/core";
import interactionPlugin, {
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import timelinePlugin from "@fullcalendar/timeline";
import Toolbar from "components/third-party/calendar/Toolbar";
import { Theme } from "@mui/material/styles";

const Attendance = () => {
  const matchDownSM = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<EventInput>();
  const [calendarView, setCalendarView] = useState<string>();
  const [date, setDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<null | {
    start: Date;
    end: Date;
  }>(null);
  const calendarRef = useRef<FullCalendar>(null);
  //   const { events } = useGetEvents();

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = matchDownSM ? "listWeek" : "dayGridMonth";
      calendarApi.changeView(newView);
      setCalendarView(newView);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownSM]);

  // calendar toolbar events
  const handleDateToday = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleViewChange = (newView: string) => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.changeView(newView);
      setCalendarView(newView);
    }
  };

  const handleDatePrev = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleDateNext = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  // calendar events
  const handleRangeSelect = (arg: DateSelectArg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }

    setSelectedRange({ start: arg.start, end: arg.end });
    setModalOpen(true);
  };

  //   const handleEventSelect = (arg: EventClickArg) => {
  //     if (arg?.event?.id) {
  //       const event = events.find((event) => event.id === arg.event.id);
  //       setSelectedEvent(event);
  //     }

  //     setModalOpen(true);
  //   };

  //   const handleEventUpdate = async ({
  //     event,
  //   }: EventResizeDoneArg | EventDropArg) => {
  //     await updateEvent(event.id, {
  //       allDay: event.allDay,
  //       start: event.start,
  //       end: event.end,
  //     });
  //     setModalOpen(true);
  //   };

  const modalCallback = (openModal: boolean) => {
    // open/close modal based on dialog state
    if (isModalOpen) {
      setSelectedEvent(undefined);
    }
    setModalOpen(openModal);
  };

  const handleModal = () => {
    if (isModalOpen) {
      setSelectedEvent(undefined);
    }
    setModalOpen(!isModalOpen);
  };
  return (
    <div>
      <Page title="Calendar">
        <Box sx={{ position: "relative" }}>
          <CalendarStyled>
            <Toolbar
              date={date}
              view={calendarView!}
              onClickNext={handleDateNext}
              onClickPrev={handleDatePrev}
              onClickToday={handleDateToday}
              onChangeView={handleViewChange}
            />

            <FullCalendar
              weekends
              editable
              droppable
              selectable
              //   events={events as EventSourceInput}
              ref={calendarRef}
              rerenderDelay={10}
              initialDate={date}
              initialView={calendarView}
              dayMaxEventRows={3}
              eventDisplay="block"
              headerToolbar={false}
              allDayMaintainDuration
              eventResizableFromStart
              select={handleRangeSelect}
              //   eventDrop={handleEventUpdate}
              //   eventClick={handleEventSelect}
              //   eventResize={handleEventUpdate}
              height={matchDownSM ? "auto" : 720}
              plugins={[
                listPlugin,
                dayGridPlugin,
                timelinePlugin,
                timeGridPlugin,
                interactionPlugin,
              ]}
            />
          </CalendarStyled>

          {/* Dialog renders its body even if not open */}
          {/* <Dialog
            maxWidth="sm"
            TransitionComponent={PopupTransition}
            fullWidth
            onClose={handleModal}
            open={isModalOpen}
            sx={{
              "& .MuiDialog-paper": { p: 0, bgcolor: "secondary.lighter" },
            }}
          >
            <AddEventForm
              modalCallback={modalCallback}
              event={selectedEvent}
              range={selectedRange}
              onCancel={handleModal}
            />
          </Dialog> */}
          {/* <Tooltip title="Add New Event">
            <SpeedDial
              ariaLabel="add-event-fab"
              sx={{
                display: "inline-flex",
                position: "sticky",
                bottom: 24,
                left: "100%",
                transform: "translate(-50%, -50% )",
              }}
              icon={<Add />}
              onClick={handleModal}
            />
          </Tooltip> */}
        </Box>
      </Page>
    </div>
  );
};

export default Attendance;
