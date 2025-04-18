import { memecoins } from "../../data";

export default defineEventHandler((event) => {
  return memecoins.map((memecoin) => memecoin.id);
});