import { FilterQuery } from "mongoose"
import { Offer } from ".";

type OfferQueryType = FilterQuery<Offer>

export default OfferQueryType;