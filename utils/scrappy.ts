export async function getUser(user: string) {
  const response = await fetch('https://scrapbook.hackclub.com/api/users/' + user)
  const userData: any = await response.json();

  return userData;
}

export async function getTaggedPosts(user: string, tag: string) {
  const userData = await getUser(user);
  const posts = userData.posts;

  const taggedPosts = posts.filter((post: any) => {
    return post.reactions.some((reaction: any) => reaction.name === tag);
  });

  return taggedPosts;
}
