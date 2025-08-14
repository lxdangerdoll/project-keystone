import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CURRENT_USER_ID = "demo-user-1";

export default function UniversePage() {
  const { data: userProgress } = useQuery({
    queryKey: ["/api/users", CURRENT_USER_ID, "progress"],
  });

  const universeData = {
    locations: [
      {
        id: 1,
        name: "Starship Wanderer",
        type: "Mobile Command Center",
        description: "A modified cargo vessel that serves as home to Captain Chen's crew. The ship has been upgraded with advanced scanning equipment and defensive systems.",
        image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
      },
      {
        id: 2,
        name: "Titan Station",
        type: "Deep Space Outpost",
        description: "A massive space station that serves as a neutral trading hub. Home to smugglers, merchants, and information brokers from across the galaxy.",
        image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
      },
      {
        id: 3,
        name: "Council Chambers",
        type: "Galactic Government Seat",
        description: "The imposing headquarters of the Galactic Council, where the fate of billions is decided behind closed doors.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
      }
    ],
    factions: [
      {
        id: 1,
        name: "The Porter Network",
        alignment: "Neutral",
        description: "A decentralized network of individuals connected by the mysterious 'Spark'. They believe in the power of collective choice and shared destiny.",
        influence: 85
      },
      {
        id: 2,
        name: "Galactic Council",
        alignment: "Authority",
        description: "The official governing body that maintains order across known space. Their true agenda regarding the Keystone Project remains hidden.",
        influence: 70
      },
      {
        id: 3,
        name: "The Resistance",
        alignment: "Revolutionary",
        description: "Underground movements fighting against Council corruption. They seek to expose the truth, no matter the cost.",
        influence: 45
      }
    ],
    technology: [
      {
        id: 1,
        name: "Quantum Entanglement Communication",
        category: "Communication",
        description: "Instantaneous communication across vast distances using quantum-paired particles."
      },
      {
        id: 2,
        name: "Neural Interface Implants",
        category: "Enhancement",
        description: "Direct brain-computer interfaces that allow for enhanced cognitive abilities and data processing."
      },
      {
        id: 3,
        name: "Hyperspace Drives",
        category: "Transportation",
        description: "Faster-than-light travel technology that folds space-time to enable interstellar journeys."
      }
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
                Universe Codex
              </h1>
              <p className="text-gray-400">
                Explore the locations, factions, and technology that shape the Keystone Project universe
              </p>
            </div>

            <Tabs defaultValue="locations" className="w-full">
              <TabsList className="glassmorphism border-gray-600/30 mb-6">
                <TabsTrigger value="locations" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/30">Locations</TabsTrigger>
                <TabsTrigger value="factions" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/30">Factions</TabsTrigger>
                <TabsTrigger value="technology" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/30">Technology</TabsTrigger>
              </TabsList>

              <TabsContent value="locations">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {universeData.locations.map((location) => (
                    <Card key={location.id} className="glassmorphism border-gray-600/30">
                      <CardHeader className="pb-4">
                        <img
                          src={location.image}
                          alt={location.name}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                        <CardTitle className="text-white font-orbitron">
                          {location.name}
                        </CardTitle>
                        <p className="text-purple-300 text-sm">{location.type}</p>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {location.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="factions">
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                  {universeData.factions.map((faction) => (
                    <Card key={faction.id} className="glassmorphism border-gray-600/30">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-white font-orbitron">
                              {faction.name}
                            </CardTitle>
                            <p className="text-purple-300 text-sm">{faction.alignment}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-400">{faction.influence}%</div>
                            <div className="text-xs text-gray-400">Influence</div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {faction.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="technology">
                <div className="grid gap-4">
                  {universeData.technology.map((tech) => (
                    <Card key={tech.id} className="glassmorphism border-gray-600/30">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-orbitron text-lg font-bold text-white mb-1">
                              {tech.name}
                            </h3>
                            <p className="text-purple-300 text-sm mb-3">{tech.category}</p>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {tech.description}
                            </p>
                          </div>
                          <div className="ml-4">
                            <i className="fas fa-microchip text-2xl text-cosmic-purple"></i>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
