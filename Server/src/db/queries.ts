import { db } from "./index";
import { eq } from "drizzle-orm";
import {
    users,
    products,
    comments,
    type NewUser,
    type NewProduct,
    type NewComment
} from "./schema";
export type UpdateUserInput = Pick<NewUser, "email" | "name" | "imageUrl">;
export type UpdateProductInput = Pick<NewProduct, "title" | "description" | "imageUrl">;

// USER QUERIES
export const createUser = async (data: NewUser) => {
  const [user] = await db.insert(users).values(data).returning();
  return user;
};

export const getUserById = async (id: string) => {
  return db.query.users.findFirst({ where: eq(users.id, id) });
};

export const updateUser = async (id: string, data: Partial<UpdateUserInput>) => {
  const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning();
  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }
  return user;
};

// upsert => create or update

export const upsertUser = async (data: NewUser) => {
  // this is what we have done first
  // const existingUser = await getUserById(data.id);
  // if (existingUser) return updateUser(data.id, data);

  // return createUser(data);

  // and this is what CR suggested
  const [user] = await db
    .insert(users)
    .values(data)
    .onConflictDoUpdate({
      target: users.id,
      set: {
        email: data.email,
        name: data.name,
        imageUrl: data.imageUrl,
        updateAt: new Date(),
      },
    })
    .returning();
  return user;
};

// PRODUCT QUERIES
export const createProduct = async (data: NewProduct) => {
  const [product] = await db.insert(products).values(data).returning();
  return product;
};

export const getAllProducts = async () => {
  return db.query.products.findMany({
    with: { user: true },
    orderBy: (products, { desc }) => [desc(products.createdAt)], // desc means: you will see the latest products first
    // the square brackets are required because Drizzle ORM's orderBy expects an array, even for a single column.
  });
};

export const getProductById = async (id: string) => {
  return db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      user: true,
      comments: {
        with: { user: true },
        orderBy: (comments, { desc }) => [desc(comments.createdAt)],
      },
    },
  });
};

export const getProductsByUserId = async (userId: string) => {
  return db.query.products.findMany({
    where: eq(products.userId, userId),
    with: { user: true },
    orderBy: (products, { desc }) => [desc(products.createdAt)],
  });
};

export const updateProduct = async (id: string, data: Partial<UpdateProductInput>) => {
  const [product] = await db.update(products).set(data).where(eq(products.id, id)).returning();
  if (!product) {
    throw new Error(`Product with id ${id} not found`);
  }
  return product;
};

export const deleteProduct = async (id: string) => {
  const [product] = await db.delete(products).where(eq(products.id, id)).returning();
  if (!product) {
    throw new Error(`Product with id ${id} not found`);
  }
  return product;
};

// COMMENT QUERIES
export const createComment = async (data: NewComment) => {
  const [comment] = await db.insert(comments).values(data).returning();
  return comment;
};

export const deleteComment = async (id: string) => {
  const [comment] = await db.delete(comments).where(eq(comments.id, id)).returning();
  if (!comment) {
    throw new Error(`Comment with id ${id} not found`);
  }
  return comment;
};

export const getCommentById = async (id: string) => {
  return db.query.comments.findFirst({
    where: eq(comments.id, id),
    with: { user: true },
  });
};