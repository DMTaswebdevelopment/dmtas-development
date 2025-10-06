export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface TeamBrandsMember {
  title: string;
  teams: TeamMember[];
}
