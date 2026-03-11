const BASE = 'https://graph.facebook.com/v19.0';
const TOKEN = process.env.META_ACCESS_TOKEN;

export async function searchPublicPages(query: string) {
  try {
    const res = await fetch(
      `${BASE}/pages/search?q=${encodeURIComponent(query)}&fields=id,name,fan_count,category,picture&access_token=${TOKEN}`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error?.message || 'Failed to search pages');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error searching pages:', error);
    throw error;
  }
}

export async function getPageDetails(pageId: string) {
  try {
    const fields = 'id,name,about,fan_count,followers_count,category,picture';
    const res = await fetch(
      `${BASE}/${pageId}?fields=${fields}&access_token=${TOKEN}`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error?.message || 'Failed to get page details');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error getting page details:', error);
    throw error;
  }
}

export async function getPagePosts(pageId: string, limit = 20) {
  try {
    const fields = 'id,message,story,created_time,full_picture,permalink_url,likes.summary(true),comments.summary(true),shares,reactions.summary(true)';
    const res = await fetch(
      `${BASE}/${pageId}/posts?fields=${fields}&limit=${limit}&access_token=${TOKEN}`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error?.message || 'Failed to get page posts');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error getting page posts:', error);
    throw error;
  }
}

export async function getPostComments(postId: string) {
  try {
    const fields = 'id,message,like_count,from,created_time';
    const res = await fetch(
      `${BASE}/${postId}/comments?fields=${fields}&limit=50&access_token=${TOKEN}`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error?.message || 'Failed to get post comments');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error getting post comments:', error);
    throw error;
  }
}
