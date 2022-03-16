import { Dish } from './dish';

export class Day {
  id: number;
  date: Date;
  useremail: string;
  daycaloriesburn: number;
  daycalorieseaten: number;
  dishes: Dish[];
}
