import axios from 'axios';
import { useState } from 'react';

import { TimeType } from '../utils/convertToDisplayTime';

interface AvailabilitiesProps {
  slug: string;
  partySize: number;
  day: string;
  time: string;
}

type AvailabilityType = {
  time: TimeType;
  available: boolean;
};

const useAvialabilities = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<AvailabilityType[] | null>([]);

  async function fetchAvailabilities({
    slug,
    partySize,
    day,
    time,
  }: AvailabilitiesProps) {
    setLoading(true);

    try {
      const response = await axios.get(`/api/restaurant/${slug}/availability`, {
        params: {
          partySize,
          day,
          time,
        },
      });

      setData(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response.data.errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    data,
    fetchAvailabilities,
  };
};

export default useAvialabilities;
