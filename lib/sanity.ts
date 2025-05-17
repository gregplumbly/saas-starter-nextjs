import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// This is where you would put your Sanity project configuration
// You'll get these values when you create your project on sanity.io
export const config = {
  projectId: "v4szcru5", // replace with your project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-05-03", // use the latest API version
  useCdn: process.env.NODE_ENV === "production",
};

// Create a client for fetching data
export const client = createClient(config);

// Helper function for generating image URLs with the Sanity Image Pipeline
const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);

// Helper function to generate URLs to your Sanity Studio
export const getStudioUrl = () => {
  const { projectId } = config;
  return `https://${projectId}.sanity.studio/`;
};
