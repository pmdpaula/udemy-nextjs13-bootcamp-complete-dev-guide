import * as jose from 'jose';
import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line no-unused-vars
const middleware = async (req: NextRequest, res: NextResponse) => {
  const bearerToken = req.headers.get('authorization');

  if (!bearerToken) {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized request' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // return res.status(401).json({ message: 'Unauthorized request' });
  }

  const token = bearerToken.split(' ')[1];

  if (!token) {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized request' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // return res.status(401).json({ message: 'Unauthorized request' });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized request' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // return res.status(401).json({ message: 'Unauthorized request' });
  }
};

export const config = {
  matcher: ['/api/auth/me'],
};

export default middleware;
