
import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Calendar, User, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const blogPosts = [
  // {
  //   id: '1',
  //   title: 'The Future of Interactive Video Content',
  //   date: '2025-05-20',
  //   author: 'Jane Doe, Head of Product',
  //   excerpt: 'Exploring how interactive elements are changing the way we consume video, and what BackFromOutterSpace is doing to lead the charge.',
  //   imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnV0dXJpc3RpYyUyMHRlY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  // },
];

const BlogPage = () => {
  return (
    <motion.div 
      className="container mx-auto py-12 px-4 space-y-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="text-center">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold gradient-text mb-6"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          BackFromOutterSpace Logbook
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Cosmic insights, platform updates, and stories from the crew at BackFromOutterSpace. Discover tips for creators, news from the void, and interstellar trends.
        </motion.p>
      </section>

      {blogPosts.length > 0 ? (
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div 
              key={post.id}
              className="glass-card rounded-lg overflow-hidden flex flex-col"
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            >
              <img  class="w-full h-48 object-cover" alt={`Blog post image for ${post.title}`} src="https://images.unsplash.com/photo-1621165031056-2fb2961935d1" />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-primary">{post.title}</h3>
                <div className="flex items-center text-xs text-muted-foreground mb-1">
                  <Calendar className="h-3 w-3 mr-1" /> {post.date}
                </div>
                <div className="flex items-center text-xs text-muted-foreground mb-3">
                  <User className="h-3 w-3 mr-1" /> {post.author}
                </div>
                <p className="text-sm text-muted-foreground flex-grow mb-4">{post.excerpt}</p>
                <Button variant="link" asChild className="p-0 h-auto mt-auto self-start">
                  <Link to={`/company/blog/${post.id}`}>Read Transmission &rarr;</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </section>
      ) : (
        <div className="text-center py-12 glass-card rounded-lg">
          <Film className="h-16 w-16 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Logbook Empty</h2>
          <p className="text-muted-foreground">
            No transmissions logged yet. Our astrogators are busy charting new content!
          </p>
        </div>
      )}

      <section className="text-center">
        <Button size="lg">
          <Feather className="h-5 w-5 mr-2" />
          Subscribe to Cosmic Signals
        </Button>
      </section>
    </motion.div>
  );
};

export default BlogPage;
