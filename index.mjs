export const handler = async (event) => {
  const path = event.rawPath;
  const url = path.substring(1);
  const Url = new URL(url);
  let opts = {
    method: event.requestContext.http.method,
    headers: event.headers,
    redirect: 'follow'
  };
  if(event.body)
    opts.body = event.body;
  const newReq = new Request(Url, opts);
  return await fetch(newReq);
};
