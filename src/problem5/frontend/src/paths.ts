export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
    user: '/dashboard/user/:id',
  },
  errors: { notFound: '/errors/not-found' },
} as const;


export const getUpdateUserPath = (id: string | number) => {
  return `/dashboard/user/${id}`;
};