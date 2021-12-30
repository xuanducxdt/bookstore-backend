export const mockUserData = {
  invalidToken: {
    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  },
  userToken: {
    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYxY2QxZWYzYjA0MGZhNGVkYTBhMzBjMCIsImZ1bGxOYW1lIjoiTGlzYSBOZ3V54buFbiIsImVtYWlsIjoibGlzYUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciJ9LCJpYXQiOjE2NDA4MzMyMzUsImV4cCI6MTY0MzgzMzIzNX0.XezPRzW8McmwXK5t7_rKC-trdq_2k1XlLUOwLtZFMYg',
  },
  adminToken: {
    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYxY2QxZWRiYjA0MGZhNGVkYTBhMzBiZCIsImZ1bGxOYW1lIjoiWHXDom4gxJDhu6ljIiwiZW1haWwiOiJ4ZHRAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY0MDgzMzI0NywiZXhwIjoxNjQzODMzMjQ3fQ.YN-NZAx81o949jYzQPiok3xm6KqsTDfqor8_QLIHukk',
  },
  signUp: [
    {
      fullName: 'Xuân Đức',
      email: 'xdt@gmail.com',
      password: '@Aa1234',
      confirmPassword: '@Aa1234',
    },
    {
      fullName: 'Lisa Nguyễn',
      email: 'lisa@gmail.com',
      password: '@Aa1234',
      confirmPassword: '@Aa1234',
    },
  ],
  signIn: [
    {
      email: 'xdt@gmail.com',
      password: '@Aa1234',
    },
    {
      email: 'lisa@gmail.com',
      password: '@Aa1234',
    },
  ],
};
