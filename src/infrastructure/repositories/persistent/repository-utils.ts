export function mergeById<T extends Readonly<{ id: string }>>(
  baseline: readonly T[],
  overrides: readonly T[],
): readonly T[] {
  const merged =
    new Map<string, T>();

  for (const item of baseline) {
    merged.set(
      item.id,
      item,
    );
  }

  for (const item of overrides) {
    merged.set(
      item.id,
      item,
    );
  }

  return Object.freeze(
    Array.from(
      merged.values(),
    ),
  );
}