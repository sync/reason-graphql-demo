import { RESTDataSource } from 'apollo-datasource-rest';

export type PostData = {
  data: Post;
};

export type Post = {
  id: string;
  title: string;
  author: string;
  ups: number;
};

export type Subreddit = {
  children: PostData[];
};

export type SubredditData = {
  data: Subreddit;
};

class Reddit extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.reddit.com';
  }

  async subreddit({ name }: { name: string }) {
    const response = await this.get<SubredditData>(`/r/${name}.json`);
    return response && response.data;
  }
}

export default Reddit;
