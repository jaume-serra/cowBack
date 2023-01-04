import AWS from "aws-sdk";

export const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const uploadImageS3 = async (cowId: string, image: any) => {
  const a = await s3
    .upload({
      Bucket: "cowproject",
      Key: cowId,
      Body: image.uri,
    })
    .promise();
  console.log("a :>> ", a);
};
