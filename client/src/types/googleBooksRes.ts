export interface GoogleBooksItem {
  id: string,
  subject: string,
  volumeInfo: {
    title: string,
    authors?: string[],
    publishedDate?: string,
    description?: string,
    categories?: string[],
    imageLinks?: {
      thumbnail?: string
    },
    language?: string
  }
}

export interface GoogleBooksResponse {
  kind: string,
  totalItem: number,
  items?: GoogleBooksItem[]
}