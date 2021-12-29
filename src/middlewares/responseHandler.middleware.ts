/* eslint-disable linebreak-style */
export default function responseHandler(req: any, res: any): any {
  const { status = 200 } = res.responseData;
  return res.status(status).json({
    ...res.responseData,
  });
}
