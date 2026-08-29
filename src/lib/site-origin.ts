export function getVeloraSiteOrigin(
  value:
    string | undefined =
      process.env
        .NEXT_PUBLIC_SITE_URL,
): string | null {
  const candidate =
    value?.trim();

  if (!candidate) {
    return null;
  }

  try {
    const url =
      new URL(
        candidate,
      );

    if (
      url.protocol !==
        "http:" &&
      url.protocol !==
        "https:"
    ) {
      return null;
    }

    return url.origin;
  } catch {
    return null;
  }
}