export type ServerActionResult = { success: boolean; error?: string };

export async function runServerAction(
  fn: () => Promise<void>,
  fallbackError: string,
): Promise<ServerActionResult> {
  try {
    await fn();
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : fallbackError,
    };
  }
}
