import { http } from 'msw';

export const handlers = [
  // Profile endpoint
  rest.get('/api/profile', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ name: 'Zaphod Beeblebrox', role: 'student' })
    );
  }),

  // View-as simulation endpoint
  rest.get('/api/viewAs', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        current: 'instructor',
        available: ['student', 'ta', 'instructor'],
      })
    );
  }),

  // Drawer menu items
  rest.get('/api/drawer/items', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 'home', label: 'Home' },
        { id: 'courses', label: 'Courses' },
        { id: 'assignments', label: 'Assignments' },
      ])
    );
  }),

  // Quick-access icons (bottom bar)
  rest.get('/api/quickAccess', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 'calendar', label: 'Calendar' },
        { id: 'grades', label: 'Grades' },
        { id: 'messages', label: 'Messages' },
      ])
    );
  }),

  // Chat history stub
  rest.get('/api/chat/history', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { from: 'system', message: 'Welcome to the chat!', timestamp: Date.now() },
      ])
    );
  }),

  // Chat send stub
  rest.post('/api/chat/send', (req, res, ctx) => {
    // echo back the posted message
    return req.json().then((body) =>
      res(
        ctx.status(200),
        ctx.json({ ...body, id: Math.random().toString(36).slice(-8) })
      )
    );
  }),
];

