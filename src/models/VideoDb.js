import mongoose from "mongoose";

 

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  fileUrl: {type: String, required: true},
  thumbUrl: {type: String, required: true},
  description: { type: String, required: true, trim: true },
  createdAt: { type: Date, required: true, default: Date.now }, // Date.now()에서 ()을 빼는 이유는 바로 실행하는걸 막기위해서.
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
  comments: [{type: mongoose.Schema.Types.ObjectId, required: true, ref:"Comment"}],
  owner: {type: mongoose.Schema.Types.ObjectId, required: true, ref:"User" },
});

videoSchema.static('formatHashtags',function(hashtags){
    return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
}
)

const videoModel = mongoose.model("Video", videoSchema);

export default videoModel;
