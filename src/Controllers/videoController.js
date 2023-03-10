import Video from "../models/VideoDb";

export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
};
export const watch = async(req, res) => {
  const id = req.params.id; // Es6 const{ id } = req.params;
  const video = await Video.findById(id);
  if(!video){ // 에러에 걸리는 부분을 if로 처리
    return res.render("404", {pageTitle: "Video not found"});
  }
  return res.render("watch", { pageTitle: video.title, video });  
};


export const getEdit = async(req, res) => {
  const id = req.params.id; // Es6 const{ id } = req.params;
  const video = await Video.findById(id);
  if(!video){
    return res.render("404", { pageTitle: "Video not found"});  
  }
  return res.render("edit", { pageTitle: `Editing ${video.title}`, video });
};
export const postEdit = async (req, res) => {
  const id = req.params.id; // Es6 const{ id } = req.params;
  const {title, description, hashtags} = req.body;
  const video = await Video.findById(id);
  if(!video){
    return res.render("404", { pageTitle: "Video not found"});  
  }
  video.title = title;
  video.description = description;
  video.hashtags = hashtags.split(",").map((word) => word.startsWith('#')? word :`#${word}`);
  await video.save();
  return res.redirect(`/videos/${id}`);
};


export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const search = (req, res) => res.send("Search");
export const deleteVideo = (req, res) => res.send("Delete Video");
