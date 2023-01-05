import AWS from "aws-sdk";
import fs from "fs";
export const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const uploadImageS3 = async (image: any) => {
  const fileStream = fs.createReadStream(image.path);
  const result = await s3
    .upload({
      Bucket: "cowproject",
      Key: image.filename,
      Body: fileStream,
    })
    .promise();
  return result.Location;
};

export const deleteImageS3 = async (imageKey: string) => {
  const params = { Bucket: "cowproject", Key: imageKey };
  await s3.deleteObject(params, (err, data) => {
    if (err) console.log(err);
    return data;
  });
};
