"use server";

import { auth } from "@clerk/nextjs/server";
import { CreatePostInput } from "./types";

import prisma from "./db";

export async function createPost(data: CreatePostInput) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const post = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: userId,
      },
    });

    return {
      success: true,
      data: post,
    };
  } catch (error) {
    console.log("Error creating post:", error);
    return {
      success: false,
      message: "failed to create post",
    };
  }
}

export async function getPostById(postId: string) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true,
      },
    });

    if (!post) {
      return {
        success: false,
        message: "Post not found",
      };
    }
    console.log({ editingPost: post });
    return { success: true, data: post };
  } catch (error) {
    console.log("Database errror:", error);
    return null;
  }
}

export async function getPostForEdit(postId: string) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        authorId: true,
      },
    });

    if (!post) {
      return {
        success: false,
        message: "Post not found",
      };
    }

    if (post.authorId !== userId) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    return {
      success: true,
      data: post,
    };
  } catch (error) {
    console.log("Error fetching posts for edit:", error);
    return {
      success: false,
      message: "failed to fetch post",
    };
  }
}

export async function updatePost(postId: string, data: CreatePostInput) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        authorId: true,
      },
    });

    if (!post) {
      return {
        success: false,
        message: "post not found",
      };
    }

    if (post.authorId !== userId) {
      return {
        success: false,
        message: "you don't have permission to edit this post",
      };
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: data.title,
        content: data.content,
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      data: updatedPost,
    };
  } catch (error) {
    console.log("Error updating post:", error);
    return {
      success: false,
      message: "failed to update post",
    };
  }
}

export async function deletePost(postId: string) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        authorId: true,
      },
    });

    if (!post) {
      return {
        success: false,
        message: "post not found",
      };
    }

    if (post.authorId !== userId) {
      return {
        success: false,
        message: "you don't have permission to edit this post",
      };
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return {
      success: true,
      data: deletedPost,
    };
  } catch (error) {
    console.log("Error deleting post:", error);
    return {
      success: false,
      message: "failed to delete post",
    };
  }
}
