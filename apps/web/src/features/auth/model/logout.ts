export async function logout(): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/auth/logout', { method: 'POST' });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return {
        success: false,
        error: data.error || '로그아웃에 실패했습니다.',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Logout failed:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : '로그아웃에 실패했습니다.',
    };
  }
}
