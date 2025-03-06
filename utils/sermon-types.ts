export type SermonItem = {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  series?: string;
  description: string;
  videoThumbnail?: any;
  audioThumbnail?: any;
  videoLink?: string;
  audioLink: string;
  tags: string[];
  views: number;
  isNew?: boolean;
  fileSize?: {
    video?: string;
    audio: string;
  };
};

export type MediaType = 'video' | 'audio';