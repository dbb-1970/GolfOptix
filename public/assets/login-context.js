// Course hints choose form values only. Access always comes from /api/session.
export function loginContext(courses, search) {
  const query = new URLSearchParams(search);
  const courseId = query.get('course'), trackId = query.get('track');
  const signup = query.get('signup') === '1', setup = query.get('setup') === 'crew';
  let course = courseId ? courses.find(c => c.id === courseId) : courses.find(c => c.tracks.some(t => t.id === trackId));
  if (signup && course?.publicDemo) course = undefined;
  const track = trackId ? course?.tracks.find(t => t.id === trackId) : course?.tracks.find(t => t.available);
  const crewSetup = !!(setup && course && !course.publicDemo && track?.available);
  return {course, track, signup: signup && !setup, crewSetup,
    invalid: !!((courseId && !course) || (trackId && !track) || (setup && !crewSetup))};
}

export function loginDestination(user, trackId, crewSetup) {
  const track = user.courses?.find(t => t.id === trackId);
  return track ? (crewSetup ? '/crew/?course=' + encodeURIComponent(track.id) : track.url) : null;
}
