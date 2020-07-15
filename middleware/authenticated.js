export default async function({ $auth, redirect }) {
  if (!$auth.user) {
    redirect('/');
  }
}