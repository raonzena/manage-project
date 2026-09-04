export function formatToday(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
}

export function formatDue(value: string | null) {
  return value
    ? new Intl.DateTimeFormat("ko-KR", {
        month: "short",
        day: "numeric",
      }).format(new Date(`${value}T00:00:00`))
    : "미정";
}

export function formatRelativeDate(value: string, now: Date) {
  const date = new Date(value);
  const days = Math.floor((now.getTime() - date.getTime()) / 86_400_000);

  return days < 1
    ? new Intl.DateTimeFormat("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(date)
    : `${days}일 전`;
}

export function getInitials(name?: string) {
  return name ? name.trim().slice(0, 2).toUpperCase() : "–";
}
