// submitDisabled

const validateUploadFields = async http => {
  const {client, url, route, reqType, field} = http;
  return new Promise(resolve => {
    let fileErrors = [];
    if (client.trim() === '') fileErrors.push('client');
    if (url.trim() === '') fileErrors.push('url');
    if (route.trim() === '') fileErrors.push('route');
    if (reqType.trim() === '') fileErrors.push('reqType');
    resolve(fileErrors);
  });
};

export default validateUploadFields;
