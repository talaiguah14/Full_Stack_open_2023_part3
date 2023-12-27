const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  return total;
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
      return null; // Retorna null si la lista de blogs está vacía
    }
  
    const favorite = blogs.reduce((prevFavorite, currentBlog) => {
      return (currentBlog.likes > prevFavorite.likes) ? currentBlog : prevFavorite;
    }, blogs[0]);
  
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes,
    };
  };

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
