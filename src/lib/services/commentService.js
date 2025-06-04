import { supabase } from '@/lib/supabaseClient';

export const addComment = async (videoId, content, userId, parentCommentId = null) => {
  if (!userId) throw new Error("User not authenticated for adding comment");

  const { data, error } = await supabase
    .from('comments')
    .insert({
      video_id: videoId,
      user_id: userId,
      profile_id: userId, 
      content: content,
      parent_comment_id: parentCommentId
    })
    .select(`
      *,
      comment_profile:profiles(id, username, name, avatar_url)
    `)
    .single();
  
  if (error) {
    console.error("Error adding comment:", error);
    throw error;
  }

  return {
    ...data,
    user: data.comment_profile ? { name: data.comment_profile.name || data.comment_profile.username, avatar: data.comment_profile.avatar_url } : { name: 'Unknown User', avatar: ''}
  };
};

export const getComments = async (videoId) => {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      comment_profile:profiles(id, username, name, avatar_url)
    `)
    .eq('video_id', videoId)
    .is('parent_comment_id', null) 
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
  return data.map(c => ({
    ...c,
    user: c.comment_profile ? { name: c.comment_profile.name || c.comment_profile.username, avatar: c.comment_profile.avatar_url } : { name: 'Unknown User', avatar: ''}
  }));
};