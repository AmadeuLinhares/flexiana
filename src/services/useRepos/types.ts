export type ReposProps = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
};

export type searchRepoByCompany = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  url: string;
  collaborators_url: string;
  teams_url: string;
  languages_url: string;
  contributors_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string;
  organization: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
  };
};

export type ContributorsProps = {
  avatar_url: string;
  contributions: number;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
};
