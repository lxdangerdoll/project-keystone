import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { Character } from "@/types/api";

type CharacterModalProps = {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  characterId: string;
};

export default function CharacterModal({ isOpen, onClose, characterId }: CharacterModalProps) {
  // Fetch the specific character by id; default queryFn uses the first string key as the URL
  const { data: character, isLoading } = useQuery<Character, Error, Character, [string]>({
    queryKey: [
      `/api/characters/${characterId}`,
    ],
    enabled: isOpen && !!characterId,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glassmorphism border-gray-600/30 max-w-2xl h-[90vh] flex flex-col overflow-hidden">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : character ? (
          <>
            <DialogHeader className="pb-4">
              <div className="flex items-center space-x-4">
                {/* Portrait with consistent aspect and border */}
                <div className="shrink-0 w-24 h-32 md:w-28 md:h-36 rounded-2xl bg-gray-900/60 ring-1 ring-gray-600/40 overflow-hidden flex items-center justify-center">
                  <img
                    src={character.imageUrl ?? ""}
                    alt={character.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <DialogTitle className="font-orbitron text-xl font-bold text-white">
                    {character.name}
                  </DialogTitle>
                  <p className="text-purple-300">{character.title}</p>
                  <div className="flex items-center space-x-2 mt-1 text-sm text-gray-400">
                    <span>Trust Level: {character.trustLevel ?? 0}</span>
                    <i className="fas fa-circle text-xs" />
                    <span>Appeared in {character.appearanceCount ?? 0} chapters</span>
                  </div>
                </div>
              </div>
            </DialogHeader>

            {/* Scrollable body */}
            <div className="flex-1 overflow-auto px-1">
              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="font-bold text-indigo-300 mb-2">Background</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {character.background}
                  </p>
                </div>
              </div>
            </div>

            {/* Fixed footer at the bottom of the modal */}
            <div className="mt-4 border-t border-gray-600/30 pt-4 bg-black/20 backdrop-blur-sm -mx-6 px-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-indigo-300 mb-2">Your Relationship</h4>
                  <div className="glassmorphism-light rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Trust</span>
                      <span className="text-sm text-green-400">{character.trustLevel ?? 0}%</span>
                    </div>
                    <Progress value={character.trustLevel ?? 0} className="h-2 mb-2" />
                    <p className="text-xs text-gray-400">
                      Your honest approach has earned {character.name.split(" ")[0]}'s respect.
                      They value your input on major decisions.
                    </p>
                  </div>
                </div>

                {!!character.keyDecisions?.length && (
                  <div>
                    <h4 className="font-bold text-indigo-300 mb-2">Key Decisions Influenced</h4>
                    <div className="space-y-2 text-sm">
                      {character.keyDecisions.map((decision, index) => (
                        <div key={index} className="flex items-center text-gray-300">
                          <i className="fas fa-check-circle text-green-400 mr-2" />
                          <span>{decision}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-400">Character not found</div>
        )}
      </DialogContent>
    </Dialog>
  );
}