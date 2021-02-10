export default async function({ $auth, redirect }) {
  const supporter = ['supporter', 'admin'];

  if (!supporter.includes($auth.user.role)) {
    redirect('/');
  }
}