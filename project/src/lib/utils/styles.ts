type ClassValue = string | boolean | null | undefined | Record<string, boolean>;

export function cn(...classes: ClassValue[]): string {
  return classes
    .flat()
    .filter(Boolean)
    .map(c => {
      if (typeof c === 'string') return c;
      if (typeof c === 'object') {
        return Object.entries(c)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key)
          .join(' ');
      }
      return '';
    })
    .join(' ')
    .trim();
}