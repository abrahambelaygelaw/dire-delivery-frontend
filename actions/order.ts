// import apiCall from '@/base-api/api';
import { orderTrack } from '@/types/orderTrack';
import { endPoints } from '@/data/endPoints';

const BaseURL = process.env.BASE_API;
const url = `${BaseURL}/${endPoints.anOrder}`;
export const TrackOrder = async ({ id }: orderTrack) => {
  console.log('id:', id);
  console.log('url:', url);
  const fetchURl = `${url}?${id}`;
  console.log('fetchURl:', fetchURl);
  //   const response = await apiCall({ url: fetchURl });
  //   return response;
};
