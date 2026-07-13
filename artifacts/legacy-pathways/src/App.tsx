import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import OurPeople from "@/pages/our-people";
import PersonProfile from "@/pages/person-profile";
import Education from "@/pages/education";
import Stories from "@/pages/stories";
import ShareAStory from "@/pages/share-a-story";
import Tours from "@/pages/tours";
import Takrouna from "@/pages/takrouna";
import Shop from "@/pages/shop";
import About from "@/pages/about";
import Contact from "@/pages/contact";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/our-people" component={OurPeople} />
      <Route path="/our-people/:slug" component={PersonProfile} />
      <Route path="/education" component={Education} />
      <Route path="/stories" component={Stories} />
      <Route path="/share-a-story" component={ShareAStory} />
      <Route path="/tours" component={Tours} />
      <Route path="/takrouna" component={Takrouna} />
      <Route path="/shop" component={Shop} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
