export const baseUrl = "https://api.slingacademy.com/v1/sample-data/blog-posts";
type QueryItem = string | string[] | undefined;

export async function fetchPosts(offset: QueryItem, limit: QueryItem) {
  const offsetParam = Array.isArray(offset) ? offset[0] : offset;
  const limitParam = Array.isArray(limit) ? limit[0] : limit;

  const offsetNumber = Number(offsetParam);
  const limitNumber = Number(limitParam);
  const res = await fetch(
    `${baseUrl}?offset=${
      offsetNumber * limitNumber - limitNumber
    }&limit=${limitNumber}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}
export async function fetchPost(id: QueryItem) {
  if (!id) return;

  const idParam = Array.isArray(id) ? id[0] : id;
  const res = await fetch(`${baseUrl}/${idParam}`);
  return res.json();
}
