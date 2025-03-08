export type EventCategory = 'all' | 'worship' | 'youth' | 'community' | 'bible';
export type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  description: string;
  category?: EventCategory;
  image?: any;
  isFeatured?: boolean;
};