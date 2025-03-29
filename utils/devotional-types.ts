export type DevotionalItem = {
    id: string;
    title: string;
    date: string;
    memory_verse: {
      content: string;
      scripture: string;
    };
    contents_paragraph: string[];
    food_for_thought: string;
    prayer: string;
  };
export type DevotionalItemRequestType = {
    title: string;
    date: string;
    memory_verse: {
      content: string;
      scripture: string;
    };
    contents_paragraph: string[];
    food_for_thought: string;
    prayer: string;
  };