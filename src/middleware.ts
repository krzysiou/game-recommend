import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Session } from './hooks/use-session';

import { COOKIE_NAME } from './hooks/use-session';

const validationPaths = ['/login', '/register'];

export const config = {
  matcher: ['/login', '/register', '/panel'],
};

const middleware = (request: NextRequest) => {
  const isValidationPath = validationPaths.includes(request.nextUrl.pathname);
  const sessionCookie = request.cookies.get(COOKIE_NAME)?.value;

  const loginUrl = new URL('/login', request.url);
  const panelUrl = new URL('/panel', request.url);

  const now = Date.now();

  if (!sessionCookie && !isValidationPath) {
    return NextResponse.redirect(loginUrl);
  }

  if (sessionCookie && isValidationPath) {
    return NextResponse.redirect(panelUrl);
  }

  if (sessionCookie && !isValidationPath) {
    const session = JSON.parse(sessionCookie) as Session;

    if (sessionCookie && now > session.expire) {
      const response = NextResponse.redirect(loginUrl);

      request.cookies.delete(COOKIE_NAME);
      response.cookies.delete(COOKIE_NAME);

      return response;
    }
  }
};

export { middleware };
