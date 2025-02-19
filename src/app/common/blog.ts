export interface Blog {
  id: number;
  title: string;
  body: string;
  slug: string;
  tags: string[];
  published: boolean;
  viewCount: number;
  createdAt: Date; // or Date if you plan to parse it
  updatedAt: Date; // or Date if you plan to parse it
  author: string;
  // author: string;
  _links: {
    blogs: {
      href: string;
    };
  };
}
