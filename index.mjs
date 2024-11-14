import fetch from 'node-fetch';
export const handler = async (event) => {
  const path = event.rawPath;
  const url = path.substring(1);
  const Url = new URL(url);
  let opts = {
    method: event.requestContext.http.method,
    headers: event.headers,
  };
  if(event.body)
    opts.body = event.body;
  const newReq = new Request(Url, opts);
  try {
    const responce = await fetch(newReq);
    return {
      statusCode: response.status,
      body: responce.blob(),
      headers: response.headers
    };
  } catch (error) {
    return {statusCode: 500, body: error};
  }
};
