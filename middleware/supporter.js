export default async function({ $auth, redirect }) {
  const supporter = ['user', 'supporter', 'admin'];

  if (!supporter.includes($auth.user.role)) {
    redirect('/');
  }
}