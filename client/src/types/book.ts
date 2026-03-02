export type BookStatus = 'to be read' | 'read';

export interface Book {
  id: string,
  subject: string,
  title: string,
  author: string,
  publishedDate: string | number | null,
  description: string | null
  categories: string[],
  thumbnail: string,
}

export interface SavedBook extends Book {
  status: BookStatus
}