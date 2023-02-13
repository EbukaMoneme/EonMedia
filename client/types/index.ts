export interface Video {
  _id: string;
  published: boolean;
  videoId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  extension: string;
  description: string;
  title: string;
  thumbnail: any;
}
