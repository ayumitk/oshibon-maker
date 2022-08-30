interface Book {
  title: string;
  author: string;
  affiliateUrl: string;
  largeImageUrl: string;
  mediumImageUrl: string;
  smallImageUrl: string;
  publisherName: string;
  isbn: string;
  itemCaption: string;
  amazon?: string;
}

interface Oshibon {
  uid: string;
  title: string;
  pickedBooks: Book[];
}

interface User {
  createdAt: string;
  displayName: string;
  photoUrl: string;
}

export type { Book, Oshibon, User };
