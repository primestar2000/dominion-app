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
  
  export interface Scripture {
    scripture: string;
    content: string;
  }
  export interface WeekType {
    bible_study_id?: string;
    id: string;
    title: string;
    task?: string;
    scriptures: Scripture[],
    main_points: MainPoint[];
  }
  export interface WeekTypeRequest {
    bible_study_id?: string;
    title: string;
    task?: string;
    scriptures: Scripture[],
    main_points: MainPoint[];

  }
  
  
  export interface StudyType {
    id: string;
    title: string;
    month: string;
    bible_text: Scripture[];
    introduction: string;
  }
  export interface StudyTypeRequest {
    id?: string;
    title: string;
    month: string;
    bible_text: Scripture[];
    introduction: string;
    // weeks: WeekType[];
  }