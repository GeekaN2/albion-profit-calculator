export default async function({ $auth, redirect }) {
  const admin = ['admin'];

  if (!admin.includes($auth.user.role)) {
    redirect('/');
  }
}