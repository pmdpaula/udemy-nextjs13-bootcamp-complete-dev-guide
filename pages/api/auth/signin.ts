/* eslint-disable import/no-named-as-default-member */
import bcrypt from 'bcrypt';
import * as jose from 'jose';
import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';

import { prisma } from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'Unknown endpoint' });
  }

  const { email, password } = req.body;
  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: 'E-mail is not valid',
    },
    {
      valid: validator.isLength(password, { min: 4 }),
      errorMessage: 'Password is not valid',
    },
  ];

  validationSchema.forEach((validation) => {
    if (!validation.valid) {
      errors.push(validation.errorMessage);
    }
  });

  if (errors.length > 0) {
    return res.status(400).json({ errorMessage: errors[0] });
  }

  const userWithEmail = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (!userWithEmail) {
    return res.status(401).json({ errorMessage: 'Some data is wrong. ' });
  }

  const isPasswordValid = await bcrypt.compare(password, userWithEmail.password);

  if (!isPasswordValid) {
    return res.status(401).json({ errorMessage: 'Some data is wrong. ' });
  }

  const alg = 'HS256';
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jose.SignJWT({ email })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret);

  res.status(201).send({ message: token });
};

export default handler;
