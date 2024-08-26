import RecentBlogImg from "@/public/images/blog/recent-blog.jpg";
import Blog1Img from "@/public/images/blog/blog-1.jpg";
import Blog2Img from "@/public/images/blog/blog-2.png";
import { StaticImageData } from "next/image";

type Category = {
   name: string;
   itemCount: number;
};

export type Blog = {
   dateAdded: string;
   category?: string;
   postedBy?: string;
   title: string;
   description?: string;
   image: string | StaticImageData;
   contents: string;
   id?: string;
   slug: string;
};

export const categories: Category[] = [
   { name: "Fresh Fruit", itemCount: 134 },
   { name: "Vegetables", itemCount: 150 },
   { name: "Cooking", itemCount: 54 },
   { name: "Snacks", itemCount: 47 },
   { name: "Beverages", itemCount: 43 },
   { name: "Beauty & Health", itemCount: 38 },
   { name: "Bread & Bakery", itemCount: 15 },
];

export const recentBlogs = [
   {
      title: "The Future of AI: What to Expect in 2024",
      dateAdded: new Date("2024-04-12"),
      image: RecentBlogImg,
   },
   {
      title: "10 Tips for Effective Remote Work",
      dateAdded: new Date("2024-03-28"),
      image: RecentBlogImg,
   },
   {
      title: "Exploring the Metaverse: Opportunities and Challenges",
      dateAdded: new Date("2024-05-02"),
      image: RecentBlogImg,
   },
];

export const blogs = [
   {
      dateAdded: new Date("2024-04-15"),
      category: "Technology",
      postedBy: "Admin",
      comments: 10,
      title: "The Rise of Quantum Computing",
      description:
         "Quantum computing is rapidly evolving. Explore the basics, potential applications, and challenges in this field.",
      image: Blog1Img,
   },
   {
      dateAdded: new Date("2024-05-05"),
      category: "Lifestyle",
      postedBy: "Others",
      comments: 25,
      title: "Mindfulness Practices for a Balanced Life",
      description:
         "Discover effective mindfulness practices to help you find balance in a fast-paced world.",
      image: Blog2Img, // Placeholder for image import
   },
   {
      dateAdded: new Date("2024-06-01"),
      category: "Science",
      postedBy: "Admin",
      comments: 5,
      title: "Exploring the Mysteries of Dark Matter",
      description:
         "Dark matter makes up a significant portion of the universe. Dive into the mysteries and research surrounding it.",
      image: Blog1Img,
   },
   {
      dateAdded: new Date("2024-05-05"),
      category: "Lifestyle",
      postedBy: "Others",
      comments: 25,
      title: "Mindfulness Practices for a Balanced Life",
      description:
         "Discover effective mindfulness practices to help you find balance in a fast-paced world.",
      image: Blog2Img, // Placeholder for image import
   },
   {
      dateAdded: new Date("2024-06-01"),
      category: "Science",
      postedBy: "Admin",
      comments: 5,
      title: "Exploring the Mysteries of Dark Matter",
      description:
         "Dark matter makes up a significant portion of the universe. Dive into the mysteries and research surrounding it.",
      image: Blog1Img,
   },
   {
      dateAdded: new Date("2024-05-05"),
      category: "Lifestyle",
      postedBy: "Others",
      comments: 25,
      title: "Mindfulness Practices for a Balanced Life",
      description:
         "Discover effective mindfulness practices to help you find balance in a fast-paced world.",
      image: Blog2Img, // Placeholder for image import
   },
   {
      dateAdded: new Date("2024-06-01"),
      category: "Science",
      postedBy: "Admin",
      comments: 5,
      title: "Exploring the Mysteries of Dark Matter",
      description:
         "Dark matter makes up a significant portion of the universe. Dive into the mysteries and research surrounding it.",
      image: Blog1Img,
   },
];
