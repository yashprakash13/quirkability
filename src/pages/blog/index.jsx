import React from "react"
import SingleBlogPost from "../../components/SingleBlogPost"

const Blog = () => {
  return (
    <div className="container mx-auto flex flex-col gap-4 mt-5 md:mt-20 p-3">
      <div className="flex flex-col md:flex-row gap-7 md:flex-wrap">
        <SingleBlogPost
          name={"But Why Should You Choose To Create Online? 5 Reasons Why"}
          onelinerdesc={
            "The greatest reasons to become a digital creator and earn an income on the internet."
          }
          link={"/blog/why-should-you-create-online"}
        />
      </div>
    </div>
  )
}

export default Blog
