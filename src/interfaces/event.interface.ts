export default interface Event {
  id?: number;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  fullDay: boolean;
  authorId: string;
  participantIds?: string[];
  locationId: number;
  color?: string;
}
