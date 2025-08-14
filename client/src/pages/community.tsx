import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const CURRENT_USER_ID = "demo-user-1";

export default function CommunityPage() {
  const { data: userProgress } = useQuery({
    queryKey: ["/api/users", CURRENT_USER_ID, "progress"],
  });

  const { data: storyData } = useQuery({
    queryKey: ["/api/stories/current"],
  });

  // Mock community data
  const communityData = {
    totalPorters: 2847,
    participationRate: 89,
    timeRemaining: "4 hours 23 minutes",
    globalStats: {
      totalChoices: 127438,
      storiesInfluenced: 23,
      majorDecisions: 8
    },
    recentActivity: [
      {
        id: 1,
        action: "Major Choice Vote",
        description: "Community voted to spare Admiral Reeves",
        impact: "High",
        timestamp: "2 hours ago",
        percentage: 67
      },
      {
        id: 2,
        action: "Character Fate Decision",
        description: "Torres' loyalty secured through collective trust building",
        impact: "Medium",
        timestamp: "6 hours ago",
        percentage: 78
      },
      {
        id: 3,
        action: "Story Path Unlock",
        description: "Diplomatic solution unlocked in Chapter 4",
        impact: "High",
        timestamp: "1 day ago",
        percentage: 85
      }
    ],
    topContributors: [
      { id: 1, username: "CosmicNavigator", choices: 89, influence: 94 },
      { id: 2, username: "StarlightScribe", choices: 76, influence: 91 },
      { id: 3, username: "QuantumDreamer", choices: 71, influence: 87 },
      { id: 4, username: "VoidWalker", choices: 68, influence: 85 },
      { id: 5, username: "NebulaSeer", choices: 64, influence: 82 }
    ]
  };

  return (
    <div className="min-h-screen hero-bg">
      <div className="flex">
        <Sidebar isOpen={true} progress={userProgress} />
        
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="font-orbitron text-3xl font-bold text-white mb-2">
                Porter Network
              </h1>
              <p className="text-gray-400">
                Connect with fellow Porters and see how collective choices shape the narrative
              </p>
            </div>

            {/* Current Vote Status */}
            <Card className="glassmorphism border-gray-600/30 mb-6 consequence-pulse border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white font-orbitron flex items-center">
                  <i className="fas fa-vote-yea text-purple-400 mr-3"></i>
                  Active Community Vote
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">{communityData.totalPorters.toLocaleString()}</div>
                    <div className="text-sm text-blue-300">Active Porters</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">{communityData.participationRate}%</div>
                    <div className="text-sm text-green-300">Participation Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">{communityData.timeRemaining}</div>
                    <div className="text-sm text-yellow-300">Time Remaining</div>
                  </div>
                </div>

                {/* Current Story Choices */}
                {storyData?.choices && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-indigo-300 mb-3">Current Chapter Voting Results:</h4>
                    {storyData.choices.map((choice: any) => (
                      <div key={choice.id} className="glassmorphism-light rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-white">
                            {choice.optionLetter}. {choice.title}
                          </span>
                          <span className="text-sm text-gray-300">{choice.percentage}%</span>
                        </div>
                        <Progress value={choice.percentage} className="h-2 mb-1" />
                        <div className="text-xs text-gray-400">{choice.voteCount.toLocaleString()} votes</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Global Impact Stats */}
              <Card className="glassmorphism border-gray-600/30">
                <CardHeader>
                  <CardTitle className="text-white font-orbitron">Global Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Choices Made</span>
                    <span className="text-2xl font-bold text-blue-400">
                      {communityData.globalStats.totalChoices.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Stories Influenced</span>
                    <span className="text-2xl font-bold text-purple-400">
                      {communityData.globalStats.storiesInfluenced}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Major Decisions</span>
                    <span className="text-2xl font-bold text-green-400">
                      {communityData.globalStats.majorDecisions}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Top Contributors */}
              <Card className="glassmorphism border-gray-600/30">
                <CardHeader>
                  <CardTitle className="text-white font-orbitron">Top Contributors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {communityData.topContributors.map((contributor, index) => (
                      <div key={contributor.id} className="flex items-center justify-between glassmorphism-light rounded-lg p-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold mr-3">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-white">{contributor.username}</div>
                            <div className="text-xs text-gray-400">{contributor.choices} choices made</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-purple-300">{contributor.influence}%</div>
                          <div className="text-xs text-gray-400">influence</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Community Activity */}
            <Card className="glassmorphism border-gray-600/30 mt-6">
              <CardHeader>
                <CardTitle className="text-white font-orbitron">Recent Community Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communityData.recentActivity.map((activity) => (
                    <div key={activity.id} className="border-b border-gray-600/30 pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-white">{activity.action}</h4>
                          <p className="text-sm text-gray-300">{activity.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={activity.impact === 'High' ? 'destructive' : 'secondary'}>
                            {activity.impact}
                          </Badge>
                          <span className="text-xs text-gray-400">{activity.timestamp}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Progress value={activity.percentage} className="h-1 flex-1 mr-2" />
                        <span className="text-xs text-gray-400">{activity.percentage}% consensus</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
