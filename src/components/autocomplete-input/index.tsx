import { useEffect, useState } from "react";
import {
  Calendar,
  DayTile,
  Grid,
  InputWrapper,
  List,
  ModalComponent,
  ReservationBox,
  Wrapper,
} from "./styled";
import axios from "axios";
import { ApiData, SelectedStation } from "./types";

export const AutocompleteInput = () => {
  const [data, setData] = useState<ApiData[]>([]);
  const [matches, setMatches] = useState<ApiData[]>([]);
  const [value, setValue] = useState("");
  const [selectedStation, setSelectedStation] = useState<SelectedStation[]>([]);
  const [selectedReservation, setSelectedReservation] =
    useState<SelectedStation>();
  const [modal, setModal] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://605c94c36d85de00170da8b4.mockapi.io/stations",
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const checkMatch = (e: string) => {
    if (data.length !== 0) {
      const matches = data.filter((station) =>
        station["name"].toLowerCase().includes(e.toLowerCase()),
      );
      setMatches(matches);
      setValue(e);
      setDropdown(true);
    }
  };

  useEffect(() => {
    setDropdown(false);
  }, [selectedStation]);

  const matchingObject = (value: string) => {
    const selectedStationData = data.find(
      (station) => station["name"].toLowerCase() === value.toLowerCase(),
    );
    setSelectedStation(selectedStationData!["bookings"]);
  };

  const [currentWeek, setCurrentWeek] = useState(1);

  const startOfWeek = new Date(`2020-03-01`);
  startOfWeek.setDate(startOfWeek.getDate() + (currentWeek - 1) * 7);

  const handlePrevWeek = () => {
    if (currentWeek > 1) {
      setCurrentWeek(currentWeek - 1);
    }
  };

  const handleNextWeek = () => {
    if (currentWeek < totalWeeks) {
      setCurrentWeek(currentWeek + 1);
    }
  };

  const fetchDetails = async (stationId: string, bookingId: string) => {
    try {
      const response = await axios.get(
        `https://605c94c36d85de00170da8b4.mockapi.io/stations/${stationId}/bookings/${bookingId}`,
      );
      setSelectedReservation(response.data);
      setModal(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffInMilliseconds: number = Math.abs(end.getTime() - start.getTime());

    const days = Math.floor(diffInMilliseconds / (24 * 60 * 60 * 1000));

    return days;
  };

  const totalWeeks = 192;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Wrapper>
      <InputWrapper>
        <input
          id="location"
          onChange={(e) => checkMatch(e.target.value)}
          value={value}
          placeholder="Enter a station name"
        ></input>
        {matches.length > 0 && dropdown && (
          <List>
            {matches.map((match, i) => (
              <li
                key={i}
                onClick={() => {
                  setValue(match["name"]);
                  matchingObject(match["name"]);
                }}
              >
                {match["name"]}
              </li>
            ))}
          </List>
        )}
      </InputWrapper>
      <Calendar>
        <button onClick={handlePrevWeek}>{'<'}</button>

        <Grid>
          {Array.from({ length: 7 }).map((_, index) => {
            const day = new Date(startOfWeek);
            day.setDate(day.getDate() + index);

            const dayEvents = selectedStation.filter(
              (event) =>
                new Date(event.startDate).toDateString() ===
                  day.toDateString() ||
                new Date(event.endDate).toDateString() === day.toDateString(),
            );
            return (
              <DayTile key={index}>
                <div>{day.getDate()}</div>
                <div>{monthNames[day.getMonth()]}</div>
                <div>{day.getFullYear()}</div>
                <div>
                  {dayEvents.map((event, i) => {
                    return (
                      <ReservationBox
                        key={i}
                        onClick={() =>
                          fetchDetails(event.pickupReturnStationId, event.id)
                        }
                        pickup={
                          day.toDateString() ===
                          new Date(event.startDate).toDateString()
                        }
                      >
                        {event.customerName}
                        <p>
                          {day.toDateString() ===
                          new Date(event.startDate).toDateString()
                            ? "Start"
                            : "Finish"}
                        </p>
                      </ReservationBox>
                    );
                  })}
                </div>
              </DayTile>
            );
          })}
        </Grid>
        <button onClick={handleNextWeek}>{'>'}</button>
      </Calendar>
      <ModalComponent
        open={modal}
        footer={null}
        onCancel={() => setModal(false)}
        closable
        centered
        destroyOnClose={true}
        maskClosable={true}
        width={379}
      >
        {selectedReservation && Object.keys(selectedReservation).length > 0 ? (
          <>
            <p>
              <span>Customer Name:</span> {selectedReservation.customerName}
            </p>
            <p>
              <span>Pick up: </span>
              {new Date(selectedReservation.startDate).toDateString()}
            </p>
            <p>
              <span>Drop off: </span>
              {new Date(selectedReservation.endDate).toDateString()}
            </p>
            <p>
              <span>Drop off station: </span>
              {value}
            </p>
            <p>
              <span>Period: </span>
              {calculateDuration(
                selectedReservation.startDate,
                selectedReservation.endDate,
              )}{" "}
              days
            </p>
          </>
        ) : (
          <p>No reservation selected</p>
        )}
      </ModalComponent>
    </Wrapper>
  );
};

export default AutocompleteInput;
