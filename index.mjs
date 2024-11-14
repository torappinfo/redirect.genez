export const handler = async (event) => {
  const path = event.rawPath;
  const url = path.substring(1);
  const Url = new URL(url);
  const newReq = new Request(Url, {
    method: event.requestContext.http.method,
    headers: event.headers,
    body: event.body,
    redirect: 'follow'
  });
  return await fetch(newReq);
};
