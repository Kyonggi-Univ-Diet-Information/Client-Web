interface SetAuthCookiesParams {
  accessToken: string;
}

export async function setAuthCookies({
  accessToken,
}: SetAuthCookiesParams): Promise<void> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accessToken,
    }),
  });

  if (!response.ok) {
    throw new Error('쿠키 저장에 실패했습니다.');
  }
}
