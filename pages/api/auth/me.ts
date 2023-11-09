/* eslint-disable import/no-named-as-default-member */
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(404).json({ message: 'Unknown endpoint' });
  }

  const bearerToken = req.headers.authorization as string;
  const token = bearerToken?.split(' ')[1];

  const payload = jwt.decode(token) as { email: string };

  if (!payload.email) {
    return res.status(401).json({ message: 'Unauthorized request' });
  }

  const user = await prisma.users.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
      city: true,
    },
  });

  if (!user) {
    return res.status(401).json({ errorMessage: 'Unauthorized request' });
  }

  return res.status(200).send({
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone: user.phone,
    city: user.city,
  });
};

export default handler;
