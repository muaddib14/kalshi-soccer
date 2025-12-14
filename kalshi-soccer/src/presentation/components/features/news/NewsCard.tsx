import React from 'react';
import { NewsArticle } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/Card';
import { Newspaper, Clock, Tag, ExternalLink } from 'lucide-react';
import { formatRelativeTime, createPlaceholderImage } from '@/lib/utils/helpers';

interface NewsCardProps {
  news: NewsArticle[];
  className?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ 
  news, 
  className 
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Newspaper className="w-5 h-5 mr-2 text-blue-600" />
          Latest Football News
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {news.map((article) => (
            <article 
              key={article.id} 
              className="border-b border-slate-200 last:border-b-0 pb-6 last:pb-0"
            >
              <div className="flex space-x-4">
                {/* Article Image */}
                <div className="flex-shrink-0">
                  <img
                    src={article.imageUrl || createPlaceholderImage('News', 80, 80)}
                    alt={article.title}
                    className="w-20 h-20 rounded-lg object-cover"
                    onError={(e) => {
                      e.currentTarget.src = createPlaceholderImage('News', 80, 80);
                    }}
                  />
                </div>

                {/* Article Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 leading-tight mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                    {article.title}
                  </h3>
                  
                  <p className="text-slate-700 text-sm leading-relaxed mb-3 line-clamp-2">
                    {article.summary}
                  </p>

                  {/* Article Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-slate-600">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatRelativeTime(article.publishedAt)}
                      </div>
                      <span className="font-medium">{article.source}</span>
                    </div>
                    
                    {article.url && article.url !== '#' && (
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-xs text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Read More
                      </a>
                    )}
                  </div>

                  {/* Teams and Tags */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      {article.teams.slice(0, 2).map((team, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                        >
                          {team}
                        </span>
                      ))}
                      {article.teams.length > 2 && (
                        <span className="text-xs text-slate-500">
                          +{article.teams.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  {article.tags.length > 0 && (
                    <div className="flex items-center space-x-1 mt-2">
                      <Tag className="w-3 h-3 text-slate-500" />
                      <div className="flex flex-wrap gap-1">
                        {article.tags.slice(0, 3).map((tag, index) => (
                          <span 
                            key={index}
                            className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {news.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <Newspaper className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No news articles available.</p>
            <p className="text-sm">Check back later for the latest football updates!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsCard;