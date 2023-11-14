'use client';

import { CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

import { partySize } from '../../../../data';
import { times } from '../../../../data/times';
import useAvialabilities from '../../../../hooks/useAvialabilities';
import { convertToDisplayTime } from '../../../../utils/convertToDisplayTime';

interface ReservationCardProps {
  openTime: string;
  closeTime: string;
  slug: string;
}

export const ReservationCard = ({ openTime, closeTime, slug }: ReservationCardProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>(openTime);
  const [selectedPartySize, setSelectedPartySize] = useState<number>(2);
  const [selectedDay, setSelectedDay] = useState<string>(
    new Date().toISOString().split('T')[0],
  );

  const { data, error, loading, fetchAvailabilities } = useAvialabilities();

  function handleChangeDate(date: Date | null) {
    if (date) {
      const day = date.toISOString().split('T')[0];
      setSelectedDay(day);
    }

    setSelectedDate(date);
  }

  function filterTimeByRestaurantOpenWindow() {
    const timesWithinWindow: typeof times = [];
    let isWithinWindow = false;

    times.forEach((time) => {
      if (time.time === openTime) {
        isWithinWindow = true;
      }

      if (isWithinWindow) {
        timesWithinWindow.push(time);
      }

      if (time.time === closeTime) {
        isWithinWindow = false;
      }
    });

    return timesWithinWindow;
  }

  function handleClick() {
    fetchAvailabilities({
      slug,
      day: selectedDay,
      time: selectedTime,
      partySize: selectedPartySize,
    });
  }

  return (
    <div className="fixed bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select
          name=""
          className="py-3 border-b font-light"
          id=""
          value={selectedPartySize}
          onChange={(e) => setSelectedPartySize(Number(e.target.value))}
        >
          {partySize.map((size) => (
            <option
              key={size.value}
              value={size.value}
            >
              {size.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className="py-3 border-b font-light text-reg w-12"
            dateFormat="d MMM"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select
            name=""
            id=""
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="py-3 border-b font-light"
          >
            {filterTimeByRestaurantOpenWindow().map((time) => (
              <option
                key={time.time}
                value={time.time}
              >
                {time.displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          onClick={handleClick}
          className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress
              size={12}
              color="inherit"
            />
          ) : (
            'Find a Table'
          )}
        </button>
      </div>
      {data && data.length ? (
        <div className="mt-4">
          <p className="text-reg">Select a Time</p>
          <div className="flex flex-wrap mt-2">
            {data.map((time) => {
              return time.available ? (
                <Link
                  key={time.time}
                  href={`/reserve/${slug}?date=${selectedDay}T${time.time}&partySize=${selectedPartySize}`}
                  className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3"
                >
                  <p className="text-sm font-bold">{convertToDisplayTime(time.time)}</p>
                </Link>
              ) : (
                <p
                  key={time.time}
                  className="bg-gray-300 p-2 w-24 mb-3 rounded mr-3"
                >
                  --{time.available}--
                </p>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};
