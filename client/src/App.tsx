import { Switch, Route, Router as WouterRouter } from "wouter";
import { useEffect, useMemo, useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import StoryPage from "@/pages/story";
import CharactersPage from "@/pages/characters";
import UniversePage from "@/pages/universe";
import CommunityPage from "@/pages/community";
import ProfilePage from "@/pages/profile";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/story" component={StoryPage} />
      <Route path="/characters" component={CharactersPage} />
      <Route path="/universe" component={UniversePage} />
      <Route path="/community" component={CommunityPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Determine base path at runtime (Vite injects import.meta.env.BASE_URL like '/project-keystone/')
  const base = (import.meta as any).env?.BASE_URL || "/";
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <WouterRouter base={base.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
