import { Food } from "./food";
import { Recipe } from "./recipe";

export class RecipeFood {
    id: number;
    foodid: number;
    recipeid: number;
    food:Food;
    recipe:Recipe;
}
