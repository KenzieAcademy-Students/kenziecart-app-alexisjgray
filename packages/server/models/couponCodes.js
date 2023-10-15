import { Schema, model } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const CouponCodesSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
  },
});

const CouponCodes = model("CouponCodes", CouponCodesSchema);

export default CouponCodes;
