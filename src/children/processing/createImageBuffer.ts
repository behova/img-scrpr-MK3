import axios, { AxiosError } from 'axios';

async function createBuffer(url: string): Promise<Buffer> {
  try {
    const axiosResponse = await axios.get(url, {
      responseType: 'arraybuffer',
    });

    const buffer = Buffer.from(axiosResponse.data, 'binary');

    return buffer;
  } catch (error: any | AxiosError) {
    if (error.response) {
      // Request made and server responded
      //console.error(`Axios sharpProcess ${error.response.status}`);
      throw new Error(`Axios sharpProcess ${error.response.status}`);
    } else if (error.request) {
      // The request was made but no response was received
      //console.error('Axios sharpProcess', error.request);
      throw new Error('Axios sharpProcess', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      //console.error('createBuffer', error);
      throw new Error('createBuffer', error);
    }
  }
}
export default createBuffer;
