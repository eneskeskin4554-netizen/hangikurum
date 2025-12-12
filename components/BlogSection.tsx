
import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BLOG_POSTS } from '../constants';
import { BlogPostExtended } from '../types';

const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPostExtended | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [readingProgress, setReadingProgress] = useState(0);

  // Scroll listener for reading progress
  useEffect(() => {
    const handleScroll = () => {
      const article = document.getElementById('article-content');
      if (article && selectedPost) {
        const totalHeight = article.scrollHeight - article.clientHeight;
        const progress = (article.scrollTop / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    const articleElement = document.getElementById('article-content');
    if (articleElement) {
      articleElement.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (articleElement) articleElement.removeEventListener('scroll', handleScroll);
    };
  }, [selectedPost]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedPost]);

  const categories = useMemo(() => ['Tümü', ...Array.from(new Set(BLOG_POSTS.map(post => post.category)))], []);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'Tümü') return BLOG_POSTS;
    return BLOG_POSTS.filter(post => post.category === selectedCategory);
  }, [selectedCategory]);

  const featuredPost = filteredPosts[0];
  const regularPosts = selectedCategory === 'Tümü' ? filteredPosts.slice(1) : filteredPosts;

  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={i} className="h-4 md:h-6" />;
      
      // Headers
      if (trimmed.startsWith('###')) {
        return <h3 key={i} className="text-xl md:text-2xl font-display font-bold text-white mt-8 md:mt-12 mb-3 md:mb-4 tracking-tight">{trimmed.replace('###', '').trim()}</h3>;
      }
      if (trimmed.startsWith('##')) {
        return <h2 key={i} className="text-2xl md:text-3xl font-display font-bold text-white mt-12 md:mt-16 mb-4 md:mb-6 border-l-4 border-primary pl-4 md:pl-6">{trimmed.replace('##', '').trim()}</h2>;
      }
      
      // Blockquotes
      if (trimmed.startsWith('>')) {
         return (
             <blockquote key={i} className="border-l-4 border-primary/50 bg-white/5 p-4 md:p-6 rounded-r-xl my-6 md:my-8 italic text-gray-300 text-sm md:text-base">
                 {trimmed.replace(/^>\s?/, '').split('**').map((part, j) => 
                     j % 2 === 1 ? <strong key={j} className="text-white font-bold">{part}</strong> : part
                 )}
             </blockquote>
         )
      }

      // List items
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('1. ')) {
        const content = trimmed.replace(/^[*1.-]\s/, '');
        return (
          <li key={i} className="flex items-start gap-3 ml-2 mb-2 md:mb-3 text-gray-300 leading-relaxed group text-base md:text-lg">
            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 group-hover:scale-125 transition-transform" />
            <span>
              {content.split('**').map((part, j) => 
                 j % 2 === 1 ? <strong key={j} className="text-white font-bold">{part}</strong> : part
              )}
            </span>
          </li>
        );
      }

      // Standard Paragraphs
      return (
        <p key={i} className="text-base md:text-xl text-gray-300 mb-4 md:mb-6 leading-relaxed font-light tracking-wide text-justify">
          {trimmed.split('**').map((part, j) => 
            j % 2 === 1 ? <strong key={j} className="text-white font-bold">{part}</strong> : part
          )}
        </p>
      );
    });
  };

  return (
    <section className="space-y-12 md:space-y-16 relative">
      {/* Category Filter - Sticky & Glass */}
      <div className="sticky top-16 md:top-20 z-30 flex justify-center mb-6 md:mb-8 pointer-events-none">
        <div className="flex overflow-x-auto p-1.5 md:p-2 gap-2 no-scrollbar bg-black/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl max-w-full mx-4 md:mx-0 pointer-events-auto">
            {categories.map((cat) => (
            <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                selectedCategory === cat
                    ? 'bg-white text-black shadow-lg transform scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
            >
                {cat}
            </button>
            ))}
        </div>
      </div>

      {/* Hero Post - Cinematic */}
      {selectedCategory === 'Tümü' && featuredPost && (
        <div 
          onClick={() => setSelectedPost(featuredPost)}
          className="group relative w-full h-[450px] md:h-[600px] rounded-[2rem] md:rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl ring-1 ring-white/10 mx-auto"
        >
          <img 
            src={featuredPost.imageUrl} 
            alt={featuredPost.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-6 md:p-16 w-full md:max-w-4xl flex flex-col items-start gap-4 md:gap-6">
             <div className="animate-fade-in-up flex gap-3">
                 <span className="bg-primary text-black text-[10px] md:text-xs font-black px-3 py-1 md:px-4 md:py-1.5 rounded-full uppercase tracking-widest">
                    Öne Çıkan
                 </span>
                 <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-[10px] md:text-xs font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full uppercase tracking-widest">
                    {featuredPost.category}
                 </span>
             </div>
             
             <h2 className="text-3xl md:text-7xl font-display font-bold text-white leading-tight md:leading-[1.1] group-hover:text-primary transition-colors duration-300 drop-shadow-2xl">
               {featuredPost.title}
             </h2>
             
             <div className="flex items-center gap-6 mt-2 md:mt-4">
                <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm p-2 pr-6 rounded-full border border-white/10">
                    <img src={featuredPost.author.avatar} className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20" />
                    <div className="text-left">
                        <p className="text-white text-xs md:text-sm font-bold">{featuredPost.author.name}</p>
                        <p className="text-gray-400 text-[10px] uppercase tracking-wider">{featuredPost.readTime} Okuma</p>
                    </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-0 md:px-0">
        {regularPosts.map((post) => (
          <article 
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="group cursor-pointer flex flex-col bg-[#111] rounded-3xl md:rounded-[2rem] overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
          >
            {/* Image */}
            <div className="aspect-[16/9] md:aspect-[4/3] w-full overflow-hidden relative">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <span className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider border border-white/10">
                {post.category}
              </span>
            </div>
            
            {/* Content */}
            <div className="p-6 md:p-8 flex flex-col flex-1 relative">
               <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-primary transition-colors leading-tight mb-3 md:mb-4">
                 {post.title}
               </h3>
               
               <p className="text-sm md:text-base text-gray-400 line-clamp-3 leading-relaxed mb-4 md:mb-6 font-light">
                 {post.excerpt}
               </p>

               <div className="mt-auto pt-4 md:pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={post.author.avatar} className="w-6 h-6 md:w-8 md:h-8 rounded-full grayscale group-hover:grayscale-0 transition-all" />
                    <div>
                        <p className="text-xs text-white font-bold">{post.author.name}</p>
                        <p className="text-[10px] text-gray-500">{post.date}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-primary opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity md:-translate-x-4 md:group-hover:translate-x-0">
                    Devamını Oku →
                  </span>
               </div>
            </div>
          </article>
        ))}
      </div>

      {/* Immersive Reading Modal (Portal to body to avoid parent transform clipping) */}
      {selectedPost && createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl animate-fade-in text-left">
          
          {/* Progress Bar */}
          <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-[210]">
            <div 
                className="h-full bg-primary transition-all duration-150 ease-out"
                style={{ width: `${readingProgress}%` }}
            />
          </div>

          <div 
            id="article-content"
            className="w-full h-full overflow-y-auto custom-scrollbar relative"
          >
            
            {/* Floating Close Button */}
            <button 
                onClick={(e) => { e.stopPropagation(); setSelectedPost(null); }}
                className="fixed top-4 right-4 md:top-6 md:right-6 z-[220] bg-black/50 md:bg-white/10 hover:bg-white text-white hover:text-black rounded-full p-2 md:p-3 backdrop-blur-md transition-all duration-300 group"
            >
                <svg className="w-6 h-6 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Article Container */}
            <div className="max-w-4xl mx-auto pb-40" onClick={(e) => e.stopPropagation()}>
               
               {/* Cover Image */}
               <div className="w-full h-[50vh] md:h-[60vh] relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
                  <img src={selectedPost.imageUrl} className="w-full h-full object-cover" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                      <div className="max-w-3xl mx-auto text-center">
                        <span className="inline-block bg-primary text-black text-[10px] md:text-xs font-bold px-3 py-1 rounded mb-4 md:mb-6 uppercase tracking-widest">
                            {selectedPost.category}
                        </span>
                        <h1 className="text-2xl md:text-6xl font-display font-bold text-white leading-tight mb-6 md:mb-8">
                            {selectedPost.title}
                        </h1>
                        
                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-300 border-t border-white/10 pt-6 mt-6">
                            <div className="flex items-center gap-2">
                                <img src={selectedPost.author.avatar} className="w-6 h-6 md:w-8 md:h-8 rounded-full" />
                                <span className="font-bold text-white">{selectedPost.author.name}</span>
                            </div>
                            <span className="hidden md:block w-1 h-1 bg-gray-500 rounded-full" />
                            <span>{selectedPost.date}</span>
                            <span className="hidden md:block w-1 h-1 bg-gray-500 rounded-full" />
                            <span>{selectedPost.readTime} okuma</span>
                        </div>
                      </div>
                  </div>
               </div>
               
               {/* Article Content */}
               <div className="px-5 md:px-12 mt-8 md:mt-12">
                  <div className="max-w-2xl mx-auto">
                    <p className="text-lg md:text-3xl text-white leading-relaxed font-display font-medium mb-10 md:mb-16 border-l-4 border-white pl-4 md:pl-6 italic">
                       {selectedPost.excerpt}
                    </p>
                    
                    <div className="space-y-2">
                       {renderContent(selectedPost.content)}
                    </div>

                    {/* Footer / Disclaimer */}
                    <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-white/10">
                       <div className="bg-[#151515] rounded-2xl p-6 md:p-8 border border-white/5">
                          <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                             <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                             Yasal Uyarı
                          </h4>
                          <p className="text-xs md:text-sm text-gray-500 italic leading-relaxed">
                             Burada yer alan yatırım bilgi, yorum ve tavsiyeleri yatırım danışmanlığı kapsamında değildir. Yatırım danışmanlığı hizmeti; aracı kurumlar, portföy yönetim şirketleri, mevduat kabul etmeyen bankalar ile müşteri arasında imzalanacak yatırım danışmanlığı sözleşmesi çerçevesinde sunulmaktadır.
                          </p>
                       </div>
                    </div>
                  </div>
               </div>

            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default BlogSection;
