import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/sidebar";
import ChoiceSystem from "@/components/choice-system";
import ConsequenceTracker from "@/components/consequence-tracker";
import CharacterModal from "@/components/character-modal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Story, UserProgress } from "@/types/api";

// Mock user ID for demo purposes
const CURRENT_USER_ID = "demo-user-1";

export default function StoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [characterModalOpen, setCharacterModalOpen] = useState(false);
  const { toast } = useToast();

  // Fetch current story
  const { data: storyData, isLoading: storyLoading } = useQuery<Story>({
    queryKey: ["/api/stories/current"],
  });

  // Fetch user progress
  const { data: userProgress, isLoading: progressLoading } = useQuery<UserProgress>({
    queryKey: ["/api/users", CURRENT_USER_ID, "progress"],
  });

  // Submit choice mutation
  const submitChoiceMutation = useMutation({
    mutationFn: async (choiceData: { choiceId: string; storyId: string }) => {
      const response = await apiRequest("POST", "/api/choices", {
        userId: CURRENT_USER_ID,
        choiceId: choiceData.choiceId,
        storyId: choiceData.storyId,
      });
      return response.json();
    },
    onSuccess: () => {
      // Keep the selected choice for visual feedback
      setTimeout(() => {
        toast({
          title: "Choice Submitted",
          description: "Your decision has been recorded and will influence the story.",
        });
        queryClient.invalidateQueries({ queryKey: ["/api/users", CURRENT_USER_ID, "progress"] });
      }, 800);
    },
    onError: () => {
      setSelectedChoice(null); // Clear selection on error
      toast({
        title: "Error",
        description: "Failed to submit your choice. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleChoiceSelect = (choiceId: string) => {
    if (submitChoiceMutation.isPending || selectedChoice === choiceId) return;
    
    setSelectedChoice(choiceId);
  if (storyData) {
      submitChoiceMutation.mutate({
        choiceId,
    storyId: storyData.id,
      });
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (storyLoading || progressLoading) {
    return (
      <div className="min-h-screen hero-bg">
        <div className="flex">
          <div className="w-80 glassmorphism border-r-0 p-6">
            <Skeleton className="h-16 w-full mb-4" />
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="flex-1 p-6">
            <Skeleton className="h-64 w-full mb-4" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-bg">
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen}
          progress={userProgress}
          onCharacterClick={() => setCharacterModalOpen(true)}
        />

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="glassmorphism border-b border-gray-700/30 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-gray-400 hover:text-white"
                onClick={toggleSidebar}
              >
                <i className="fas fa-bars"></i>
              </Button>
              <div>
                <h2 className="font-orbitron text-xl font-bold text-white">
                  {storyData?.title || "Loading..."}
                </h2>
                <p className="text-sm text-gray-400">
                  {storyData?.location ?? ""}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="glassmorphism-light border-gray-600/30 text-gray-300 hover:bg-gray-600/30"
              >
                <i className="fas fa-bookmark mr-2"></i>
                Bookmark
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="glassmorphism-light border-gray-600/30 text-gray-300 hover:bg-gray-600/30"
              >
                <i className="fas fa-cog"></i>
              </Button>
            </div>
          </header>

          {/* Story Content */}
          <div className="flex-1 overflow-auto">
            <div className="max-w-4xl mx-auto p-6">
              {/* Story Text Section */}
              <div className="glassmorphism rounded-xl p-8 mb-6">
                {storyData?.imageUrl && (
                  <img 
                    src={storyData.imageUrl}
                    alt="Chapter illustration"
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                )}
                
                <div className="prose prose-invert max-w-none">
                  {storyData?.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-lg leading-relaxed text-gray-300 mb-6">
                      {paragraph}
                    </p>
                  ))}
                  
                  <div className="glassmorphism-light rounded-lg p-4 border-l-4 border-yellow-400 mb-6">
                    <div className="flex items-start">
                      <i className="fas fa-exclamation-triangle text-yellow-400 mt-1 mr-3"></i>
                      <div>
                        <h4 className="font-bold text-yellow-400 mb-2">CRITICAL DECISION POINT</h4>
                        <p className="text-sm text-gray-300">
                          Your next choice will have permanent consequences on the story canon. Choose carefully, Porter.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Choice System */}
              {!!storyData && (
                <ChoiceSystem
                  choices={storyData.choices}
                  selectedChoice={selectedChoice}
                  onChoiceSelect={handleChoiceSelect}
                  isSubmitting={submitChoiceMutation.isPending}
                />
              )}

              {/* Consequence Tracker */}
              {!!userProgress && (
                <ConsequenceTracker progress={userProgress} />
              )}

              {/* Chapter Navigation */}
              <div className="flex justify-between items-center glassmorphism rounded-xl p-4">
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                  disabled
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Previous Chapter
                </Button>
                
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>Chapter {storyData?.chapterNumber || 1} of 12</span>
                  <i className="fas fa-circle text-xs text-purple-400"></i>
                  <span>~15 min read</span>
                </div>
                
                <Button
                  variant="outline"
                  className="bg-purple-600/20 border-purple-500/30 text-purple-300 hover:bg-purple-600/30"
                >
                  Continue Reading
                  <i className="fas fa-arrow-right ml-2"></i>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Character Modal */}
      <CharacterModal
        isOpen={characterModalOpen}
        onClose={() => setCharacterModalOpen(false)}
        characterId="char-1"
      />
    </div>
  );
}
