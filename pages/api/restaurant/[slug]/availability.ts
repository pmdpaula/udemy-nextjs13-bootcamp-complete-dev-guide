import { NextApiRequest, NextApiResponse } from 'next';

import { times } from '../../../../data/times';
import { prisma } from '../../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(404).json({ message: 'Unknown endpoint' });
  }

  const { slug, day, time, partySize } = req.query as {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  };

  if (!slug || !day || !time || !partySize) {
    return res.status(400).json({ errorMessage: 'Invalid data provided' });
  }

  const searchTimes = times.find((item) => item.time === time)?.searchTimes;

  if (!searchTimes) {
    return res.status(400).json({ errorMessage: 'Invalid time provided' });
  }

  const bookings = await prisma.bookings.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });

  const bookingTablesObj: { [key: string]: { [key: number]: true } } = {};

  bookings.forEach((booking) => {
    bookingTablesObj[booking.booking_time.toISOString()] = booking.tables.reduce(
      (acc, table) => {
        return {
          ...acc,
          [table.table_id]: true,
        };
      },
      {},
    );
  });

  const restaurant = await prisma.restaurants.findUnique({
    where: {
      slug,
    },
    select: {
      tables: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    return res.status(400).json({ errorMessage: 'Invalid restaurant provided' });
  }

  const { tables } = restaurant;

  const searchTimesWithTables = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables: tables,
    };
  });

  searchTimesWithTables.forEach((searchTime) => {
    searchTime.tables = searchTime.tables.filter((table) => {
      if (bookingTablesObj[searchTime.date.toISOString()]) {
        if (bookingTablesObj[searchTime.date.toISOString()][table.id]) {
          return false;
        }
      }

      return true;
    });
  });

  const availabilities = searchTimesWithTables
    .map((searchTime) => {
      const sumSeats = searchTime.tables.reduce((acc, table) => {
        return acc + table.seats;
      }, 0);

      return {
        time: searchTime.time,
        available: sumSeats >= parseInt(partySize),
      };
    })
    .filter((availability) => {
      const timeIsAfterOpeningHour =
        new Date(`${day}T${availability.time}`) >=
        new Date(`${day}T${restaurant.open_time}`);

      const timeIsBeforeClosingHour =
        new Date(`${day}T${availability.time}`) <=
        new Date(`${day}T${restaurant.close_time}`);

      return timeIsAfterOpeningHour && timeIsBeforeClosingHour;
    });

  res.status(200).json(availabilities);
};

export default handler;
