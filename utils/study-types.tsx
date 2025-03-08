export interface SubPoint {
    title?: string;
    text?: string;
    sub_points?: string[];
  }
  
  export interface MainPoint {
    title: string;
    text?: string;
    points?: SubPoint[];
  }
  
  export interface WeekType {
    id: string;
    title: string;
    task?: string;
    main_points: MainPoint[];
  }
  
  export interface Scripture {
    scripture: string;
    content: string;
  }
  
  export interface StudyType {
    id: string;
    title: string;
    month: string;
    text: Scripture[];
    introduction: string;
    weeks: WeekType[];
  }