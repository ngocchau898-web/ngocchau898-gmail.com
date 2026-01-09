
export interface MushroomData {
  id: string;
  name: string;
  thumb: string;
  shape: string;
  color: string;
  size: string;
}

export interface StudentInfo {
  name: string;
  class: string;
}

export interface Answers {
  q1: Record<string, { shape: string; color: string; size: string }>;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: {
    mu: string;
    than: string;
    chan: string;
  };
}
