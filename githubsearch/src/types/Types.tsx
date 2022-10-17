export interface ICardComponent {
  data: {
    node: {
      id: any;
      title: string;
      createdAt: string;
      number: number;
      author: { avatarUrl: string; login: string };
      comments: { totalCount: number };
      labels: {
        edges: {
          node: { name: string };
        }[];
      };
    };
  }[];
}
