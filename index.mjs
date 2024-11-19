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
  const response = await fetch(newReq);
  //console.log(response.headers);
  const responseHeaders = {};
  response.headers.forEach((key,value) => {
      const lowerCaseKey = key.toLowerCase();
      responseHeaders.set(lowerCaseKey,value);
    });
  const contentType = response.headers.get('content-type');
  let responseBody;
  let isBase64Encoded = false;
  do {
    if(contentType){
      if(contentType.includes('text/') ||
         contentType.includes('json') ||
         contentType.includes('script')){
      }else if(contentType.includes('image/') ||
        contentType.includes('audio/') ||
        contentType.includes('video/') ||
        contentType.includes('application/')){
        const arrayBuffer = await response.arrayBuffer();
        responseBody = Buffer.from(arrayBuffer).toString('base64');
        isBase64Encoded = true;
        break;
      }
    }
    responseBody = await response.text();
  }while(false);
  return {
    statusCode: response.status,
    headers: responseHeaders,
    body: responseBody,
    isBase64Encoded: isBase64Encoded
  };
};
