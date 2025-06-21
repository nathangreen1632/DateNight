export interface DateIdea {
  id?: string; // optional for generated ideas
  idea: string;
  mood?: string;
  budget?: string;
}

export interface Favorite {
  id: string;
  idea: string;
  mood?: string;
  budget?: string;
  createdAt: string;
}
