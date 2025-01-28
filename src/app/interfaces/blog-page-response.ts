export interface BlogsPageResponse<Blog> {
  _embedded: {
    blogs: Blog[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
