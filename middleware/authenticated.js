import LogRocket from 'logrocket';

export default async function({ $auth, redirect }) {
  if (!$auth.user) {
    redirect('/');

    return;
  } 

  if (process.env.ENABLE_LOG_ROCKET == 'true') {
    LogRocket.identify($auth.user.nickname, {
      nickname: $auth.user.nickname,
    });
  }
}