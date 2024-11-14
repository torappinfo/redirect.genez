export const handler = async (event) => {
  const url = event.requestContext.path.substring(1);
  const Url = new URL(url);
  const newReq = new Request(Url, {
    method: event.httpMethod,
    headers: event.headers,
    body: event.body,
    });
  return await fetch(newReq);
};
