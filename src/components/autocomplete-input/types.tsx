export interface SelectedStation {
  customerName: string;
  endDate: string;
  id: string;
  pickupReturnStationId: string;
  startDate: string;
}

export interface ApiData {
  id: string;
  name: string;
  bookings: SelectedStation[];
}
