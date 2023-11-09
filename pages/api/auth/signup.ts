/* eslint-disable import/no-named-as-default-member */
import bcrypt from 'bcrypt';
import { setCookie } from 'cookies-next';
import * as jose from 'jose';
import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';

import { prisma } from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'Unknown endpoint' });
  }

  const { firstName, lastName, email, phone, city, password } = req.body;
  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isLength(firstName, { min: 2, max: 20 }),
      errorMesssage: 'First name must be between 2 and 20 characters',
    },
    {
      valid: validator.isLength(lastName, { min: 2, max: 20 }),
      errorMesssage: 'Last name must be between 2 and 20 characters',
    },
    {
      valid: validator.isEmail(email),
      errorMesssage: 'E-mail is not valid',
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMesssage: 'Phone is not valid',
    },
    {
      valid: validator.isLength(city, { min: 1 }),
      errorMesssage: 'City is not valid',
    },
    {
      valid: validator.isStrongPassword(password),
      errorMesssage: 'Passowrd is not strong enough',
    },
  ];

  validationSchema.forEach((validation) => {
    if (!validation.valid) {
      errors.push(validation.errorMesssage);
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

  if (userWithEmail) {
    return res.status(409).json({ errorMessage: 'E-mail already registred' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.users.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashedPassword,
        city,
        phone,
      },
    });

    const alg = 'HS256';
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new jose.SignJWT({ email })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(secret);

    setCookie('jwt', token, {
      req,
      res,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 24 * 6,
    });

    res.status(201).send({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      city: user.city,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: 'Something went wrong' });
  }
};

export default handler;
