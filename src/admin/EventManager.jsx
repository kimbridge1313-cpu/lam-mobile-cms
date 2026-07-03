import { Link } from "react-router-dom";
import { eventSessions, featuredEvents } from "../data/mockData.js";

export default function EventManager() {
  return (
    <div className="admin-page-stack">
      <section className="admin-page-heading">
        <div>
          <p className="eyebrow">Events</p>
          <h2>活動管理</h2>
          <p>建立活動、管理場次名額，之後可接預約與 LINE 通知。</p>
        </div>
        <Link to="/admin/events/new" className="button button-primary compact-button">
          新增
        </Link>
      </section>

      <section className="stack-list">
        {featuredEvents.map((event) => {
          const sessions = eventSessions.filter((session) => session.eventId === event.id);
          return (
            <article className="manager-card" key={event.id}>
              <div className="manager-card-media event-media">{event.dateLabel}</div>
              <div className="manager-card-body">
                <div className="meta-row">
                  <span>{event.location}</span>
                  <span className={`status-pill status-${event.status}`}>{event.status}</span>
                </div>
                <h3>{event.title}</h3>
                <p>{event.summary}</p>
                <div className="event-progress">
                  <span>預約 {event.booked} / {event.capacity}</span>
                  <div><i style={{ width: `${Math.min(100, (event.booked / event.capacity) * 100)}%` }} /></div>
                </div>
                <div className="session-list">
                  {sessions.map((session) => (
                    <span key={session.id}>{session.date} {session.startTime}-{session.endTime}</span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
