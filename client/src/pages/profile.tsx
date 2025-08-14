import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CURRENT_USER_ID = "demo-user-1";

export default function ProfilePage() {
  const { data: userProgress } = useQuery({
    queryKey: ["/api/users", CURRENT_USER_ID, "progress"],
  });

  // Mock user profile data
  const userProfile = {
    username: "QuantumNavigator",
    joinDate: "March 2024",
    level: "Elite Porter",
    badges: [
      { name: "First Choice", description: "Made your first narrative decision", earned: true },
      { name: "Trendsetter", description: "Made a choice that became popular", earned: true },
      { name: "Path Finder", description: "Unlocked a new story branch", earned: true },
      { name: "Community Voice", description: "Participated in 10+ major votes", earned: false },
      { name: "Story Architect", description: "Influenced 5+ chapter outcomes", earned: false }
    ],
    recentChoices: [
      { 
        id: 1, 
        chapter: "Chapter 3: The Signal", 
        choice: "Find a Trusted Ally First", 
        outcome: "Unlocked Alliance Path",
        timestamp: "2 hours ago",
        impact: "Medium"
      },
      { 
        id: 2, 
        chapter: "Chapter 2: The Discovery", 
        choice: "Investigate the Cargo Bay", 
        outcome: "Discovered hidden files",
        timestamp: "1 day ago",
        impact: "High"
      },
      { 
        id: 3, 
        chapter: "Chapter 1: The Contract", 
        choice: "Accept the Job", 
        outcome: "Started the journey",
        timestamp: "3 days ago",
        impact: "Critical"
      }
    ],
    stats: {
      totalChoices: 47,
      storiesInfluenced: 8,
      pathsUnlocked: 3,
      communityAgreement: 73
    }
  };

  return (
    <div className="min-h-screen hero-bg">
      <div className="flex">
        <Sidebar isOpen={true} progress={userProgress} />
        
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="font-orbitron text-3xl font-bold text-white mb-2">
                Porter Profile
              </h1>
              <p className="text-gray-400">
                Track your journey and impact across the Keystone Project narrative
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Profile Overview */}
              <div className="lg:col-span-1">
                <Card className="glassmorphism border-gray-600/30 mb-6">
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-user text-3xl text-white"></i>
                    </div>
                    <CardTitle className="text-white font-orbitron">
                      {userProfile.username}
                    </CardTitle>
                    <p className="text-purple-300">{userProfile.level}</p>
                    <p className="text-sm text-gray-400">Porter since {userProfile.joinDate}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-400">{userProfile.stats.totalChoices}</div>
                        <div className="text-xs text-gray-400">Total Choices</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-400">{userProfile.stats.storiesInfluenced}</div>
                        <div className="text-xs text-gray-400">Stories Influenced</div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-600/30">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Community Agreement</span>
                        <span className="text-sm text-green-400">{userProfile.stats.communityAgreement}%</span>
                      </div>
                      <Progress value={userProfile.stats.communityAgreement} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">How often your choices align with the majority</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="glassmorphism border-gray-600/30">
                  <CardHeader>
                    <CardTitle className="text-white font-orbitron text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start glassmorphism-light border-gray-600/30 text-gray-300 hover:text-white hover:bg-gray-600/30">
                      <i className="fas fa-download mr-2"></i>
                      Export Choices
                    </Button>
                    <Button variant="outline" className="w-full justify-start glassmorphism-light border-gray-600/30 text-gray-300 hover:text-white hover:bg-gray-600/30">
                      <i className="fas fa-share mr-2"></i>
                      Share Profile
                    </Button>
                    <Button variant="outline" className="w-full justify-start glassmorphism-light border-gray-600/30 text-gray-300 hover:text-white hover:bg-gray-600/30">
                      <i className="fas fa-cog mr-2"></i>
                      Preferences
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* Achievement Badges */}
                <Card className="glassmorphism border-gray-600/30">
                  <CardHeader>
                    <CardTitle className="text-white font-orbitron">Achievement Badges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {userProfile.badges.map((badge, index) => (
                        <div key={index} className={`glassmorphism-light rounded-lg p-4 ${badge.earned ? 'border border-yellow-500/30' : 'opacity-50'}`}>
                          <div className="flex items-center mb-2">
                            <i className={`fas ${badge.earned ? 'fa-trophy text-yellow-400' : 'fa-lock text-gray-500'} mr-3`}></i>
                            <h4 className={`font-bold ${badge.earned ? 'text-yellow-400' : 'text-gray-500'}`}>
                              {badge.name}
                            </h4>
                          </div>
                          <p className="text-xs text-gray-400">{badge.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Choices */}
                <Card className="glassmorphism border-gray-600/30">
                  <CardHeader>
                    <CardTitle className="text-white font-orbitron">Recent Choices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userProfile.recentChoices.map((choice) => (
                        <div key={choice.id} className="glassmorphism-light rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium text-white">{choice.chapter}</h4>
                              <p className="text-sm text-purple-300">{choice.choice}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={
                                choice.impact === 'Critical' ? 'destructive' :
                                choice.impact === 'High' ? 'default' : 'secondary'
                              }>
                                {choice.impact}
                              </Badge>
                              <span className="text-xs text-gray-400">{choice.timestamp}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-300">{choice.outcome}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Progress Breakdown */}
                {userProgress && (
                  <Card className="glassmorphism border-gray-600/30">
                    <CardHeader>
                      <CardTitle className="text-white font-orbitron">Narrative Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">+{userProgress.trustNetwork}</div>
                          <div className="text-sm text-green-300">Trust Network</div>
                          <div className="text-xs text-gray-400 mt-1">Your honest approach builds allies</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-400">{userProgress.councilStanding}</div>
                          <div className="text-sm text-red-300">Council Standing</div>
                          <div className="text-xs text-gray-400 mt-1">Official authorities watch you</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">+{userProgress.crewLoyalty}</div>
                          <div className="text-sm text-blue-300">Crew Loyalty</div>
                          <div className="text-xs text-gray-400 mt-1">Your crew trusts your judgment</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
