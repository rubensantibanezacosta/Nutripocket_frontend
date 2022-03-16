import { Week } from './week';

export class Diet {
  id: number;
  useremail: string;
  createdAt: Date;
  updatedAt: Date;
  weeks: Week[];
}
