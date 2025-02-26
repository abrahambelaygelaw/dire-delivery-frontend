import apiCall from '@/base-api/api';
import { orderTrack } from '@/types/orderTrack';
import { endPoints } from '@/data/endPoints';

const BaseURL = 'https://api.example.com';
const url = `${BaseURL}/${endPoints.anOrder}`;
export const TrackOrder = async ({ id }: orderTrack) => {
  console.log('id:', id);
  console.log('url:', url);
  const fetchURl = `${url}?${id}`;
  const response = await apiCall({ url: fetchURl });
  return response;
};
