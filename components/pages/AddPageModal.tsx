'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/customInput';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Users } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface SearchResult {
  id: string;
  name: string;
  category?: string;
  fan_count?: number;
  picture?: {
    data?: {
      url?: string;
    };
  };
}

interface AddPageModalProps {
  userId: string;
  onPageAdded?: () => void;
}

export function AddPageModal({ userId, onPageAdded }: AddPageModalProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [adding, setAdding] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setSearching(true);
    try {
      const response = await fetch(`/api/meta/pages?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.error) {
        toast.error(data.error);
      } else {
        setResults(data.data || []);
        if (!data.data || data.data.length === 0) {
          toast.info('No pages found');
        }
      }
    } catch (error) {
      toast.error('Failed to search pages');
      console.error(error);
    } finally {
      setSearching(false);
    }
  };

  const handleAddPage = async (page: SearchResult) => {
    setAdding(page.id);
    try {
      const { error } = await supabase.from('tracked_pages').insert({
        user_id: userId,
        page_id: page.id,
        page_name: page.name,
        page_category: page.category || null,
        fan_count: page.fan_count || 0,
        followers_count: page.fan_count || 0,
        profile_picture: page.picture?.data?.url || null,
      });

      if (error) {
        if (error.code === '23505') {
          toast.error('This page is already being tracked');
        } else {
          throw error;
        }
      } else {
        toast.success(`${page.name} added successfully!`);
        setOpen(false);
        setQuery('');
        setResults([]);
        onPageAdded?.();
      }
    } catch (error) {
      toast.error('Failed to add page');
      console.error(error);
    } finally {
      setAdding(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <Plus className="w-4 h-4 mr-2" />
          Add Page
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Search for a Facebook Page</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="search">Page Name</Label>
              <Input
                id="search"
                placeholder="Search any Facebook Page..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={searching || !query.trim()}
              className="mt-auto"
            >
              <Search className="w-4 h-4 mr-2" />
              {searching ? 'Searching...' : 'Search'}
            </Button>
          </div>

          <div className="space-y-3">
            {results.map((page) => (
              <Card key={page.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {page.picture?.data?.url && (
                      <img 
                        src={page.picture.data.url} 
                        alt={page.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold">{page.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        {page.category && (
                          <Badge variant="secondary">{page.category}</Badge>
                        )}
                        {page.fan_count !== undefined && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="w-3 h-3" />
                            <span>{page.fan_count.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleAddPage(page)}
                      disabled={adding === page.id}
                    >
                      {adding === page.id ? 'Adding...' : 'Track This Page'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
