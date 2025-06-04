import { supabase } from '@/lib/supabaseClient';
import { getCategories as getAllCategories } from './categoryService';

const transformVideoData = (video) => {
  if (!video) return null;
  return {
    ...video,
    channel: video.profile ? {
      id: video.profile.id,
      name: video.profile.name || video.profile.username,
      avatar: video.profile.avatar_url,
      subscribers: video.profile.subscribers_count || 0,
    } : { name: video.source_type === 'aggregated' ? video.original_source_link || 'External Source' : 'Unknown Channel', avatar: '' },
    category: video.category?.name,
    views: video.views_count,
    likes: video.likes_count,
    uploadedAt: video.published_at ? new Date(video.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A',
    duration: video.duration_seconds ? `${Math.floor(video.duration_seconds / 60)}:${String(video.duration_seconds % 60).padStart(2, '0')}` : 'N/A',
    featured: video.is_featured,
    trending: video.is_trending,
  };
};

export const getVideos = async (filters = {}) => {
  let query = supabase
    .from('videos')
    .select(`
      *,
      category:categories(id, name),
      profile:profiles(id, username, name, avatar_url, subscribers_count)
    `)
    // .eq('published_at', true) // Assuming 'published_at' being true means it's published. This might need to be a filter.
    // For now, let's assume published_at is a timestamp and we want non-null and past/current timestamps
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .order('created_at', { ascending: false });

  if (filters.categoryName && filters.categoryName.toLowerCase() !== 'all') {
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('name', filters.categoryName)
      .single();
    if (categoryError || !categoryData) {
      console.error('Error fetching category ID for filter:', categoryError);
      return [];
    }
    query = query.eq('category_id', categoryData.id);
  }

  if (filters.userId) {
    query = query.eq('user_id', filters.userId);
  }
  
  if (filters.isFeatured) {
    query = query.eq('is_featured', true);
  }

  if (filters.isTrending) {
    query = query.eq('is_trending', true);
  }
  
  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  if (filters.sortBy) {
    query = query.order(filters.sortBy, { ascending: filters.sortOrder === 'asc' });
  } else {
    query = query.order('created_at', { ascending: false }); // Default sort
  }

  if (filters.searchTerm) {
    query = query.or(`title.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%,tags.cs.{${filters.searchTerm}}`);
  }
  
  if (filters.videoIds && filters.videoIds.length > 0) {
    query = query.in('id', filters.videoIds);
  }


  const { data, error } = await query;

  if (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
  return data.map(transformVideoData);
};

export const getVideoById = async (id) => {
  const { data, error } = await supabase
    .from('videos')
    .select(`
      *,
      category:categories(id, name),
      profile:profiles(id, username, name, avatar_url, subscribers_count),
      comments:comments(
        *,
        comment_profile:profiles(id, username, name, avatar_url)
      )
    `)
    .eq('id', id)
    .not('published_at', 'is', null) 
    .lte('published_at', new Date().toISOString())
    .maybeSingle();

  if (error) {
    console.error('Error fetching video by ID:', error);
    return null;
  }
  if (!data) return null;

  try {
    await supabase.rpc('increment_view_count', { video_id_param: id });
  } catch (rpcError) {
    console.error('Error incrementing view count:', rpcError);
  }
  
  const transformedVideo = transformVideoData(data);
  return {
    ...transformedVideo,
    comments: data.comments.map(c => ({
      ...c,
      user: c.comment_profile ? { name: c.comment_profile.name || c.comment_profile.username, avatar: c.comment_profile.avatar_url } : { name: 'Unknown User', avatar: ''}
    })).sort((a,b) => new Date(b.created_at) - new Date(a.created_at)),
  };
};

export const addVideo = async (videoData, userId) => {
  if (!userId) throw new Error("User not authenticated for adding video");

  let categoryId = null;
  if (videoData.category) {
    const categories = await getAllCategories(); // This fetches all categories including 'All'
    const categoryObj = categories.find(c => c.name === videoData.category && c.name !== 'All');
    
    if (categoryObj && categoryObj.id) { // Assuming getCategories returns objects with id
      categoryId = categoryObj.id;
    } else if (videoData.category !== 'All') {
      // Optionally create category if it doesn't exist
      console.warn(`Category '${videoData.category}' not found. Attempting to create.`);
      try {
        const { data: newCategory, error: newCatError } = await supabase
          .from('categories')
          .insert({ name: videoData.category })
          .select('id')
          .single();
        if (newCatError) {
          console.error(`Failed to create category: ${newCatError.message}`);
          throw new Error(`Failed to create category: ${newCatError.message}`);
        }
        categoryId = newCategory.id;
      } catch (e) {
         console.error('Error in category creation during video add:', e);
      }
    }
  }
  
  const videoToInsert = {
    user_id: userId,
    profile_id: userId,
    title: videoData.title,
    description: videoData.description,
    video_url: videoData.videoUrl,
    thumbnail_url: videoData.thumbnailUrl,
    duration_seconds: videoData.durationSeconds,
    category_id: categoryId,
    tags: videoData.tags ? videoData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
    published_at: videoData.publishNow ? new Date().toISOString() : null,
    source_type: videoData.sourceType || 'user_upload',
    original_source_link: videoData.originalSourceLink,
    storage_path: videoData.storagePath,
  };

  const { data, error } = await supabase
    .from('videos')
    .insert(videoToInsert)
    .select()
    .single();

  if (error) {
    console.error('Error adding video to Supabase:', error);
    throw error;
  }
  return transformVideoData(data); 
};

export const getMockVideoUrl = () => "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";