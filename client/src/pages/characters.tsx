import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { Character, UserProgress } from "@/types/api";

const CURRENT_USER_ID = "demo-user-1";

export default function CharactersPage() {
  const { data: characters, isLoading: charactersLoading } = useQuery<Character[]>({
    queryKey: ["/api/characters"],
    refetchOnMount: "always",
    staleTime: 0,
  });

  const { data: userProgress } = useQuery<UserProgress>({
    queryKey: ["/api/users", CURRENT_USER_ID, "progress"],
  });

  if (charactersLoading) {
    return (
      <div className="min-h-screen hero-bg">
        <div className="flex">
          <Sidebar isOpen={true} progress={userProgress} />
          <div className="flex-1 p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-80 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-bg">
      <div className="flex">
  <Sidebar isOpen={true} progress={userProgress as any} />
        
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="font-orbitron text-3xl font-bold text-white mb-2">
                Character Profiles
              </h1>
              <p className="text-gray-400">
                Meet the crew and allies who shape your journey through the Keystone Project
              </p>
            </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              {characters?.map((character) => (
        <Card key={character.id} className="glassmorphism border-gray-600/30 h-full min-h-80 flex flex-col">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-xl bg-gray-900/60 ring-1 ring-gray-600/40 overflow-hidden flex items-center justify-center">
                        <img
                          src={character.imageUrl}
                          alt={character.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-white font-orbitron">
                          {character.name}
                        </CardTitle>
                        <p className="text-purple-300 text-sm">{character.title}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="text-gray-300 text-sm leading-relaxed">
                      {character.background}
                    </div>

                    {/* Bottom-anchored section */}
                    <div className="mt-auto space-y-3 pt-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">Trust Level</span>
                          <span className="text-sm text-green-400">{character.trustLevel}%</span>
                        </div>
                        <Progress value={character.trustLevel} className="h-2" />
                      </div>

                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Appearances: {character.appearanceCount}</span>
                        <span>{character.keyDecisions?.length || 0} key decisions</span>
                      </div>

                      {character.keyDecisions && character.keyDecisions.length > 0 && (
                        <div>
                          <h4 className="font-bold text-indigo-300 text-sm mb-2">Key Decisions</h4>
                          <div className="space-y-1">
                            {character.keyDecisions.map((decision: string, index: number) => (
                              <div key={index} className="flex items-center text-xs text-gray-300">
                                <i className="fas fa-check-circle text-green-400 mr-2"></i>
                                {decision}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
