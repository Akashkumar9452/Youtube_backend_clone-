import mongoose, {schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new schema(
    {
     videoFile : {
        type: string,
        required: true,
     },
     thubmnail: {
        type : string,
        required: true,
     },
     title: {
        type : string,
        required: true,
     },


      description: {
        type : string,
        required: true,
     },

      duration: {
        type : number, //clodnary
        required: true,
     },

       views: {
        type : Number,
        default : 0,
     },

     isPublished:{
        type: Boolean,
        deafault : true,
     },

     owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
     }
      
      

}, {timestamps: true})

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose("Video", videoSchema)